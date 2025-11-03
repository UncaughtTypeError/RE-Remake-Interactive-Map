# RE Remake Interactive Map

An interactive companion guide and map for Resident Evil Remake, built with modern TypeScript and vanilla JavaScript and powered by an Express RESTful API.

## Overview

RE Remake Interactive Map is a full-stack TypeScript application that provides players with an interactive companion tool for navigating the Spencer Mansion and its surrounding areas in Resident Evil Remake. The application features real-time room exploration, item tracking, biohazard identification, and difficulty-based content filtering.

### Key Features

- **Interactive Map Navigation**: Explore all areas of the game with clickable room layouts
- **Dynamic Content Filtering**: Filter items and biohazards by difficulty level and character
- **Room Detail System**: View comprehensive room information including items, biohazards, adjoining rooms, and strategic intel
- **RESTful API**: Backend Express 5 API for querying game data with validation and rate limiting
- **Theme Support**: Diurnal and nocturnal themes matching the game's aesthetic
- **Safe Room Audio Player**: Immersive audio experience with the iconic save room theme

## Technology Stack

### Frontend

- **TypeScript 5.8+**: Strict type safety throughout
- **Vanilla JavaScript**: No UI frameworks (React, Vue, Angular) - uses native browser APIs
- **Modern Web APIs**: Proxy for reactivity, EventTarget for pub/sub, Web Animations API for effects
- **Component Architecture**: Modular event handlers, renderers, and orchestrators

### Backend

- **Express 5**: RESTful API server
- **TypeScript with ESM**: Modern ES modules
- **express-validator**: Input validation and sanitization
- **express-rate-limit**: API protection and rate limiting
- **Swagger/OpenAPI**: Interactive API documentation

### Development Tools

- **ESBuild**: Fast bundling and compilation
- **Jest + ts-jest**: Testing framework with TypeScript support
- **ESLint + Prettier**: Code quality and formatting
- **Bun**: Fast development server with watch mode

## Getting Started

### Prerequisites

- **Node.js**: v18+ or **Bun**: v1.2+
- **npm**: Included with Node.js
- **Git**: For version control

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd RE-Remake-Interactive-Map
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run tests to verify installation:
    ```bash
    npm test
    ```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

1. Type check the code:

    ```bash
    npm run typecheck
    ```

2. Build the application:

    ```bash
    npm run build
    ```

3. Start the production server:
    ```bash
    node dist/server.js
    ```

## Project Structure

```
RE-Remake-Interactive-Map/
├── src/
│   ├── server.ts              # Express API entry point
│   ├── main.ts                # Client-side entry point
│   ├── index.html             # Main HTML file
│   │
│   ├── routes/                # API routes
│   ├── controllers/           # Request handlers
│   ├── services/              # Business logic
│   ├── middleware/            # Error handling, validation
│   │
│   ├── data/                  # Static game data (items, rooms, biohazards)
│   ├── state/                 # Global state management
│   ├── ui/                    # Frontend components
│   │   ├── roomDetail/        # Room detail panel component
│   │   ├── difficultySelect/  # Difficulty selector component
│   │   ├── themeSelect/       # Theme switcher component
│   │   └── ...
│   ├── utils/                 # Utility functions
│   └── __tests__/             # Test suites
│       ├── unit/              # Unit tests
│       └── integration/       # Integration tests
│
├── docs/                      # Project documentation
├── scripts/                   # Development scripts
├── .claude/                   # AI context and architecture docs
│
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── jest.config.ts             # Jest configuration
├── esbuild.config.js          # Build configuration
├── openapi.yaml               # API specification
└── CONTRIBUTING.md            # Contribution guidelines
```

## Available Scripts

| Command                 | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| `npm run dev`           | Start development server with hot reload              |
| `npm start`             | Start development server with ts-node                 |
| `npm run build`         | Build for production (typecheck + transpile + bundle) |
| `npm test`              | Run test suite                                        |
| `npm run test:watch`    | Run tests in watch mode                               |
| `npm run test:coverage` | Generate test coverage report                         |
| `npm run typecheck`     | Type check without emitting files                     |
| `npm run lint`          | Lint code with ESLint                                 |
| `npm run format`        | Format code with Prettier                             |

## API Documentation

The API documentation is available at `/api-docs` when the server is running. The API provides endpoints for:

- **Items**: `/api/items` - Query items by ID, room, difficulty, character
- **Biohazards**: `/api/biohazards` - Query biohazards with filtering options
- **Maps**: `/api/maps` - Retrieve map data and room layouts

See `openapi.yaml` for the complete API specification.

## MCP Server

This project includes a **Model Context Protocol (MCP) server** that exposes the REST API as tools for AI assistants like Claude.

