import {
  readFileSync,
  readdirSync,
  mkdirSync,
  writeFileSync,
  existsSync,
} from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const app = fileURLToPath(new URL('../', import.meta.url));
// A deployment-only checkout carries the identical canonical sources alongside the app.
const dir = existsSync(path.join(root, 'skills/readiness-score/SKILL.md'))
  ? path.join(root, 'skills')
  : path.join(app, 'canonical-skills');
const skills = {};
for (const name of readdirSync(dir)) {
  const main = readFileSync(path.join(dir, name, 'SKILL.md'), 'utf8');
  const references = {};
  for (const file of readdirSync(path.join(dir, name, 'references'))) {
    if (file.endsWith('.md'))
      references[file] = readFileSync(
        path.join(dir, name, 'references', file),
        'utf8',
      );
  }
  skills[name] = { main, references };
}
const rubricText = skills['readiness-score'].references['rubric.md'];
let category = 0,
  axis = 'spine';
const rubric = [];
for (const line of rubricText.split('\n')) {
  const group = /^### K(\d)/.exec(line);
  if (group) category = Number(group[1]);
  const condition = /^### \x60([^\x60]+)\x60/.exec(line);
  if (condition) axis = condition[1];
  const item = /^- \*\*([A-Z]\d+) ?(⚑)?\*\* (.+)/.exec(line);
  if (item)
    rubric.push({
      id: item[1],
      blocker: !!item[2],
      category:
        axis === 'spine' ? category : Number(/\*\(K(\d)\)\*/.exec(line)?.[1]),
      axis,
      label: item[3],
    });
}
if (Object.keys(skills).length !== readdirSync(dir).length || rubric.some((r) => !r.category))
  throw new Error('Canonical skill compilation failed');
const output = path.join(app, 'generated');
mkdirSync(output, { recursive: true });
writeFileSync(path.join(output, 'skills.json'), JSON.stringify(skills));
writeFileSync(path.join(output, 'rubric.json'), JSON.stringify(rubric));
console.log(
  'Compiled canonical skills:',
  Object.keys(skills).length,
  'rubric items:',
  rubric.length,
);
