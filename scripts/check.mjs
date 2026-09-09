import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const htmlFiles = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'scripts'].includes(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (extname(entry.name) === '.html') htmlFiles.push(path);
  }
}

await walk(root);
const errors = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (!/<html lang="en">/.test(html)) errors.push(`${relative(root, file)}: missing language`);
  if (!/<meta name="description"/.test(html)) errors.push(`${relative(root, file)}: missing description`);
  if (!/<h1[ >]/.test(html)) errors.push(`${relative(root, file)}: missing h1`);
  if (!/href="#main"/.test(html) || !/id="main"/.test(html)) errors.push(`${relative(root, file)}: missing skip target`);

  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (href.startsWith('//')) continue;
    const target = href.endsWith('/') ? join(root, href, 'index.html') : resolve(root, `.${href}`);
    try { await readFile(target); } catch { errors.push(`${relative(root, file)}: broken internal link ${href}`); }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} HTML files: metadata, landmarks and internal links pass.`);
