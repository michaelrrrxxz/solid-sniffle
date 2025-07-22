import jsonfile from 'jsonfile';
import simpleGit from 'simple-git';
import { faker } from '@faker-js/faker';

const git = simpleGit();
const path = './data.json';

// Generate 70–90 random dates in 2024
const commitCount = Math.floor(Math.random() * (90 - 70 + 1)) + 70;
const dates = [];

while (dates.length < commitCount) {
  const month = Math.floor(Math.random() * 12); // 0–11
  const day = Math.floor(Math.random() * 28) + 1;
  const hour = Math.floor(Math.random() * (23 - 9 + 1)) + 9;
  const minute = Math.floor(Math.random() * 60);

  const date = new Date(Date.UTC(2024, month, day, hour, minute));
  dates.push(date.toISOString());
}

// Realistic commit messages
const commitMessages = [
  'fix: resolve bug in user auth flow',
  'feat: add dark mode toggle',
  'chore: update dependencies',
  'refactor: simplify navbar logic',
  'docs: update README.md',
  'style: format CSS variables',
  'feat: add project filtering',
  'fix: responsive layout issue on mobile',
  'perf: optimize image loading',
  'test: add unit tests for utils',
  'feat: implement lazy loading',
  'chore: clean up unused assets',
  'fix: typo in env config',
  'refactor: move helper functions',
  'style: improve code formatting',
];

async function run() {
  for (const date of dates) {
    const data = { date };
    const message = faker.helpers.arrayElement(commitMessages);

    try {
      await jsonfile.writeFile(path, data);
      await git.add([path]);
      await git.commit(message, undefined, { '--date': date });
    } catch (err) {
      console.error('Commit error:', err);
    }
  }

  try {
    await git.push();
    console.log(`✅ Successfully pushed ${commitCount} commits.`);
  } catch (err) {
    console.error('Push error:', err);
  }
}

run();
