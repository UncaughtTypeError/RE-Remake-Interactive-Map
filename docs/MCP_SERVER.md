# MCP Server Comprehensive Guide

Complete guide to the Model Context Protocol server for RE Remake Interactive Map API.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [⚠️ CRITICAL: OpenAPI Dependency](#critical-openapi-dependency)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Tools](#available-tools)
- [Usage Examples](#usage-examples)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

## Overview

### What is MCP?

The Model Context Protocol (MCP) is Anthropic's protocol for connecting AI assistants like Claude to external data sources and tools. This MCP server exposes the RE Remake Interactive Map REST API as tools that Claude can call through natural language queries.

### Why Use MCP?

Instead of manually making HTTP requests to the API, you can ask Claude natural language questions and Claude will automatically call the appropriate tools to get the data you need.

**Example:**

- ❌ Before: Make HTTP request to `/api/maps/rooms/search?name=Dining%20Room`
- ✅ Now: Ask Claude "What items are in the Dining Room?"

### What This Server Provides

- **10 Tools** covering items, biohazards, and maps
- **Rate limiting** matching Express API (100 req/15min)
- **Detailed error messages** matching browser client experience
- **Type-safe** TypeScript implementation
- **Standalone** package with independent configuration

## Architecture

```
┌─────────────────────────────────────────┐
│ Claude / AI Assistant                    │
│ (Natural language queries)               │
└─────────────────────────────────────────┘
                  ↓
         (MCP Protocol - stdio)
                  ↓
┌─────────────────────────────────────────┐
│ MCP Server (mcp-server/)                │
│ - 10 tools (items, biohazards, maps)   │
│ - Rate limiting (100 req/15min)         │
│ - Error handling                        │
│ - Request caching & validation          │
└─────────────────────────────────────────┘
                  ↓
            (HTTP/REST)
                  ↓
┌─────────────────────────────────────────┐
│ Express API (http://localhost:3000)     │
│ - /api/items                            │
│ - /api/biohazards                       │
│ - /api/maps                             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ Data Layer (src/data/)                  │
│ - Items, Biohazards, Rooms              │
└─────────────────────────────────────────┘
```

## ⚠️ CRITICAL: OpenAPI Dependency

### Schema Synchronization Requirement

**MCP tools have a strict 1:1 dependency on the OpenAPI specification (`openapi.yaml`).** All tool parameters MUST exactly match the API's query parameters.

### Why This Matters

- **Invalid schemas cause runtime errors** for all Claude users
- **Mismatched parameter names result in 400 Bad Request** errors
- **Wrong enum values cause validation failures** and wasted tokens
- **Missing parameters hide functionality** from users

### Mandatory Update Workflow

**When adding/modifying ANY API endpoint:**

1. ✅ Update Express API routes/controllers
2. ✅ Update `openapi.yaml` with EXACT parameter names, types, enum values
3. ✅ Update MCP tool in `mcp-server/src/tools/` to match OpenAPI **EXACTLY**
4. ✅ Rebuild: `cd mcp-server && npm run build`
5. ✅ Test with actual API requests to verify

### Critical Matching Requirements

#### Parameter Names

```typescript
// ❌ WRONG - Parameter doesn't exist in API
{
    classification: string;
}
// → 400: Unrecognized query parameter

// ✅ CORRECT - Actual API parameter name
{
    code: string;
}
// → From openapi.yaml line 298: "- name: code"
```

#### Enum Values (Case Sensitive!)

```typescript
// ❌ WRONG - Generic enum values
enum: ['weapon', 'ammo', 'health']
// → 400: Invalid enum value

// ✅ CORRECT - Exact API enum values with correct case
enum: ['Weapon', 'Ammunition', 'GreenHerb', 'RedHerb', 'BlueHerb']
// → From openapi.yaml lines 131-148
```

#### Complete Parameter Sets

```typescript
// ❌ WRONG - Missing optional parameters
properties: {
  name: { type: 'string' }
}
// → Users can't filter by room, difficulty, code

// ✅ CORRECT - All API parameters included
properties: {
  room: { type: 'string' },
  difficulty: { type: 'string', enum: [...] },
  code: { type: 'string' },
  name: { type: 'string' }
}
// → From openapi.yaml lines 279-309
```

### Verification Checklist

Before committing MCP tool changes:

- [ ] Compared tool schema against `openapi.yaml` line-by-line
- [ ] Parameter names match exactly (including case)
- [ ] Enum values match exactly (including case and order)
- [ ] All optional parameters are included
- [ ] Required vs optional matches API spec
- [ ] Tool descriptions reference actual valid values
- [ ] Tested tool with actual API requests
- [ ] No 400 errors returned during testing
- [ ] Updated `docs/MCP_SERVER.md` with examples

## Installation

### Prerequisites

1. **Node.js 18+** installed
2. **RE Remake Interactive Map API** running (default port 3000)

### Steps

```bash
# 1. Navigate to MCP server directory
cd mcp-server

# 2. Install dependencies
npm install

# 3. Build TypeScript
npm run build

# 4. Verify build
ls dist/
# Should see: index.js, config.js, client.js, types.js, tools/
```

### Verify Installation

```bash
# Start the server
npm start

# You should see:
# 🎮 RE Remake Map MCP Server running
# 📡 API Base URL: http://localhost:3000
# ⏱️  Rate Limit: 100 requests per 900s
# 🔧 10 tools available
# Ready to accept MCP requests from Claude...
```

## Configuration

### Environment Variables

| Variable         | Default                 | Description                    |
| ---------------- | ----------------------- | ------------------------------ |
| `API_BASE_URL`   | `http://localhost:3000` | Base URL of Express API        |
| `API_TIMEOUT`    | `10000`                 | Request timeout (milliseconds) |
| `API_AUTH_TOKEN` | (none)                  | Bearer token for future auth   |

### Claude Desktop Configuration

#### 1. Locate Config File

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

#### 2. Add MCP Server

Create or edit the file:

```json
{
    "mcpServers": {
        "re-remake-map": {
            "command": "node",
            "args": ["/Users/you/Projects/RE-Remake-Interactive-Map/mcp-server/dist/index.js"],
            "env": {
                "API_BASE_URL": "http://localhost:3000",
                "API_TIMEOUT": "10000"
            }
        }
    }
}
```

**Important**: Use absolute paths, not relative paths.

#### 3. Restart Claude Desktop

Close and reopen Claude Desktop completely.

### Terminal Usage

You can also run the MCP server directly in any terminal:

```bash
# Set environment variables
export API_BASE_URL=http://localhost:3000
export API_TIMEOUT=10000

# Start server
cd mcp-server
npm start
```

The server communicates via stdio, so it can be used with any MCP-compatible client.

## Available Tools

### Items Tools (3)

#### 1. `get_all_items`

Get all items with optional difficulty filtering.

**Parameters:**

- `difficulty` (optional): Filter by difficulty level

**Example:**

```typescript
{
    difficulty: 'JV-lvl-normal';
}
```

#### 2. `get_items_by_ids`

Fetch specific items by IDs.

**Parameters:**

- `ids` (required): Array of item IDs
- `difficulty` (optional): Filter by difficulty

**Example:**

```typescript
{
  ids: ["weapon-mainHallF1", "inkRibbon-diningRoomF1", "selfDefenseJV-keepersRoom"],
  difficulty: "JV-lvl-hard"
}
```

#### 3. `search_items`

Search items by name/type.

**Parameters:**

- `name` (optional): Partial name match
- `type` (optional): Item type filter (e.g., "Weapon", "Ammunition", "GreenHerb")
- `room` (optional): Filter by room ID
- `difficulty` (optional): Difficulty filter

**Example:**

```typescript
{
  name: "Handgun",
  type: "Weapon",
  room: "mainHallF1"
}
```

### Biohazards Tools (3)

#### 4. `get_all_biohazards`

Get all biohazards/enemies.

**Parameters:** None

#### 5. `get_biohazards_by_ids`

Fetch specific biohazards by IDs.

**Parameters:**

- `ids` (required): Array of biohazard IDs (format: biohazardType-roomId)

**Example:**

```typescript
{
    ids: ['zombie1-keepersRoom', 'hunter-teaRoomCorridor'];
}
```

#### 6. `search_biohazards`

Search biohazards by name or code.

**Parameters:**

- `name` (optional): Partial name match
- `code` (optional): Filter by S.T.A.R.S. code (e.g., "Ht", "Zb")
- `room` (optional): Filter by room ID
- `difficulty` (optional): Difficulty filter

**Example:**

```typescript
{
  name: "Hunter",
  code: "Ht",
  room: "teaRoomCorridor"
}
```

### Maps Tools (4)

#### 7. `get_all_areas`

Get all map areas.

**Parameters:** None

#### 8. `get_rooms_by_ids`

Fetch specific rooms by IDs.

**Parameters:**

- `ids` (required): Array of room IDs (camelCase format)
- `difficulty` (optional): Filter contents by difficulty

**Example:**

```typescript
{
  ids: ["diningRoomF1", "mainHallF1", "keepersRoom"],
  difficulty: "JV-lvl-normal"
}
```

#### 9. `search_rooms`

Search rooms by various criteria.

**Parameters:**

- `map` (optional): Filter by map ID (camelCase, e.g., "mansionF1")
- `item` (optional): Filter rooms containing specific item
- `biohazard` (optional): Filter rooms containing specific biohazard
- `person` (optional): Filter rooms with specific person
- `interactable` (optional): Filter by interactable object
- `roomFunction` (optional): Filter by room function (e.g., "safeRoom")
- `adjoiningRoom` (optional): Filter by adjoining room ID
- `accessControl` (optional): Filter by required access key
- `threatLevel` (optional): Filter by threat level (0-5)
- `roomNumber` (optional): Filter by room number
- `difficulty` (optional): Filter contents

**Example:**

```typescript
{
  map: "mansionF1",
  roomFunction: "safeRoom",
  difficulty: "JV-lvl-hard"
}
```

#### 10. `get_rooms_by_map`

Get all rooms for a specific map.

**Parameters:**

- `mapId` (required): Map ID in camelCase (e.g., "mansionF1", "mansionF2")
- `difficulty` (optional): Filter contents

**Example:**

```typescript
{
  mapId: "mansionF1",
  difficulty: "CR-lvl-hard"
}
```

## Usage Examples

### Prerequisites for Examples

Before trying these examples:

1. Express API must be running on port 3000
2. MCP server must be running
3. Claude Desktop configured with MCP server

---

### Category 1: Basic Queries

#### Example 1: List All Items

**Query**: "Show me all items available in the game"

**Tools Used**: `get_all_items`

**Claude's Approach**:

```
I'll fetch the complete item list for you.
[calls get_all_items]
```

**Expected Response**:

```
The game contains 40+ items across categories:

Weapons:
- Beretta (Handgun)
- Shotgun
- Grenade Launcher
- Magnum
[...and more]

Ammunition:
- Handgun Magazine
- Shotgun Shells
- Grenade Rounds (Explosive, Incendiary, Acid)
[...and more]

Health Items:
- First Aid Spray
- Green Herb
- Red Herb
- Blue Herb
- Mixed Herbs
[...and more]

Keys:
- Sword Key
- Armor Key
- Shield Key
[...and more]
```

---

#### Example 2: Get Specific Room Items

**Query**: "What items are in the Main Hall and Dining Room?"

**Tools Used**: `get_items_by_ids`

**Parameters**:

```typescript
{
  ids: ["weapon-mainHallF1", "inkRibbon-diningRoomF1", "typewriter-diningRoomF1"],
  difficulty: "CR-lvl-normal"
}
```

**Expected Response**:

```
weapon-mainHallF1:
- Name: Handgun
- Type: Weapon
- Room: Main Hall F1
- Quantity: 1
- Difficulty: Chris Redfield (all difficulties)
- Access: None required

inkRibbon-diningRoomF1:
- Name: Ink Ribbon
- Type: InkRibbon
- Room: Dining Room F1
- Quantity: 1-2 (difficulty dependent)
- Difficulty: All
- Access: None required

typewriter-diningRoomF1:
- Name: Typewriter
- Type: Typewriter
- Room: Dining Room F1 (Save Room)
- Quantity: 1
- Difficulty: All
- Access: None required
```

---

### Category 2: Room-Based Queries

#### Example 3: Items in Specific Room

**Query**: "What are all the items in the Dining Room?"

**Tools Used**:

1. `search_rooms` (name="Dining Room")
2. `get_rooms_by_ids` (with found room ID)

**Expected Response**:

```
Dining Room (diningRoomF1):

Items:
- Ink Ribbon x1-2 (difficulty dependent)
  Available on: Jill Very Easy (x2), Jill Easy (x2), Normal (x1), Hard (x1)

- First Aid Spray (from Clock Puzzle)
  Available on: All difficulties
  Requirement: Solve clock puzzle

Interactables:
- Clock Puzzle (reveals First Aid Spray)

Biohazards: None (Safe Room)

Threat Level: ✅ Safe
Access: Unlocked from Main Hall
```

---

#### Example 4: Biohazard Count in Room

**Query**: "How many biohazards are in the Armor Room?"

**Tools Used**:

1. `search_rooms` (name="Armor Room")
2. `get_rooms_by_ids` (with difficulty filtering)

**Expected Response**:

```
Armor Room (armorRoom):

Biohazards by Difficulty:

Jill Valentine:
- Very Easy: 2 Zombies
- Easy: 2 Zombies
- Normal: 3 Zombies
- Hard: 3 Zombies + 1 Crimson Head (ambush)

Chris Redfield:
- Very Easy: 2 Zombies
- Easy: 3 Zombies
- Normal: 3 Zombies + 1 Crimson Head
- Hard: 4 Zombies + 1 Crimson Head (ambush)

Threat Level: ⚠️⚠️⚠️ Moderate to High (Hard mode)

Recommendation: Save before entering on Hard difficulty
```

---

#### Example 5: Room Threat Level

**Query**: "What is the threat level of the Main Hall on Jill Hard?"

**Tools Used**:

1. `search_rooms` (name="Main Hall")
2. `get_rooms_by_ids` (difficulty="JV-lvl-hard")

**Expected Response**:

```
Main Hall (mainHallF1) - Jill Hard:

Biohazards:
- 4 Zombies (standard)
- 1 Crimson Head (ambush spawn)

Threat Assessment:
⚠️⚠️⚠️⚠️ HIGH THREAT

Combat Recommendations:
- Bring shotgun shells (6-8 shells recommended)
- Have healing items ready (First Aid Spray)
- Consider burning zombie corpses to prevent Crimson Head spawns
- Use doorways for crowd control

Items Available:
- Emblem puzzle components
- None (this is a combat-focused room)

Safe Strategy:
- Clear room early with resources
- Burn corpses if possible
- Avoid if low on health/ammo
```

---

### Category 3: Area-Wide Queries

#### Example 6: Most Dangerous Room in Area

**Query**: "What is the most dangerous room in Mansion 1F?"

**Tools Used**:

1. `get_all_areas` (find Mansion 1F map ID)
2. `get_rooms_by_map` (mapId="mansionF1", difficulty="JV-lvl-hard")

**Expected Response**:

```
Most Dangerous Rooms in Mansion 1F (Jill Hard):

1. Main Hall (mainHallF1)
   - Threat: 4 Zombies + 1 Crimson Head (ambush)
   - Risk: ⚠️⚠️⚠️⚠️⚠️ EXTREME
   - Reason: High traffic area, ambush spawn

2. Armor Room (armorRoom)
   - Threat: 3 Zombies + 1 Crimson Head (ambush)
   - Risk: ⚠️⚠️⚠️⚠️ HIGH
   - Reason: Cramped space, ambush risk

3. Kenneth's Room (kennethRoom)
   - Threat: 1 Zombie (Kenneth)
   - Risk: ⚠️⚠️ LOW
   - Reason: Single enemy, easy to avoid

Safe Rooms (No Threats):
- Dining Room (Save Room) ✅
- All save rooms have zero biohazards

Recommendation: Save before entering Main Hall or Armor Room. Bring shotgun and healing items.
```

---

### Category 4: Item Location Queries

#### Example 7: Rooms with Specific Item

**Query**: "Give me a list of rooms with shotgun ammo"

**Tools Used**:

1. `search_items` (name="Shotgun Shells", type="Ammunition")
2. Extract location data from results
3. `get_rooms_by_ids` (with extracted room IDs)

**Expected Response**:

```
Rooms with Shotgun Shells:

Mansion 1F:
1. Armor Room (armorRoom)
   - Amount: 6 shells
   - Difficulty: All
   - Access: Requires Armor Key
   - Threat: 3 Zombies + Crimson Head (Hard)

Mansion 2F:
2. Recreation Room (mansion-2f-recreation-room)
   - Amount: 4 shells
   - Difficulty: Normal, Hard (not on Easy/Very Easy)
   - Access: Unlocked
   - Threat: 1 Zombie

Courtyard:
3. Guardhouse 1F (guardhouse-1f-save-room)
   - Amount: 8 shells
   - Difficulty: All
   - Access: Requires Courtyard access
   - Threat: None (Safe Room)

4. Courtyard Passage (courtyard-passage)
   - Amount: 10 shells
   - Difficulty: Hard only
   - Access: Requires Courtyard Key
   - Threat: 2 Cerberus

Total Shotgun Shells Available:
- Very Easy/Easy: 14 shells
- Normal: 18 shells
- Hard: 28 shells

Optimal Collection Route:
1. Armor Room (get Armor Key first)
2. Recreation Room (2F)
3. Guardhouse Save Room
```

---

#### Example 8: Find Weapon Locations

**Query**: "Where can I find the Shotgun?"

**Tools Used**:

1. `get_items_by_ids` (name="Shotgun")
2. Extract location from item data
3. `get_rooms_by_ids` (for detailed location)

**Expected Response**:

```
Shotgun Location:

Jill Valentine:
- Starts with Shotgun in inventory
- Location: Default equipment
- No retrieval needed

Chris Redfield:
- Location: Mansion 1F Save Room (Dining Room)
- Position: On the desk, east wall
- Access: Unlocked from Main Hall
- Threat: None (Safe Room)

How to Get (Chris):
1. From Main Hall, enter north door
2. Enter Dining Room (Save Room)
3. Check desk on east wall
4. Take Shotgun

Alternative Notes:
- Rebecca also carries a shotgun (if playing with her)
- Cannot be dropped or lost
- Essential weapon for mid-game threats
```

---

### Category 5: Key and Access Queries

#### Example 9: Rooms Opened by Key

**Query**: "Show me all rooms that the Armor Key opens"

**Tools Used**:

1. `search_items` (name="Armor Key")
2. Extract "unlocks" data from key
3. `search_rooms` (with access requirements)

**Expected Response**:

```
Rooms Unlocked by Armor Key:

1. Mansion 1F - Armor Room (armorRoom)
   Door: Main Hall → Armor Room (east door)
   Contains:
   - Shotgun Shells x6
   - Wind Emblem (for statue puzzle)
   - Chest with additional items
   Threat: 3 Zombies + Crimson Head (Hard)

2. Mansion 2F - Armor Gallery (mansion-2f-armor-gallery)
   Door: Upper Balcony → Armor Gallery
   Contains:
   - Magnum rounds
   - Statue puzzle components
   - Decorative armor (examine for lore)
   Threat: 1 Zombie

Unlock Order Recommendation:
1. Find Armor Key (Graveyard, Mansion 1F exterior)
2. Unlock Armor Room (1F) first
   → Get Wind Emblem for progression
   → Get Shotgun Shells
3. Unlock Armor Gallery (2F) later
   → Get Magnum rounds for boss fights

Note: Armor Key is single-use per door. Plan your route carefully.
```

---

#### Example 10: Key Locations

**Query**: "Where do I find the Sword Key?"

**Tools Used**:

1. `search_items` (name="Sword Key")
2. Extract location from item data
3. `get_rooms_by_ids` (for detailed instructions)

**Expected Response**:

```
Sword Key Location:

Location: Mansion 1F - Main Hall (mainHallF1)
Requirement: Complete 4 Emblem Puzzle

Prerequisites:
You need all 4 emblems first:

1. Gold Emblem
   - Location: Dining Room Clock Puzzle
   - Requirement: Solve clock puzzle (time: 6:00)

2. Wind Emblem
   - Location: Armor Room chest
   - Requirement: Armor Key

3. Star Emblem
   - Location: Piano Bar (bar)
   - Requirement: Play moonlight sonata

4. Moon Emblem
   - Location: Mansion 2F Library/Attic
   - Requirement: Access to 2F

How to Get Sword Key:
1. Collect all 4 emblems
2. Return to Main Hall
3. Insert emblems into statue (any order)
4. Statue opens, revealing Sword Key at base
5. Take Sword Key

What Sword Key Unlocks:
- East Wing access (Mansion 1F)
- Courtyard exterior door
- Multiple doors in Mansion 2F
- Critical for game progression

Progression Note: Sword Key is the first major key. Get this before exploring further areas.
```

---

### Category 6: Biohazard Queries

#### Example 11: Biohazard Weaknesses

**Query**: "What is a Hunter weak to?"

**Tools Used**: `search_biohazards` (name="Hunter")

**Expected Response**:

```
Hunter (MA-121)

S.T.A.R.S. Tactical Assessment:
(Statistical Threat Analysis Rating Standard)

Code Name: MA-121
S.T.A.R.S. Classification: Delta (δ)
S.T.A.R.S. Ranking: 1.5 (★★)
Threat Level: Moderate-High
Engagement Directive: Engage Cautiously

Combat Intelligence:

Authorized Response Procedures:
- Engage from secure distances
- Avoid close proximity
- Neutralize rapidly and effectively

Effective Measures:
short to long-range medium to heavy arms, defensive weapons, explosives

Threat Profile:
⚠️ POTENTIALLY FATAL ENCOUNTER

Threats:
- Mobile Threat: high accessibility between areas of operation

Characteristics:
- fast-moving
- perceptive
- highly aggressive
- agile
- predatory pursuer

Caution:
⚠️ Potentially fatal encounter - maintain distance and use heavy firepower
⚠️ Can pursue across multiple rooms - avoid extended engagement
⚠️ Often deployed in pairs - assess numbers before engaging

Operational Summary:
Delta classification biohazard with 1.5-star ranking. Moderate-High threat level requires cautious engagement from secure distances. Use medium to heavy arms for rapid neutralization.
```

---

#### Example 12: Biohazard Combat Strategy

**Query**: "How do I deal with Crimson Heads?"

**Tools Used**: `search_biohazards` (name="Crimson Head")

**Expected Response**:

```
Crimson Head

S.T.A.R.S. Tactical Assessment:
(Statistical Threat Analysis Rating Standard)

Code Name: None
S.T.A.R.S. Classification: Epsilon (ε)
S.T.A.R.S. Ranking: 1 (★)
Threat Level: Moderate
Engagement Directive: Avoid else Engage
Origin: V-ACT reanimated T-Virus corpses (Zombie mutation)

Combat Intelligence:

Authorized Response Procedures:
- Engage from secure distances
- Avoid close proximity

Effective Measures:
short to long-range medium to heavy arms, defensive weapons, explosives

Threat Profile:
⚠️ HYPER ZOMBIE

Characteristics:
- fast-moving
- perceptive
- aggressive

Prevention Protocol:
⚠️ RECOMMENDED: Burn Zombie corpses to prevent V-ACT transformation
- Use Kerosene on downed zombies
- Prioritize high-traffic areas (Main Hall, Save Room corridors)
- Limited Kerosene supply - strategic application critical

Caution:
⚠️ WARNING: Hyper Zombie - significantly faster and more aggressive than standard zombies
⚠️ CAUTION: Avoid close proximity - increased speed makes escape difficult
⚠️ NOTICE: Result of V-ACT Mutation Threat from improperly neutralized zombies

Operational Summary:
Epsilon classification biohazard with 1-star ranking. Moderate threat level - avoid engagement when possible. Prevention (burning zombie corpses) preferred over elimination due to resource cost.
```

---

### Category 7: Strategic Queries

#### Example 13: Room Prioritization

**Query**: "Which rooms should I prioritize in Mansion 1F for items?"

**Tools Used**:

1. `get_rooms_by_map` (mapId="mansionF1")
2. Analyze item value vs threat
3. Rank by priority

**Expected Response**:

```
Mansion 1F - Item Priority Guide (Normal Difficulty)

HIGH PRIORITY (Get immediately):

1. ⭐ Dining Room Save Room
   - Ink Ribbon (save your game!)
   - First Aid Spray (clock puzzle)
   - Threat: None ✅
   - Time: 2 minutes
   → DO THIS FIRST

2. Kenneth's Room
   - Beretta Magazine (9mm ammo)
   - Radio (story item)
   - Threat: 1 Zombie (Kenneth) ⚠️
   - Time: 3 minutes
   → Essential early ammo

3. Armor Room
   - Shotgun Shells x6
   - Wind Emblem (required for progression)
   - Threat: 3 Zombies ⚠️⚠️⚠️
   - Time: 5 minutes
   - Requirement: Armor Key
   → Critical for progression

MEDIUM PRIORITY (Get when ready):

4. Piano Bar
   - Star Emblem
   - Music Notes (puzzle)
   - Threat: 1 Zombie ⚠️
   - Time: 3 minutes
   → Needed for emblem puzzle

5. Main Hall Storage Closet
   - Chemical (for V-Jolt)
   - Threat: 2 Zombies ⚠️⚠️
   - Time: 2 minutes
   → Useful for Plant 42 boss

LOW PRIORITY (Optional/Later):

6. Tiger Statue Room
   - Blue Gem (needed much later)
   - Threat: 2 Zombies ⚠️⚠️
   - Time: 4 minutes
   → Not immediately useful

7. Upper Balcony Passage
   - Ammunition (varies)
   - Threat: 1 Zombie ⚠️
   → Skip if low on resources

Optimal Route:
1. Main Hall → Dining Room (SAVE GAME)
2. Dining Room → Kenneth's Room (ammo)
3. Return to Main Hall → Get Armor Key later
4. With Armor Key → Armor Room (critical items)
5. Main Hall → Piano Bar (emblem)

Estimated Time: 20-25 minutes
Resources Needed:
- 10-15 Handgun bullets
- 1 Ink Ribbon
- 1 First Aid Spray (for safety)

This route ensures progression while managing resources.
```

---

#### Example 14: Safe Room Locations

**Query**: "Show me all safe rooms in the Mansion"

**Tools Used**:

1. `search_rooms` (function="safe-room")
2. Filter by map areas
3. List with details

**Expected Response**:

```
Safe Rooms in Spencer Mansion:

Mansion 1F:

1. Dining Room Save Room (diningRoomF1)
   Features:
   - ✅ Item Box (linked storage)
   - ✅ Typewriter (save game)
   - ✅ Clock Puzzle (First Aid Spray)
   - ✅ Ink Ribbons available

   Access: From Main Hall, north door
   Adjacent Rooms: Main Hall, Kenneth's Room
   Notes: Primary save room, use frequently

Mansion 2F:

2. Recreation Room Save Room (mansion-2f-save-room)
   Features:
   - ✅ Item Box (linked)
   - ✅ Typewriter
   - 📦 Shotgun Shells x4 (Normal+)
   - 📦 Mixed Herbs

   Access: From Upper Balcony, east corridor
   Adjacent Rooms: Upper Balcony, Art Gallery
   Notes: Mid-game hub, good for item management

Courtyard:

3. Guardhouse Save Room (guardhouse-1f-save-room)
   Features:
   - ✅ Item Box (linked)
   - ✅ Typewriter
   - 📦 First Aid Spray
   - 📦 Shotgun Shells (Hard difficulty)

   Access: Requires Courtyard access
   Adjacent Rooms: Guardhouse entrance, Plant 42 room
   Notes: Last safe room before boss area

Underground Laboratory:

4. Lab Save Room B4 (lab-b4-save-room)
   Features:
   - ✅ Item Box (linked)
   - ✅ Typewriter
   - 📦 Magnum rounds
   - 📦 First Aid Supplies

   Access: Deep in laboratory
   Adjacent Rooms: Lab corridors
   Notes: End-game preparation area

5. Lab Save Room B3 (lab-b3-save-room)
   Features:
   - ✅ Item Box (linked)
   - ✅ Typewriter
   - 📦 Heavy weapons ammunition

   Access: Upper lab section
   Notes: Boss fight preparation

Total Safe Rooms: 5 main locations

💡 Key Features:
- Item Boxes are LINKED → Items stored in one can be accessed from any
- Always carry 1 Ink Ribbon to ensure you can save
- Safe Rooms have NO biohazards (100% safe)
- Use for item management, save before dangerous areas

Recommended Save Points:
- Before entering new areas
- After collecting key items
- Before boss fights
- After significant progress (every 20-30 min)
```

---

### Category 8: Multi-Step Complex Queries

#### Example 15: Route Planning

**Query**: "I'm in the Main Hall, what rooms can I access and what's in them?"

**Tools Used**:

1. `get_rooms_by_ids` (ids=["mansion-1f-main-hall"])
2. Extract adjoiningRooms list
3. `get_rooms_by_ids` (for all adjacent rooms)

**Expected Response**:

```
From Main Hall (mainHallF1), you can access:

NORTH - Dining Room (Save Room) ✅
- Access: Unlocked, immediate
- Items: Ink Ribbon, First Aid Spray (clock puzzle)
- Threat: None (Safe Room)
- Time: 2 minutes
→ ⭐ RECOMMENDED: Go here first to save game

EAST - Armor Room 🔒
- Access: LOCKED - Requires Armor Key
- Items: Shotgun Shells x6, Wind Emblem
- Threat: 3 Zombies + Crimson Head (Hard) ⚠️⚠️⚠️
- Time: 5 minutes (with key)
→ Get Armor Key first (found in Graveyard)

WEST - Piano Bar / Music Room ✅
- Access: Unlocked
- Items: Star Emblem, Music Notes
- Threat: 1 Zombie ⚠️
- Time: 3 minutes
→ SAFE: Easy enemy, important for progression

SOUTH - Main Entrance Hall ✅
- Access: Unlocked (return to start area)
- Items: None
- Threat: 2 Zombies ⚠️⚠️
- Time: 1 minute
→ SKIP: No items, unnecessary combat

STAIRS (UP) - Mansion 2F Balcony ✅
- Access: Unlocked
- Items: None (passage only)
- Threat: None
- Time: 30 seconds
→ Leads to 2nd floor exploration

STAIRS (DOWN) - Basement Passage 🔒
- Access: LOCKED - Requires Shield Key
- Items: Laboratory access
- Threat: Varies
→ End-game area, not accessible yet

Recommended Next Steps:
1. ⭐ NORTH → Dining Room (SAVE GAME)
2. WEST → Piano Bar (get Star Emblem)
3. Return to Main Hall
4. Find Armor Key in graveyard (exit mansion temporarily)
5. EAST → Armor Room (with Armor Key)

Current Inventory Check:
- Do you have: Handgun ammo? (need ~10 bullets)
- Do you have: Ink Ribbon? (for saving)
- Health status: Full? (if not, get First Aid from Dining Room first)

Safe Route (No Armor Key):
Main Hall → Dining Room → Kenneth's Room → Piano Bar → Main Hall
Estimated time: 15 minutes
Threats: Minimal (2-3 zombies total)
```

---

#### Example 16: Item Gathering Route

**Query**: "I need shotgun ammo, where's the closest room?"

**Tools Used**:

1. Get current location context
2. `search_items` (name="Shotgun Shells", type="Ammunition")
3. `get_rooms_by_ids` (for rooms with shells)
4. Calculate route/distance

**Expected Response**:

```
Closest Shotgun Shell Locations:

Assuming current location: Main Hall (Mansion 1F)

CLOSEST OPTIONS:

1. ⭐ Armor Room (NEAREST - 1 room away)
   - Direction: EAST from Main Hall
   - Distance: 1 door, 15 seconds
   - Amount: 6 shells
   - Access: 🔒 Requires Armor Key
   - Threat: 3 Zombies ⚠️⚠️⚠️
   - Recommendation: BEST OPTION if you have Armor Key

2. Recreation Room (3 rooms away)
   - Direction: UP stairs to 2F, then EAST
   - Distance: 3 rooms, 2 minutes
   - Amount: 4 shells
   - Access: ✅ Unlocked
   - Threat: 1 Zombie ⚠️
   - Recommendation: SAFE OPTION if no Armor Key

3. Guardhouse Save Room (8 rooms away)
   - Direction: EXIT mansion → Courtyard → Guardhouse
   - Distance: ~8 rooms, 10 minutes
   - Amount: 8 shells
   - Access: 🔒 Requires Courtyard access
   - Threat: Multiple Zombies + Hunters ⚠️⚠️⚠️⚠️
   - Recommendation: Only if already in area

RECOMMENDED ACTION:

If you have Armor Key:
→ Go to Armor Room (EAST door from Main Hall)
→ Clear 3 Zombies (12-15 handgun rounds)
→ Collect 6 shells
→ Total time: 3 minutes

If you DON'T have Armor Key:
→ Go upstairs to 2F
→ Navigate to Recreation Room (EAST from balcony)
→ Clear 1 Zombie (4-5 handgun rounds)
→ Collect 4 shells
→ Total time: 4 minutes

Armor Key Location (if needed):
→ Exit mansion to exterior
→ Go to Graveyard (west side)
→ Solve coffin puzzle
→ Retrieve Armor Key
→ Return to Armor Room

Resource Cost Analysis:
- Armor Room: Spend 12-15 bullets, get 6 shells (net: -15 bullets, +6 shells)
- Recreation Room: Spend 4-5 bullets, get 4 shells (net: -5 bullets, +4 shells)

Best value: Armor Room (if you can handle the zombies)
Safest: Recreation Room (fewer enemies)
```

---

### Category 9: Difficulty Comparison

#### Example 17: Difficulty Analysis

**Query**: "Compare item availability in the Dining Room on Jill Very Easy vs Chris Hard"

**Tools Used**:

1. `get_rooms_by_ids` (ids=["mansion-1f-dining-room"], difficulty="JV-lvl-very-easy")
2. `get_rooms_by_ids` (ids=["mansion-1f-dining-room"], difficulty="CR-lvl-hard")

**Expected Response**:

```
Dining Room Save Room - Difficulty Comparison

Jill Valentine - Very Easy:
────────────────────────────────

Items:
✅ Ink Ribbon x2 (DOUBLE amount)
✅ First Aid Spray x2 (from clock puzzle)
✅ Shotgun (starts with it, accessible in adjacent Save Room)
✅ Green Herb x1

Biohazards: None (Safe Room)

Features:
- More healing items
- More save opportunities
- Shotgun available immediately
- Lower overall difficulty

Resource Impact:
→ Can save frequently (2 ribbons)
→ More forgiving of mistakes
→ Stronger starting equipment


Chris Redfield - Hard:
────────────────────────

Items:
⚠️ Ink Ribbon x1 (HALF the amount)
⚠️ First Aid Spray x1 (from clock puzzle)
❌ NO Shotgun (must find in Armor Room)
❌ NO additional healing

Biohazards: None (Safe Room)

Features:
- Must conserve saves (limited ribbons)
- Weaker starting equipment
- No immediate shotgun access
- Higher enemy counts elsewhere

Resource Impact:
→ Save sparingly (only 1 ribbon here)
→ Must plan save points carefully
→ Weaker until Armor Room accessed


KEY DIFFERENCES:

Ink Ribbons: 2x difference
- Very Easy: Liberal saving
- Hard: Strategic saving only

Starting Weapons:
- Jill: Shotgun from start
- Chris: Must find shotgun, has Lighter instead

First Aid Sprays: 2x difference
- Very Easy: Can afford to take damage
- Hard: Must avoid damage

Difficulty Impact:
- Very Easy: Forgiving, resource-rich
- Hard: Punishing, resource management critical

Strategy Recommendations:

Very Easy (Jill):
→ Save frequently (you have 2 ribbons)
→ Use shotgun liberally
→ Healing is abundant

Hard (Chris):
→ Save only before major events
→ Conserve resources heavily
→ Plan every encounter
→ Must burn zombie corpses (Crimson Heads more common)


The same room has DRASTICALLY different resource availability!
```

---

### Category 10: Advanced Multi-Condition Queries

#### Example 18: Rooms with Multiple Criteria

**Query**: "Which rooms have both items AND biohazards?"

**Tools Used**:

1. `get_all_areas`
2. `get_rooms_by_map` (for each map)
3. Filter rooms where items.length > 0 AND biohazards.length > 0

**Expected Response**:

```
Rooms with BOTH Items AND Biohazards:

This list shows combat-heavy rooms that also contain valuable items.

MANSION 1F:
───────────

1. Armor Room (armorRoom)
   Items:
   - Shotgun Shells x6 ⭐ HIGH VALUE
   - Wind Emblem (required)
   - Chest with mixed items

   Biohazards:
   - 3 Zombies (Normal)
   - 4 Zombies + 1 Crimson Head (Hard)

   Threat: ⚠️⚠️⚠️ MODERATE-HIGH
   Strategy: Clear enemies first, then collect items
   Worth it: ✅ YES (essential items)

2. Kenneth's Room (kennethRoom)
   Items:
   - Beretta Magazine (9mm ammo)
   - Radio (story item)

   Biohazards:
   - 1 Zombie (Kenneth)

   Threat: ⚠️ LOW
   Strategy: Easy kill or avoid, grab items quickly
   Worth it: ✅ YES (early ammo critical)

3. Main Hall (mainHallF1)
   Items:
   - Emblem puzzle components (progression)

   Biohazards:
   - 4 Zombies + 1 Crimson Head (Hard)

   Threat: ⚠️⚠️⚠️⚠️ HIGH
   Strategy: High-traffic area, must clear eventually
   Worth it: ✅ YES (required for progression)

MANSION 2F:
───────────

4. Recreation Room (mansion-2f-recreation-room)
   Items:
   - Shotgun Shells x4
   - Grenade Launcher ⭐ HIGH VALUE
   - Mixed Herbs

   Biohazards:
   - 1 Zombie

   Threat: ⚠️ LOW
   Strategy: Easy enemy for valuable rewards
   Worth it: ✅ YES (excellent loot)

5. Art Gallery (mansion-2f-art-gallery)
   Items:
   - Magnum rounds
   - Map

   Biohazards:
   - 2 Zombies

   Threat: ⚠️⚠️ MODERATE
   Strategy: Mid-game area, valuable ammo
   Worth it: ✅ YES (Magnum rounds rare)

COURTYARD:
──────────

6. Guardhouse Entrance (guardhouse-entrance)
   Items:
   - First Aid Spray
   - Shotgun Shells

   Biohazards:
   - 2 Cerberus (dogs)

   Threat: ⚠️⚠️⚠️ MODERATE
   Strategy: Dogs are fast, use shotgun
   Worth it: ⚠️ MAYBE (if low on supplies)

COMBAT STRATEGY GUIDE:

For Rooms with Items + Biohazards:

1. Assess Threat:
   - Low (1-2 enemies): Fight, collect items
   - Moderate (3-4 enemies): Fight if needed
   - High (5+ or Crimson Head): Consider avoiding

2. Resource Check:
   - Ammo sufficient? (10-15 rounds per room)
   - Health above 50%?
   - Have healing items?

3. Combat Tactics:
   - Clear room first (don't loot mid-combat)
   - Use doors for crowd control
   - Headshots save ammo
   - Burn corpses in high-traffic areas

4. Loot Priority:
   - High value: Weapons, weapon ammo, keys
   - Medium value: Healing, herbs, ink ribbons
   - Low value: General items, puzzle items (get when safe)

Total Rooms: 6 main locations with both threats and rewards

Progression Note: You MUST clear these rooms eventually for items. Plan accordingly.
```

---

#### Example 19: Key Planning

**Query**: "What keys do I need for the Courtyard?"

**Tools Used**:

1. `search_rooms` (mapId="courtyard-\*")
2. Check access requirements
3. `search_items` (for required keys)

**Expected Response**:

```
Keys Required for Courtyard Access:

PROGRESSION PATH:
═════════════════

PRIMARY KEY (REQUIRED):

1. Sword Key 🗝️ CRITICAL
   Location: Mansion 1F Main Hall
   Requirement: Complete 4 Emblem Puzzle
   Unlocks: East Wing → Courtyard exterior door

   Progression:
   - Without this: CANNOT access Courtyard at all
   - With this: Can reach Courtyard exterior

   How to Get:
   a) Collect 4 emblems (Gold, Wind, Star, Moon)
   b) Insert all 4 into Main Hall statue
   c) Retrieve Sword Key from statue base

COURTYARD AREA KEYS:

2. Courtyard Key 🗝️ (for full access)
   Location: Guardhouse 1F (after Plant 42 boss)
   Requirement: Defeat Plant 42
   Unlocks: All interior Courtyard passages

   Areas Unlocked:
   - Courtyard inner passages
   - Additional save room access
   - Shortcut routes

   Optional: Can explore limited areas without this

3. Armor Key 🗝️ (optional but recommended)
   Location: Courtyard Graveyard (exterior)
   Requirement: Solve coffin puzzle
   Unlocks: Armor Room (back in Mansion 1F)

   Why Get This:
   - Found IN Courtyard graveyard
   - Unlocks Armor Room (6 shotgun shells!)
   - Required for Wind Emblem

   Backtracking: Must return to Mansion 1F to use

ACCESS PROGRESSION:
══════════════════

Stage 1: Getting There
→ Need: Sword Key
→ Path: Mansion 1F East Wing → Exit to exterior → Courtyard

Stage 2: Exterior Exploration
→ Accessible: Courtyard exterior, Graveyard
→ Can Find: Armor Key in Graveyard
→ Threat: Cerberus (dogs), Crows

Stage 3: Guardhouse Access
→ Enter: Guardhouse building
→ Boss: Plant 42
→ Reward: Courtyard Key

Stage 4: Full Courtyard Access
→ Need: Courtyard Key (from Plant 42)
→ Unlocks: All interior passages
→ Threat: Hunters (post-Guardhouse)

RECOMMENDED ORDER:
═════════════════

1. Get Sword Key (Main Hall emblem puzzle)
   Time: ~30-40 minutes of gameplay
   Prerequisites: All 4 emblems

2. Enter Courtyard (use Sword Key on East Wing door)
   Time: 5 minutes
   Prepare: Bring shotgun, healing items

3. Explore exterior, find Armor Key (Graveyard)
   Time: 10 minutes
   Threat: 2 Cerberus, crows

4. Optional: Backtrack to Armor Room (use Armor Key)
   Time: 15 minutes round trip
   Reward: 6 shotgun shells + Wind Emblem

5. Enter Guardhouse
   Time: 20 minutes
   Boss: Plant 42 (use V-Jolt or flame rounds)

6. Get Courtyard Key (from Plant 42 boss room)
   Time: 2 minutes
   Reward: Full Courtyard access

7. Return to Courtyard with Courtyard Key
   Time: 5 minutes
   Unlocks: Inner passages, shortcuts

TOTAL KEYS NEEDED: 3 (Sword, Courtyard, Armor)
CRITICAL: Sword Key (must have)
OPTIONAL: Armor Key (highly recommended)
REWARD: Courtyard Key (from boss)

Preparation Checklist:
□ Sword Key obtained
□ Shotgun + 20-30 shells
□ 2-3 First Aid Sprays
□ V-Jolt mixture (for Plant 42) OR
□ Grenade Launcher + Incendiary rounds
□ 2-3 Ink Ribbons (save before boss)

Estimated Total Time: 60-90 minutes
```

---

#### Example 20: Multi-Item Location Planning

**Query**: "Which rooms have Ink Ribbons, First Aid Sprays, AND Shotgun Shells?"

**Tools Used**:

1. `search_items` (multiple searches)
2. Cross-reference locations
3. `get_rooms_by_ids` (for rooms with all three)

**Expected Response**:

```
Rooms with Ink Ribbons + First Aid Sprays + Shotgun Shells:

PERFECT SUPPLY ROOMS:
═══════════════════════

These rooms have ALL THREE essential items!

1. ⭐ Recreation Room (Mansion 2F)
   mansion-2f-recreation-room

   Contains:
   ✅ Ink Ribbon x1
   ✅ First Aid Spray x1
   ✅ Shotgun Shells x4 (Normal/Hard only)

   Access: Unlocked from Upper Balcony
   Threat: 1 Zombie ⚠️
   Features: Item Box, Typewriter (Save Room!)

   → BEST ROOM: Has all 3 + save functionality!

2. ⭐ Guardhouse Save Room (Courtyard)
   guardhouse-1f-save-room

   Contains:
   ✅ Ink Ribbon x1
   ✅ First Aid Spray x2
   ✅ Shotgun Shells x8-10 (Hard: 10, Normal: 8)

   Access: Requires Courtyard access
   Threat: None (Safe Room) ✅
   Features: Item Box, Typewriter

   → BEST QUANTITIES: Highest amounts of all items!

ROOMS WITH 2 OUT OF 3:
═══════════════════════

Ink Ribbons + First Aid (no shells):

3. Dining Room Save Room (Mansion 1F)
   ✅ Ink Ribbon x1-2
   ✅ First Aid Spray x1-2
   ❌ No Shotgun Shells
   → Early game save room

4. Lab Save Room B4
   ✅ Ink Ribbon x1
   ✅ First Aid Spray x1
   ❌ No Shotgun Shells (has Magnum rounds instead)
   → End game save room

First Aid + Shotgun Shells (no ribbons):

5. Courtyard Passage
   ❌ No Ink Ribbons
   ✅ First Aid Spray x1
   ✅ Shotgun Shells x10 (Hard only)
   → High-risk, high-reward

Shotgun Shells + Ink Ribbons (no First Aid):

6. None exist! This combination doesn't appear together.

COLLECTION STRATEGY:
═══════════════════

Optimal Resource Gathering Route:

Early Game (Mansion 1F):
1. Dining Room → Get Ink Ribbons + First Aid
2. Armor Room → Get Shotgun Shells x6
   Total: 2 ribbons, 2 First Aid, 6 shells

Mid Game (Mansion 2F):
3. Recreation Room → Get ALL THREE
   Total: 1 ribbon, 1 First Aid, 4 shells

Late Game (Courtyard):
4. Guardhouse → Get ALL THREE (best quantities!)
   Total: 1 ribbon, 2 First Aid, 8-10 shells

TOTAL POSSIBLE COLLECTION:
═════════════════════════

If you visit all key locations:

Ink Ribbons: 3-4 total
- Dining Room: 1-2 (difficulty dependent)
- Recreation Room: 1
- Guardhouse: 1

First Aid Sprays: 4-6 total
- Dining Room: 1-2 (from puzzle)
- Recreation Room: 1
- Guardhouse: 2

Shotgun Shells: 18-26 total
- Armor Room: 6
- Recreation Room: 4
- Guardhouse: 8-10 (difficulty dependent)
- Courtyard Passage: 10 (Hard only)

This should sustain you through:
- Early game (Mansion exploration)
- Mid game (Guardhouse, Plant 42)
- Late game preparation (before Laboratory)

EFFICIENCY TIP:
═══════════════

Best Single Stop: Guardhouse Save Room
→ If you can only visit ONE room for supplies, make it this one
→ Has highest quantities of all three items
→ Also has Item Box for inventory management

Best Two Stops: Recreation Room + Guardhouse
→ Covers mid and late game needs
→ Both are safe rooms (can save progress)
→ Recreation Room: 4 shells + ribbon + First Aid
→ Guardhouse: 10 shells + ribbon + 2x First Aid

Resource Management:
→ Ink Ribbons: Save before bosses, key events
→ First Aid: Use when health below 50%
→ Shotgun Shells: Primary weapon vs Hunters, bosses
```

---

## Rate Limiting

### How It Works

The MCP server implements client-side rate limiting matching the Express API:

**Limits:**

- **100 requests** per **15 minutes** (900 seconds)
- Window is rolling (not fixed intervals)
- Enforced per MCP server instance

**Behavior:**

```
Request #1-100: ✅ Allowed
Request #101: ❌ Error with wait time
After 15 minutes: Window resets
```

**Example Error:**

```
Rate limit exceeded (100 requests per 900s).
Please wait 347 seconds before making more requests.
```

### Best Practices

1. **Batch requests** when possible
2. **Use specific tools** (avoid unnecessary searches)
3. **Cache responses** in your conversation (Claude remembers recent data)
4. **Plan queries** before executing

### Monitoring

The MCP server logs rate limit info on startup:

```
⏱️ Rate Limit: 100 requests per 900s
```

Track your usage to avoid hitting limits during important queries.

## Error Handling

### Error Types

#### 1. Connection Errors

**Symptom:**

```
Error: Request timed out after 10000ms.
The API server may be down or unresponsive.
```

**Solutions:**

- Verify Express API is running
- Check `API_BASE_URL` is correct
- Increase `API_TIMEOUT` if needed

#### 2. Rate Limit Errors

**Symptom:**

```
Error: Rate limit exceeded (100 requests per 900s).
Please wait 234 seconds before making more requests.
```

**Solutions:**

- Wait the indicated time
- Plan queries more efficiently
- Use caching (Claude remembers recent data)

#### 3. Invalid Input Errors

**Symptom:**

```
Error: API Error (400): Invalid request parameters
```

**Solutions:**

- Check room ID format (use kebab-case)
- Verify difficulty enum values
- Ensure required parameters provided

#### 4. Not Found Errors

**Symptom:**

```
Error: API Error (404): Room not found
```

**Solutions:**

- Verify ID spelling
- Use search tools first to find correct IDs
- Check OpenAPI docs for valid IDs

### Error Recovery

Claude automatically handles errors by:

1. Showing error message to you
2. Suggesting alternative approaches
3. Retrying with corrected parameters

## Development

### Adding New Tools

When the Express API adds new endpoints:

#### 1. Update Types

Edit `src/types.ts`:

```typescript
// Add new response types
export interface NewFeatureResponse {
    data: NewFeature[];
}

export interface NewFeature {
    id: string;
    name: string;
    // ... fields
}
```

#### 2. Create Tool

Add to appropriate file in `src/tools/`:

```typescript
{
    name: 'new_tool_name',
    description: 'Clear description for Claude',
    inputSchema: {
        type: 'object',
        properties: {
            param1: {
                type: 'string',
                description: 'What this param does',
            },
        },
        required: ['param1'],
    },
    handler: async (args: { param1: string }) => {
        const data = await client.request<NewFeatureResponse>(
            '/api/new-endpoint',
            { param1: args.param1 }
        );
        return {
            content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        };
    },
}
```

#### 3. Rebuild

```bash
npm run build
```

#### 4. Document

Add examples to this file and update `mcp-server/README.md`.

### Testing

Test new tools:

```bash
# Start Express API
cd ..
npm start

# In another terminal, start MCP server
cd mcp-server
npm start

# Use Claude Desktop to test the tool
```

## Troubleshooting

### Common Issues

#### MCP Server Won't Start

**Check:**

1. Node.js version: `node --version` (need 18+)
2. Dependencies installed: `npm install`
3. Built successfully: `npm run build`
4. No port conflicts

#### Claude Can't See Tools

**Check:**

1. Claude Desktop config file path correct
2. Absolute paths used (not relative)
3. Claude Desktop restarted after config change
4. MCP server running (check terminal)

#### Tools Return Errors

**Check:**

1. Express API running on correct port
2. `API_BASE_URL` matches API server
3. Data exists for query (use simpler queries first)
4. Rate limit not exceeded

#### Slow Response Times

**Causes:**

- Large data sets
- Slow API server
- Network issues

**Solutions:**

- Use more specific queries
- Filter by difficulty (reduces data size)
- Check API server performance

## Future Enhancements

### Planned Features

#### 1. Authentication Support

**Status**: Ready (awaiting API implementation)

**Configuration:**

```json
{
    "env": {
        "API_AUTH_TOKEN": "your-bearer-token"
    }
}
```

**Will Enable:**

- User-specific data
- Save game integration
- Personalized recommendations

#### 2. Response Caching

**Status**: Planned

**Will Provide:**

- Faster repeated queries
- Reduced API load
- Offline capability (cached data)

#### 3. Batch Operations

**Status**: Under consideration

**Example:**

```typescript
{
  name: 'get_multiple_rooms_with_items',
  // Combines multiple operations into one
}
```

#### 4. Real-time Updates

**Status**: Future consideration

**Would Enable:**

- Live data updates
- Collaborative features
- Push notifications

### Contributing

To suggest features:

1. Open issue in GitHub repo
2. Describe use case
3. Provide example queries
4. Explain benefit

---

## Quick Reference

### Essential Tools for Common Tasks

| Task                     | Tool to Use                         |
| ------------------------ | ----------------------------------- |
| "What's in this room?"   | `search_rooms` + `get_rooms_by_ids` |
| "Where can I find X?"    | `search_items` or `search_rooms`    |
| "What enemies are here?" | `get_rooms_by_ids` (with room ID)   |
| "Show me all items"      | `get_all_items`                     |
| "What areas exist?"      | `get_all_areas`                     |
| "Rooms in area X?"       | `get_rooms_by_map`                  |

### Difficulty Level Codes

| Code               | Meaning                    |
| ------------------ | -------------------------- |
| `JV-lvl-very-easy` | Jill Valentine - Very Easy |
| `JV-lvl-easy`      | Jill Valentine - Easy      |
| `JV-lvl-normal`    | Jill Valentine - Normal    |
| `JV-lvl-hard`      | Jill Valentine - Hard      |
| `CR-lvl-very-easy` | Chris Redfield - Very Easy |
| `CR-lvl-easy`      | Chris Redfield - Easy      |
| `CR-lvl-normal`    | Chris Redfield - Normal    |
| `CR-lvl-hard`      | Chris Redfield - Hard      |

### Item Type Codes

**IMPORTANT**: Item types use PascalCase (exact match required).

| Type               | Examples                                            |
| ------------------ | --------------------------------------------------- |
| `Weapon`           | Handgun, Shotgun                                    |
| `Ammunition`       | Handgun Magazine, Shotgun Shells, Acid Shells       |
| `GreenHerb`        | Green Herb                                          |
| `RedHerb`          | Red Herb                                            |
| `BlueHerb`         | Blue Herb                                           |
| `FirstAidSpray`    | First Aid Spray                                     |
| `SelfDefense`      | Battery Pack (Jill), Flash Grenade (Chris)          |
| `DoorKey`          | Lockpick, Old Key, Shield Key, Armor Key, Sword Key |
| `Document`         | Keeper's Diary, Body Disposal, Trevor's Diary       |
| `ItemOfInterest`   | Emblem, Blue Gemstone, Red Gemstone                 |
| `Typewriter`       | Typewriter (save points)                            |
| `ItemBox`          | Item Box (storage)                                  |
| `Kerosene`         | Kerosene (burn zombie corpses)                      |
| `Map`              | Map items                                           |
| `InkRibbon`        | Ink Ribbon (save game resource)                     |
| `PersonOfInterest` | Barry Burton, Rebecca Chambers, Kenneth, Richard    |

---

**For more help:** See `mcp-server/README.md` for quick start guide.
