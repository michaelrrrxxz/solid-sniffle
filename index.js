import jsonfile from 'jsonfile';
import simpleGit from 'simple-git';
import { faker } from '@faker-js/faker';

const git = simpleGit();
const file = './data.json';

// make 70-90 commits in 2024
const numCommits = Math.floor(Math.random() * 21) + 70;
const commitDates = [];

while (commitDates.length < numCommits) {
  const month = Math.floor(Math.random() * 12); // Jan–Dec
  const day = Math.floor(Math.random() * 28) + 1;
  const hour = Math.floor(Math.random() * (18 - 9 + 1)) + 9; // 9AM–6PM
  const minute = Math.floor(Math.random() * 60);

  const date = new Date(Date.UTC(2024, month, day, hour, minute));
  commitDates.push(date.toISOString());
}

// more chill messages like a student might use
const messages = [
  'update stuff',
  'fix small bug',
  'add some features',
  'testing things out',
  'forgot to push earlier',
  'cleaned up code',
  'added comments',
  'trying to fix layout',
  'minor changes',
  'pushing to save work',
  'css tweaks',
  'save progress',
  'changed file structure a bit',
  'fixed error',
  'learning git lol',
];

async function doFakeCommits() {
  for (const date of commitDates) {
    const data = { date };

    try {
      await jsonfile.writeFile(file, data); // just to change something
      const msg = faker.helpers.arrayElement(messages);
      await git.add([file]);
      await git.commit(msg, undefined, { '--date': date });
    } catch (err) {
      console.log('❌ Error committing:', err);
    }
  }

  try {
    await git.push();
    console.log(`✅ Pushed ${numCommits} fake commits to GitHub`);
  } catch (err) {
    console.log('❌ Push failed:', err);
  }
}

doFakeCommits();
