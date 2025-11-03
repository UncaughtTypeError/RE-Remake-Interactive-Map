# RE Remake Map MCP Server

Model Context Protocol (MCP) server for the RE Remake Interactive Map API. Enables Claude and other AI assistants to query game data through natural language.

## What is This?

This MCP server exposes the RE Remake Interactive Map REST API as **10 tools** that Claude can use to answer questions about items, biohazards (enemies), rooms, and maps.

Instead of manually making HTTP requests, you can ask Claude:
- "What items are in the Dining Room?"
- "Where can I find Shotgun Shells?"
- "What's the threat level of the Main Hall on Hard difficulty?"
- "Show me all rooms in Mansion 1F"

## Quick Start

### Prerequisites

- Node.js 18+ installed
- RE Remake Interactive Map API running (default: `http://localhost:3000`)

### Installation

```bash
# Navigate to mcp-server directory
cd mcp-server

# Install dependencies
npm install

# Build TypeScript
npm run build
```

### Running the Server

```bash
# Start the MCP server
npm start
```

You should see:
```
🎮 RE Remake Map MCP Server running
📡 API Base URL: http://localhost:3000
⏱️  Rate Limit: 100 requests per 900s
⏰ Timeout: 10000ms
🔧 10 tools available

Ready to accept MCP requests from Claude...
```

## Usage with Claude Code (CLI/Terminal)

Claude Code automatically detects the `.mcp.json` file in your project root.

### 1. Ensure API is Running

```bash
# Start the Express API (from project root)
npm run dev
```

### 2. Ensure MCP Server is Built

```bash
# Build the MCP server (from mcp-server directory)
cd mcp-server
npm run build
cd ..
```

### 3. Restart Claude Code Session

Exit and restart your Claude Code session to load the MCP configuration.

### 4. Ask Natural Language Questions

You can now ask Claude Code questions directly in the terminal:

```
You: "What items are in the Dining Room?"
You: "Where can I find Shotgun Shells on Hard difficulty?"
You: "Show me all rooms in Mansion 1F"
You: "What's the threat level of the Main Hall?"
```

Claude Code will automatically use the MCP tools to query your local API and respond with formatted results.

### 5. Verify MCP Tools are Available

Ask Claude Code:
```
You: "What MCP tools do you have available?"
```

Claude should list all 10 tools (get_all_items, search_items, etc.)

## Usage with Claude Desktop

### 1. Find Your Config File

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### 2. Add MCP Server Configuration

Edit the config file and add:

```json
{
  "mcpServers": {
    "re-remake-map": {
      "command": "node",
      "args": [
        "/absolute/path/to/RE-Remake-Interactive-Map/mcp-server/dist/index.js"
      ],
      "env": {
        "API_BASE_URL": "http://localhost:3000"
      }
    }
  }
}
```

**Important**: Replace `/absolute/path/to/` with your actual project path.

### 3. Restart Claude Desktop

Close and reopen Claude Desktop. The MCP server will auto-start when Claude launches.

### 4. Verify Connection

In Claude Desktop, ask:
> "What MCP tools do you have available?"

Claude should list 10 tools starting with `get_all_items`, `get_items_by_ids`, etc.

## Available Tools

### Items (3 tools)
- `get_all_items` - Browse all items, optionally filter by difficulty
- `get_items_by_ids` - Get specific items by IDs
- `search_items` - Search items by name or type

### Biohazards (3 tools)
- `get_all_biohazards` - Browse all enemies/creatures
- `get_biohazards_by_ids` - Get specific biohazards by IDs
- `search_biohazards` - Search biohazards by name or code

### Maps (4 tools)
- `get_all_areas` - List all map areas (Mansion 1F, Courtyard, etc.)
- `get_rooms_by_ids` - Get detailed room information
- `search_rooms` - Search rooms by name, map, or access type
- `get_rooms_by_map` - Get all rooms in a specific area

## Quick Examples

### Example 1: Find Items in a Room

**You ask Claude:**
> "What items are in the Dining Room?"

**Claude will:**
1. Call `search_rooms` with name="Dining Room"
2. Call `get_rooms_by_ids` with the found room ID
3. Present all items, biohazards, and details

### Example 2: Find Item Locations

**You ask Claude:**
> "Where can I find Shotgun Shells?"

**Claude will:**
1. Call `search_items` with name="Shotgun Shells" and type="ammo"
2. Extract room locations from results
3. Present organized list of rooms with shotgun shells

### Example 3: Check Room Danger

**You ask Claude:**
> "How dangerous is the Main Hall on Jill Hard?"

**Claude will:**
1. Call `search_rooms` with name="Main Hall"
2. Call `get_rooms_by_ids` with difficulty="JV-lvl-hard"
3. Analyze biohazards and present threat assessment

### Example 4: Plan Route

**You ask Claude:**
> "Show me all rooms in Mansion 1F with items"

**Claude will:**
1. Call `get_all_areas` to find Mansion 1F map ID
2. Call `get_rooms_by_map` with mapId="mansionF1"
3. Filter rooms with items
4. Present organized list with details

### Example 5: Find Keys

**You ask Claude:**
> "Where do I find the Armor Key?"

**Claude will:**
1. Call `search_items` with name="Armor Key"
2. Extract location data
3. Call `get_rooms_by_ids` for detailed location
4. Present step-by-step directions

## Configuration

### Environment Variables

- `API_BASE_URL` - Base URL of the Express API (default: `http://localhost:3000`)
- `API_TIMEOUT` - Request timeout in milliseconds (default: `10000`)
- `API_AUTH_TOKEN` - Bearer token for future authentication (optional)

