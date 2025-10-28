/**
 * @file dev-watch.ts
 * @description Custom development watcher script for automatic server reloading on file changes.
 *
 * Watcher Principles:
 * - Utilizes Chokidar, a robust file watching library, for efficient monitoring of specified directories and files without relying on native tool-specific watch modes.
 * - Leverages Node.js's `child_process.spawn` to run and restart the Bun server process, ensuring isolated execution and easy signal forwarding for clean shutdowns.
 * - Chosen for cross-platform reliability (e.g., polling for consistent detection on Windows/WSL/macOS), avoiding issues with editor atomic saves or FS events via options like `awaitWriteFinish`.
 * - Supports debugging with a `DEBUG` flag for verbose logging, promoting observability during development.
 * - Standards: Follows Node.js best practices for process management (e.g., piping stdio, handling SIGINT via `process.on`), Chokidar's recursive directory watching, and ECMAScript for idiomatic async event handling.
 * - Practices: Adheres to DRY by encapsulating restart logic, defensive programming (error/event logging, graceful exits), and modularity (exportable if extended). Configurable via globs for project-specific paths, aligning with 12-Factor App dev principles for local environments.
 */
import chokidar from 'chokidar';
import { spawn } from 'child_process';
import path from 'path';

const DEBUG = false;

let child = spawn('bun', ['src/server.ts']);

// Pipe child output to parent console for visibility
child.stdout.on('data', (data) => console.log(data.toString().trim()));
child.stderr.on('data', (data) => console.error(data.toString().trim()));

child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
});

const rootDir = path.resolve(__dirname, '..'); // Project root
const watcher = chokidar.watch(
    [path.join(rootDir, 'src/server.ts'), path.join(rootDir, 'src/data')],
    {
        persistent: true,
        usePolling: true,
        interval: 200,
        awaitWriteFinish: { stabilityThreshold: 2000, pollInterval: 100 },
        ignored: /(^|[\/\\])\../, // Ignore dotfiles; add /(?!.*\.ts$)
    },
);

watcher
    .on('ready', () => {
        console.log('Watcher initialized and ready.');
        DEBUG && console.log(`Monitoring paths: ${JSON.stringify(watcher.getWatched(), null, 2)}`);
    })
    .on('all', (event, path) => DEBUG && console.log(`Event: ${event} on file: ${path}`))
    .on('add', (path) => DEBUG && console.log(`Added file: ${path}`)) // Log newly added files post-ready
    .on('addDir', (path) => DEBUG && console.log(`Added directory: ${path}`)) // Log new dirs
    .on('change', (path) => {
        console.log(`Detected change in ${path}. Restarting server...`);
        child.kill();
        child = spawn('bun', ['src/server.ts']);
        // Re-attach output pipes
        child.stdout.on('data', (data) => console.log(data.toString().trim()));
        child.stderr.on('data', (data) => console.error(data.toString().trim()));
    })
    .on('error', (error) => console.error(`Watcher error: ${error}`));

// Handle Ctrl+C (SIGINT) for graceful shutdown
process.on('SIGINT', () => {
    console.log('Received SIGINT (Ctrl+C). Shutting down...');
    if (child) {
        child.kill('SIGINT');
    }
    watcher.close();
    process.exit(0);
});
