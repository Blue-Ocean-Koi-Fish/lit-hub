/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable quotes */
import Dexie from "dexie";

// Creates a new indexedDb database
const booksDb = new Dexie('booksDatabase');
booksDb.version(1).stores({
  books: '++id, name, text, meta, book_id',
});

const addBook = (bookName, bookStr, metaObj, bookId) => {
  console.log(metaObj);
  booksDb.books.add({
    name: bookName,
    text: bookStr,
    meta: metaObj,
    book_id: bookId,
  });
};

const getCurrentBook = async (bookId) => {
  const book = await booksDb.books.where("book_id") // THIS REQUIRES DOUBLE QUOTES
    .equals(bookId)
    .toArray(); // you have to use toArray or find another dexie method do not leave it off
  return book[0];
};

const getAllBooks = () => {
  const collection = booksDb.books.toArray();
  return collection;
};

// remove book
const removeBook = (bookId) => {
  booksDb.books.delete(bookId);
};

const clearTable = () => (
  booksDb.books.clear()
);

export {
  addBook, getCurrentBook, removeBook, getAllBooks, booksDb, clearTable,
};