### Setting Environment Variables

**In Claude Desktop config:**
```json
{
  "mcpServers": {
    "re-remake-map": {
      "env": {
        "API_BASE_URL": "http://localhost:3000",
        "API_TIMEOUT": "15000"
      }
    }
  }
}
```

**In terminal:**
```bash
# macOS/Linux
export API_BASE_URL=http://localhost:3000
npm start

# Windows
set API_BASE_URL=http://localhost:3000
npm start
```

## Rate Limiting

The MCP server enforces the same rate limits as the Express API:

- **Limit**: 100 requests per 15 minutes
- **Behavior**: Returns error with wait time when exceeded
- **Client-side**: Rate limiting is tracked per MCP server instance

## Troubleshooting

### "Connection refused" or "ECONNREFUSED"

**Problem**: MCP server can't connect to the API.

**Solution**:
1. Start the Express API: `cd .. && npm start`
2. Verify API is running: Open `http://localhost:3000/api/health` in browser
3. Check `API_BASE_URL` is correct

### "Rate limit exceeded"

**Problem**: Made too many requests in 15 minutes.

**Solution**: Wait the indicated time, then try again. The error message shows exact wait time.

### "Tool not found"

**Problem**: Claude doesn't recognize the tool.

**Solution**:
1. Restart Claude Desktop
2. Verify MCP server is running: `npm start`
3. Check Claude Desktop config file path is correct

### "Request timed out"

**Problem**: API didn't respond in 10 seconds.

**Solution**:
1. Check API server is responsive
2. Increase timeout: Set `API_TIMEOUT=20000` in env vars
3. Check network connectivity

## CLI/Terminal Usage (Without Claude Desktop)

If you prefer using the MCP server from a **terminal/shell** instead of Claude Desktop GUI:

### Option 1: MCP Inspector (Interactive Web UI)

The MCP Inspector provides a web-based interface for testing tools:

```bash
# Run the inspector (launches browser automatically)
npm run inspector
```

This opens a web UI at `http://localhost:5173` where you can:
- Browse all 10 available tools
- Test tools with custom parameters
- See real-time request/response data
- Debug MCP server behavior

### Option 2: Direct API Testing (cURL/HTTP)

You can bypass MCP entirely and query the API directly:

```bash
# Get all items
curl http://localhost:3000/api/items

# Search for Shotgun Shells
curl "http://localhost:3000/api/items/search?name=shotgun&type=ammo"

# Get room by ID
curl http://localhost:3000/api/rooms/RDINING

# Search rooms
curl "http://localhost:3000/api/rooms/search?name=Dining%20Room"
```

### Option 3: Custom MCP Client

Write your own MCP client using the SDK:

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['./mcp-server/dist/index.js']
});

const client = new Client({ name: 'my-client', version: '1.0.0' }, {});
await client.connect(transport);

// Call tools
const result = await client.callTool({ name: 'search_items', arguments: { name: 'shotgun' } });
console.log(result);
```

## Development

### Build

```bash
npm run build
```

### Watch Mode (auto-rebuild)

```bash
npm run dev
```

### Type Check

```bash
npm run typecheck
```

### Debug with Inspector

```bash
npm run inspector
```

## Documentation

- **Detailed Guide**: See `../docs/MCP_SERVER.md` for comprehensive documentation
- **Usage Examples**: 20+ detailed examples in the full documentation
- **API Reference**: See `../docs/` for Express API documentation

## Contributing

### ⚠️ CRITICAL: OpenAPI Dependency

**MCP tools have a strict 1:1 dependency on `openapi.yaml`.** All tool parameters must **exactly match** the API specification.

### When Adding/Modifying API Endpoints

You MUST update all three in sync:

1. **Express API** (`../src/routes/`, `../src/middleware/`)
   - Implement endpoint logic

2. **OpenAPI Spec** (`../openapi.yaml`)
   - Document EXACT parameter names (e.g., `code` not `classification`)
   - Document EXACT enum values with correct case (e.g., `Weapon` not `weapon`)
   - Mark optional vs required correctly

3. **MCP Tools** (`src/tools/*.ts`)
   - Copy parameter names **verbatim** from openapi.yaml
   - Copy enum values with **exact case** from openapi.yaml
   - Include **ALL** parameters (don't omit any)
   - Update descriptions to reference actual valid values

4. **Types** (`src/types.ts`)
   - Update if request/response schemas changed

5. **Rebuild**
   ```bash
   npm run build
   ```

6. **Test**
   - Make actual API requests through MCP tools
   - Verify no 400 errors
   - Verify all parameters work

7. **Document** in `../docs/MCP_SERVER.md`
   - Add usage examples
   - Update tool count if changed

### Common Mistakes to Avoid

```typescript
// ❌ WRONG - Generic lowercase enums
enum: ['weapon', 'ammo']
// Causes: 400 Invalid enum value

// ✅ CORRECT - Exact PascalCase from API
enum: ['Weapon', 'Ammunition']

// ❌ WRONG - Parameter name doesn't exist
{ classification: string }
// Causes: 400 Unrecognized query parameter

// ✅ CORRECT - Actual API parameter
{ code: string }

// ❌ WRONG - Missing parameters
{ name: string }
// Users lose access to room/difficulty filters

// ✅ CORRECT - Complete parameter set
{ room: string, name: string, difficulty: string, code: string }
```

### Why This Matters

- Invalid schemas = Runtime errors for all Claude users
- Mismatched names = 400 errors on every request
- Wrong enums = Validation failures and wasted tokens
- Missing params = Hidden functionality

## License

MIT
