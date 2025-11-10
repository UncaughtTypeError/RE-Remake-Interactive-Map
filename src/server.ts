/**
 * @file Main entry point for the Express API server.
 * @description Configures and starts the Express application, serving static files, API routes
 * (e.g., `/api/items`), and Swagger documentation (`/api-docs`). Handles JSON parsing, error
 * handling, and environment configuration (via `dotenv`). Serves endpoints for resources like
 * items, rooms, and biohazards.
 * @see {@link ./openapi.yaml} for API specification.
 * @see {@link ./middleware/errorHandler.ts} for error handling details.
 */
import 'dotenv/config';
import express, { Application } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';
import fs from 'fs';

// Import routes
import { errorHandler } from './middleware/errorHandler';
import itemsRouter from './routes/itemsRoutes';
import biohazardsRouter from './routes/biohazardsRoutes';
import mapsRouter from './routes/mapsRoutes';
import personsRouter from './routes/personsRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

const openapiSpec = yaml.parse(fs.readFileSync('./openapi.yaml', 'utf8'));

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve bundled files from '../dist'
app.use(express.static(path.join(__dirname, '../dist')));
// Serve static files from current 'src'
app.use(express.static(__dirname));

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`DEBUGing? ${process.env.DEBUG_MODE}`);
});

/* API setup
 * This section sets up the API endpoints for the all services.
 * It uses Express to create a RESTful API that allows retrieval of
 * items, biohazards, rooms, and associated data.
 */

// Enable JSON parsing for requests
app.use(express.json());

// Mount routers
app.use('/api/items', itemsRouter);
app.use('/api/biohazards', biohazardsRouter);
app.use('/api/maps', mapsRouter);
app.use('/api/persons', personsRouter);

// Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

// Global error handler, must be mounted after all routes to catch errors
app.use(errorHandler);
