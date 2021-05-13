/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.js.
 */

// Set up data structures
const streams = {
  home: [],
  users: {
    shawndrost: [],
    sharksforcheap: [],
    mracus: [],
    douglascalhoun: [],
  },
};
const users = Object.keys(streams.users);

// Utility function for adding tweets to our data structures
const addHoot = (newHoot) => {
  const username = newHoot.user;
  streams.users[username].push(newHoot);
  streams.home.push(newHoot);
};

// Utility function
const randomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Random tweet generator
const opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
const verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
const objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
const nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
const tags = ['#techlife', '#burningman', '#sf', '#butonlyiknowhow', '#forreal', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

const randomMessage = () => {
  return [
    randomElement(opening),
    randomElement(verbs),
    randomElement(objects),
    randomElement(nouns),
    randomElement(tags),
  ].join(' ');
};

// Generate random tweets on a random schedule
const generateRandomHoot = () => {
  const hoot = {
    user: randomElement(users),
    message: randomMessage(),
    created_at: new Date(),
  };
  addHoot(hoot);
};

for (let i = 0; i < 10; i++) {
  generateRandomHoot();
}

const scheduleNextHoot = () => {
  generateRandomHoot();
  setTimeout(scheduleNextHoot, Math.random() * 1500);
};
scheduleNextHoot();

// Utility function for letting students add "write a tweet" functionality
// (NOTE: Not used by the rest of this file.)
const writeHoot = (message) => {
  const visitor = window.visitor;

  if (!visitor){
    throw new Error('Set the global visitor property!');
  }

  const hoot = {
    user: visitor,
    message: message,
  };
  addHoot(hoot);
};
