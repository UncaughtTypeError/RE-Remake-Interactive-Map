#!/usr/bin/env node
/**
 * MCP Server for RE Remake Interactive Map API
 * Exposes API endpoints as MCP tools for use with Claude and other AI assistants
 *
 * Usage:
 *   node dist/index.js
 *   OR
 *   Configure in Claude Desktop config file
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

import { loadConfig } from './config.js';
import { ApiClient } from './client.js';
import { createAllTools } from './tools/index.js';

// Load configuration from environment
const config = loadConfig();
const client = new ApiClient(config);
const tools = createAllTools(client);

// Create MCP server instance
const server = new Server(
    {
        name: 're-remake-map-mcp-server',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    },
);

// Handle tool listing (when Claude asks "what tools are available?")
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: tools.map((tool) => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
        })),
    };
});

// Handle tool execution (when Claude calls a specific tool)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const tool = tools.find((t) => t.name === request.params.name);

    if (!tool) {
        throw new Error(`Unknown tool: ${request.params.name}`);
    }

    try {
        return await tool.handler((request.params.arguments || {}) as any);
    } catch (error) {
        if (error instanceof Error) {
            // Return detailed error to Claude for debugging
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error: ${error.message}`,
                    },
                ],
                isError: true,
            };
        }
        throw error;
    }
});

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);

    // Log to stderr (doesn't interfere with MCP protocol on stdout)
    console.error('🎮 RE Remake Map MCP Server running');
    console.error(`📡 API Base URL: ${config.apiBaseUrl}`);
    console.error(
        `⏱️ Rate Limit: ${config.rateLimitMax} requests per ${config.rateLimitWindow / 1000}s`,
    );
    console.error(`⏰ Timeout: ${config.apiTimeout}ms`);
    console.error(`🔧 ${tools.length} tools available`);
    if (config.authToken) {
        console.error('🔐 Authentication: Enabled');
    }
    console.error('');
    console.error('Ready to accept MCP requests from Claude...');
}

main().catch((error) => {
    console.error('❌ Fatal error starting MCP server:', error);
    process.exit(1);
});
