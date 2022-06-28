const { booksDb } = require('./localStorage');

const addBook = (bookName, bookStr) => {
  booksDb.books.add({
    name: bookName,
    text: bookStr,
  });
};

const getCurrentBook = async (bookName) => {
  const book = await booksDb.books.where("name").equalsIgnoreCase('Some Book').toArray();
    // Query by "foreign key" on vehicles:
    // const austinsVehicles = await db.vehicles.where({owner: austin.id}).toArray();
    // Include the vehicles in the result:
    // austin.vehicles = austinsVehicles;
  return book[0];
};

module.exports = {
  addBook,
  getCurrentBook,
};
