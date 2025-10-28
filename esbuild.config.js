import 'dotenv/config';
import esbuild from 'esbuild';
import { glob } from 'glob';
import chokidar from 'chokidar';
import fs from 'fs-extra';
import path from 'path';

const OUT_DIR = 'dist';

const buildOptions = {
    entryPoints: ['src/main.ts'],
    bundle: true,
    outdir: OUT_DIR,
    minify: !process.env.DEBUG_MODE == 'true',
    format: 'esm',
    loader: { '.css': 'css' },
    plugins: [
        {
            name: 'exclude-tests',
            setup(build) {
                // Exclude imports from __tests__ or tests
                build.onResolve({ filter: /(__tests__|tests)/ }, (args) => {
                    return { external: true };
                });
                // Prevent loading files from __tests__ or tests
                build.onLoad({ filter: /[\/\\](__tests__|tests)[\/\\]/ }, () => {
                    return { contents: '', loader: 'js' };
                });
            },
        },
        {
            name: 'generate-template-manifest',
            setup(build) {
                build.onEnd(() => {
                    // Dynamic file loading: Use glob to find all .html templates in src/ui/**/templates/
                    // Allows automatic discovery of templates without manual config updates.
                    // Scans at build time, generates a TS manifest with paths and inferred container IDs.
                    // Benefits: Maintainable—add template, rebuild, auto-included. Paths match dist structure for fetch.
                    const templateFiles = glob.sync('./src/ui/**/templates/*.html');
                    const manifest = templateFiles.map((file) => {
                        const fileName = path.basename(file, '.html');
                        const containerId =
                            fileName.replace(/([A-Z])/g, '-$1').toLowerCase() + '-container'; // e.g., 'roomDetail' -> 'room-detail-container'
                        // Normalize to forward slashes and strip the leading './'
                        const normalizedPath = file.replace(/\\/g, '/').replace('./', '');
                        const outputPath = `/${normalizedPath}`; // Served path matching dist structure, e.g., '/src/ui/roomDetail/templates/roomDetail.html'
                        return { path: outputPath, containerId };
                    });
                    const manifestContent = `export const templateManifest = ${JSON.stringify(manifest, null, 2)};`;

                    // Write to src so it can be imported and bundled
                    fs.ensureDirSync('./src/templates');
                    fs.writeFileSync('./src/templates/templateManifest.js', manifestContent);

                    console.log(
                        `[manifest] Generated template manifest with ${manifest.length} templates`,
                    );
                });
            },
        },
        {
            name: 'copy-html-templates',
            setup(build) {
                build.onEnd(() => {
                    const templateFiles = glob.sync('./src/ui/**/templates/*.html');
                    console.log(`[copy-html] Found ${templateFiles.length} HTML files`);

                    templateFiles.forEach((file) => {
                        const normalizedFile = file.replace(/\\/g, '/'); // Normalize to forward slashes
                        const relativePath = normalizedFile.replace('./', '');
                        const destPath = `./${OUT_DIR}/${relativePath}`;

                        fs.ensureDirSync(path.dirname(destPath));
                        fs.copyFileSync(file, destPath);
                        console.log(`[copy-html] Copied: ${file} -> ${destPath}`);
                    });

                    console.log(
                        `[copy-images] Copied ${templateFiles.length} images to ${OUT_DIR}`,
                    );
                });
            },
        },
        {
            name: 'copy-images',
            setup(build) {
                build.onEnd(() => {
                    const imageFiles = glob.sync('./src/img/**/*.*');
                    console.log(`[copy-images] Found ${imageFiles.length} image files`);

                    imageFiles.forEach((file) => {
                        const normalizedFile = file.replace(/\\/g, '/'); // Normalize to forward slashes
                        const relativePath = normalizedFile.replace('./', '');
                        const destPath = `./${OUT_DIR}/${relativePath}`;

                        fs.ensureDirSync(path.dirname(destPath));
                        fs.copyFileSync(file, destPath);
                        console.log(`[copy-html] Copied: ${file} -> ${destPath}`);
                    });

                    console.log(`[copy-images] Copied ${imageFiles.length} images to ${OUT_DIR}`);
                });
            },
        },
    ],
};

async function rebuild(changedFile) {
    try {
        const result = await esbuild.build({ ...buildOptions, write: true });
        const now = new Date().toLocaleTimeString();
        console.log(`[esbuild] Rebuild succeeded at ${now}`);
        if (changedFile) {
            console.log(`  Changed: ${changedFile}`);
        }
        if (result.warnings.length) {
            console.log(`  Warnings: ${result.warnings.length}`);
            result.warnings.forEach((w) => console.log(`    ${w.text}`));
        }
    } catch (err) {
        const now = new Date().toLocaleTimeString();
        console.log(`[esbuild] Rebuild failed at ${now}`);
        if (changedFile) {
            console.log(`  Changed: ${changedFile}`);
        }
        if (err.errors) {
            err.errors.forEach((e) => console.log(`    Error: ${e.text}`));
        } else {
            console.error(err);
        }
    }
}

// Initial build
await rebuild();

// Watch for changes
const watcher = chokidar.watch('src', {
    ignoreInitial: true,
    ignored: (path) => path.includes('templateManifest.js'), // Ignore generated file
});
watcher.on('all', (event, changedPath) => {
    console.log(`[chokidar] ${event}: ${path.relative(process.cwd(), changedPath)}`);
    rebuild(path.relative(process.cwd(), changedPath));
});

console.log('Watching for changes with chokidar + esbuild...');
