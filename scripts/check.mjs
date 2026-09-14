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
  const name = relative(root, file);
  if (!/<html lang="en">/.test(html)) errors.push(`${name}: missing language`);
  if (!/<meta name="description"/.test(html)) errors.push(`${name}: missing description`);
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) errors.push(`${name}: expected one h1, found ${h1Count}`);
  if (!/href="#main"/.test(html) || !/id="main"/.test(html)) errors.push(`${name}: missing skip target`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) errors.push(`${name}: duplicate ids ${duplicateIds.join(', ')}`);

  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="[^"]*"/.test(match[0])) errors.push(`${name}: image missing alt text`);
    if (!/\swidth="\d+"/.test(match[0]) || !/\sheight="\d+"/.test(match[0])) errors.push(`${name}: image missing intrinsic dimensions`);
  }
  for (const match of html.matchAll(/<iframe\b[^>]*>/g)) {
    if (!/\stitle="[^"]+"/.test(match[0])) errors.push(`${name}: iframe missing title`);
  }

  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (href.startsWith('//')) continue;
    const target = href.endsWith('/') ? join(root, href, 'index.html') : resolve(root, `.${href}`);
    try { await readFile(target); } catch { errors.push(`${relative(root, file)}: broken internal link ${href}`); }
  }
}

for (const path of ['index.html', 'contact/index.html']) {
  const html = await readFile(join(root, path), 'utf8');
  if (!html.includes('tally.so/embed/obPWZP')) errors.push(`${path}: live contact form missing`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} HTML files: metadata, headings, media, ids, contact form and internal links pass.`);
