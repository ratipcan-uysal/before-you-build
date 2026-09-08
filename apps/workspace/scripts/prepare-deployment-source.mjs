import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';

const app = fileURLToPath(new URL('../', import.meta.url));
const repo = fileURLToPath(new URL('../../../', import.meta.url));
const target = process.argv[2] && path.resolve(process.argv[2]);
if (
  !target ||
  target === app ||
  target === repo ||
  (existsSync(target) && readdirSync(target).length)
)
  throw new Error('Provide an empty, separate staging directory.');
mkdirSync(target, { recursive: true });
const excluded = new Set([
  'node_modules',
  'dist',
  '.wrangler',
  'generated',
  '.git',
  '.agents',
  '.codex',
  'canonical-skills',
]);
cpSync(app, target, {
  recursive: true,
  filter: (source) => {
    const name = path.basename(source);
    return (
      !excluded.has(name) &&
      !name.startsWith('.env') &&
      !name.endsWith('.tsbuildinfo') &&
      !name.endsWith('.log')
    );
  },
});
cpSync(path.join(repo, 'skills'), path.join(target, 'canonical-skills'), {
  recursive: true,
});
cpSync(path.join(repo, 'LICENSE'), path.join(target, 'LICENSE'));
function hashTree(dir) {
  const files = {};
  function walk(base) {
    for (const entry of readdirSync(base, { withFileTypes: true }).sort(
      (a, b) => a.name.localeCompare(b.name),
    )) {
      const full = path.join(base, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile())
        files[path.relative(dir, full)] = createHash('sha256')
          .update(readFileSync(full))
          .digest('hex');
      else throw new Error('Unexpected non-file canonical source');
    }
  }
  walk(dir);
  return files;
}
writeFileSync(
  path.join(target, 'canonical-provenance.json'),
  JSON.stringify(
    {
      source: 'before-you-build/skills',
      files: hashTree(path.join(repo, 'skills')),
    },
    null,
    2,
  ) + '\n',
);
console.log(
  'Prepared deployment-only source. Main repository and private material were not copied.',
);