### What is MCP?

MCP allows Claude (and other AI assistants) to directly interact with the RE Remake Interactive Map API through natural language. Instead of manually making HTTP requests, you can ask Claude to fetch items, search rooms, or query biohazards.

### Quick Start

```bash
# Navigate to MCP server directory
cd mcp-server

# Install dependencies
npm install

# Build
npm run build

# Start server
npm start
```

### Available Tools

The MCP server provides **10 tools**:

**Items** (3): `get_all_items`, `get_items_by_ids`, `search_items`
**Biohazards** (3): `get_all_biohazards`, `get_biohazards_by_codes`, `search_biohazards`
**Maps** (4): `get_all_areas`, `get_rooms_by_ids`, `search_rooms`, `get_rooms_by_map`

### Example Queries

Ask Claude questions like:
- "What items are in the Dining Room?"
- "Where can I find shotgun ammo?"
- "What's the threat level of the Main Hall on Jill Hard?"
- "Show me all safe rooms in Mansion 1F"
- "Which rooms have both items and biohazards?"

### Usage with Claude Code (Terminal)

Claude Code automatically detects the `.mcp.json` configuration file in the project root. Just:

1. Start the API: `npm run dev`
2. Restart your Claude Code session
3. Ask natural language questions directly in the terminal

**Example:**
```
You: "What items are in the Dining Room?"
Claude: *Uses MCP tools to query API and provides formatted response*
```

### Usage with Claude Desktop (GUI)

Configure in `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "re-remake-map": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/dist/index.js"],
      "env": {
        "API_BASE_URL": "http://localhost:3000"
      }
    }
  }
}
```

### Documentation

- **Quick Start**: See `mcp-server/README.md`
- **Detailed Guide**: See `docs/MCP_SERVER.md` (includes 20 usage examples)
- **Usage with Claude Desktop**: Setup instructions in docs

### For AI Contributors

**Important**: When adding new API endpoints or modifying existing ones, you MUST update the MCP server:

1. Add/update tool definitions in `mcp-server/src/tools/`
2. Update types in `mcp-server/src/types.ts`
3. Update documentation in `docs/MCP_SERVER.md`
4. Rebuild MCP server: `cd mcp-server && npm run build`

This ensures Claude can utilize new API features immediately.

## Architecture

This project follows a component-based architecture with clear separation of concerns:

### Backend (Express 5 API)

- **Routes** → **Controllers** → **Services** → **Data**
- RESTful endpoints with validation and rate limiting
- Centralized error handling
- OpenAPI/Swagger documentation

### Frontend (Vanilla TypeScript)

- **Event Handlers** → **Orchestrators** → **Renderers**
- Proxy-based reactive state management
- Event delegation for performance
- Template system for dynamic content

For detailed architecture documentation, see:

- [.claude/AI_CONTEXT.md](.claude/AI_CONTEXT.md) - Project overview
- [.claude/ARCHITECTURE.md](.claude/ARCHITECTURE.md) - Design patterns
- [docs/project-standards-and-setup.md](docs/project-standards-and-setup.md) - Standards and tools

## Testing

The project maintains 80%+ test coverage across:

- **Unit Tests**: Services, controllers, state management
- **Integration Tests**: API endpoints, route handlers

Run tests with:

```bash
npm test                  # Run all tests
npm run test:coverage     # Generate coverage report
npm run test:watch        # Watch mode
```

See [.claude/TESTING.md](.claude/TESTING.md) for testing guidelines.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Code of Conduct
- Development workflow
- Commit conventions (Conventional Commits)
- Pull request process
- Coding standards
- Testing requirements

### Quick Contribution Checklist

- [ ] Follow TypeScript strict mode
- [ ] Use vanilla JavaScript (no jQuery, no UI frameworks)
- [ ] Write unit and integration tests
- [ ] Follow Conventional Commits format
- [ ] Update documentation as needed
- [ ] Ensure all tests pass and linting succeeds

## Migration Status

This project is currently migrating from a monolithic jQuery-based architecture to a modern TypeScript full-stack application:

- **Legacy**: Single 17,000+ line HTML file with embedded jQuery
- **Current**: Modular TypeScript components with Express API backend
- **Status**: Backend API complete, frontend components in active migration

See [.claude/MIGRATION_GUIDE.md](.claude/MIGRATION_GUIDE.md) for migration patterns and guidelines.

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 RE Remake Interactive Map Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Acknowledgments

- Built for the Resident Evil Remake community
- Inspired by the classic survival horror experience
- Data and assets based on the Resident Evil Remake game
- SVG map layouts created using [Boxy SVG](https://boxy-svg.com/)

---

**Note**: This is a fan-made companion tool and is not affiliated with or endorsed by Capcom.
