const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const workspace = path.resolve(__dirname, '..');
const distDir = path.join(workspace, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Bundle JS app into one non-module file
esbuild.buildSync({
  entryPoints: [path.join(workspace, 'js', 'app.js')],
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: ['es2017'],
  outfile: path.join(distDir, 'spr.bundle.js'),
  minify: false,
  sourcemap: false,
});

const inputIndex = path.join(workspace, 'index.html');
let html = fs.readFileSync(inputIndex, 'utf8');

// replace app entry point inline script with bundled reference
html = html.replace(
  /<!-- ── App Entry Point[^\n]*-->\s*<script>[\s\S]*?<\/script>/,
  '<script src="spr.bundle.js"></script>'
);

// optional: disable code split and extra script with variables; all dependencies are in bundle
fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');

console.log('✅ SPA build created in dist/index.html');
console.log('✅ Bundle output: dist/spr.bundle.js');