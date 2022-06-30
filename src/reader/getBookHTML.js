const axios = require('axios');
// const fs = require('fs');

const getHTML = (bookId) => {
  const url = `http://localhost:8081/txt?url=https://www.gutenberg.org/ebooks/${bookId}.html.images`;
  return axios.get(url)
    .then((data) => {
      console.log(typeof data.data);
      const parsedData = data.data.slice(data.data.indexOf('<body>'), data.data.indexOf('</body>') + 7);
      return parsedData;
    })
    .catch((err) => (console.log(err)));
};

export default getHTML;
