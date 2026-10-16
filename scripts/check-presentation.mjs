// Static offline-artifact checks; visual/interaction QA is a separate browser pass.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(repo, 'docs/presentations/before-you-build.html');
const html = fs.readFileSync(file, 'utf8');
assert.match(html, /<!doctype html>/i);
assert.match(html, /<html lang="tr">/);
assert.match(html, /name="viewport"/);
const slides = [...html.matchAll(/<section class="slide[^\"]*" data-title="([^\"]+)"/g)];
assert.ok(slides.length > 1, 'presentation must contain titled slides');
assert.equal(new Set(slides.map(match => match[1])).size, slides.length, 'slide titles must be unique');
const ids = [...html.matchAll(/\sid="([^\"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'duplicate static element id');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1);
new vm.Script(scripts[0][1], { filename: file });
assert.doesNotMatch(html, /<(?:script|img|iframe)\b[^>]*\bsrc=/i, 'standalone deck must not fetch external assets');
assert.doesNotMatch(html, /<link\b[^>]*\bhref=/i, 'styles and fonts must be offline');
const links = [...html.matchAll(/\shref="([^\"]+)"/g)].map(match => match[1]);
for (const link of links) {
  assert.ok(!/^[a-z]+:/i.test(link), 'supplementary links should stay in the repo');
  assert.ok(fs.existsSync(path.resolve(path.dirname(file), link.split('#')[0])), 'missing supplementary file: ' + link);
}
console.log(JSON.stringify({ slides: slides.length, supplementaryLinks: links.length, javascriptSyntax: 'valid', externalAssets: 0,
  boundary: 'Static checks only; does not replace browser interaction, responsive or print QA.' }, null, 2));
