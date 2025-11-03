/**
 * HTTP client with rate limiting and error handling
 * Matches Express API error responses for consistent experience
 */

import fetch from 'node-fetch';
import { Config } from './config.js';
import { ApiError } from './types.js';

export class ApiClient {
    private config: Config;
    private requestQueue: number[] = [];

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * Rate limiting: Track requests and enforce limits
     * Matches Express rate limit: 100 requests per 15 minutes
     */
    private async enforceRateLimit(): Promise<void> {
        const now = Date.now();

        // Remove requests outside the window
        this.requestQueue = this.requestQueue.filter(
            (timestamp) => now - timestamp < this.config.rateLimitWindow
        );

        if (this.requestQueue.length >= this.config.rateLimitMax) {
            const oldestRequest = this.requestQueue[0];
            const waitTime = this.config.rateLimitWindow - (now - oldestRequest);
            const waitSeconds = Math.ceil(waitTime / 1000);
            throw new Error(
                `Rate limit exceeded (${this.config.rateLimitMax} requests per ${this.config.rateLimitWindow / 1000}s). ` +
                `Please wait ${waitSeconds} seconds before making more requests.`
            );
        }

        this.requestQueue.push(now);
    }

    /**
     * Make API request with error handling
     * Preserves detailed error messages from API (matches browser client experience)
     */
    async request<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        await this.enforceRateLimit();

        const url = new URL(endpoint, this.config.apiBaseUrl);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    url.searchParams.append(key, value);
                }
            });
        }

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        // Future auth support
        if (this.config.authToken) {
            headers['Authorization'] = `Bearer ${this.config.authToken}`;
        }

        try {
            const response = await fetch(url.toString(), {
                headers,
                signal: AbortSignal.timeout(this.config.apiTimeout),
            });

            if (!response.ok) {
                // Try to parse error response from API
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                try {
                    const error: ApiError = await response.json() as ApiError;
                    errorMessage = `API Error (${error.statusCode || response.status}): ${error.message || error.error}`;
                } catch {
                    // If parsing fails, use status text
                }
                throw new Error(errorMessage);
            }

            return (await response.json()) as T;
        } catch (error) {
            if (error instanceof Error) {
                // Preserve detailed error messages
                if (error.name === 'AbortError' || error.message.includes('timeout')) {
                    throw new Error(
                        `Request timed out after ${this.config.apiTimeout}ms. ` +
                        'The API server may be down or unresponsive.'
                    );
                }
                throw error;
            }
            throw new Error('Unknown error occurred while calling API');
        }
    }
}
