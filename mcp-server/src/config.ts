/**
 * Configuration for MCP server
 * Reads from environment variables with sensible defaults
 */

export interface Config {
    apiBaseUrl: string;
    apiTimeout: number;
    rateLimitWindow: number; // milliseconds
    rateLimitMax: number; // max requests per window
    authToken?: string; // For future authentication
}

export function loadConfig(): Config {
    return {
        apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
        apiTimeout: parseInt(process.env.API_TIMEOUT || '10000'),
        rateLimitWindow: 15 * 60 * 1000, // 15 minutes (matches Express rate limit)
        rateLimitMax: 100, // 100 requests per window (matches Express rate limit)
        authToken: process.env.API_AUTH_TOKEN,
    };
}
