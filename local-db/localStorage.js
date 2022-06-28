const { Dexie } = require('dexie');

const booksDb = new Dexie('booksDatabase');
booksDb.version(1).stores({
  books: '++id, name, text',
});

module.exports = {
  booksDb,
};
