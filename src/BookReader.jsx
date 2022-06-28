import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'html-react-parser';

import './bookReader.css';

function BookReader({ book }) {
  const bookSchema = {
    title: [],
    author: [],
    chapters: [],
    text: [],
  };

  const [bookContent, setBookContent] = useState(bookSchema);

  useEffect(() => {
    console.log(bookContent);

    const rawDiv = ReactHtmlParser(book).props.children[1].props.children;
    const gutenbergInfo = [];
    let newBook = {
      title: [],
      author: [],
      chapters: [],
      text: [],
    };

    rawDiv.forEach((node) => {
      // First filter carriage returns and breaks,
      if (node !== '\n' && node.type !== 'hr') {
        // the chapters are in the table tag,
        if (node.type === 'table') {
          console.log('table', node);
          newBook.chapters.push(node);
        }
        // else if (node.type === 'h1') {
        //   // the title is h1 tag,
        //   newBook.bookTitle.push(node);
        // } else if (node.type === 'h2') {
        //   // the author is the h2 tag,
        //   newBook.bookAuthor.push(node);
        // } else if (node.props && node.props.className === 'chapter') {
        //   // and thhe text is split up into divs with the chapter class name.
        //   newBook.text.push(node);
        // }
      }
    });

    setBookContent(newBook);
  }, [book]);

  return (
    <div className="e-reader-div">
      <div className="book-chapters">
        {bookContent.chapters ? bookContent.chapters : null}
      </div>
      <div className="book-content">
        {bookContent.text ? bookContent.text : null}
      </div>
    </div>
  );
}

export default BookReader;
