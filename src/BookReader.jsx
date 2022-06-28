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

    // Parse the raw HTML string
    const rawDiv = ReactHtmlParser(book).props.children[1].props.children;

    const newBook = {
      title: [],
      author: [],
      chapters: [],
      text: [],
    };

    rawDiv.forEach((node) => {
      // First filter carriage returns and breaks,
      if (node !== '\n' && node.type !== 'hr') {
        // then the title is the h1 tag,
        if (node.type === 'h1') {
          newBook.title.push(node);
        }
        // the author is the h2 tag,
        else if (node.type === 'h2') {
          newBook.author.push(node);
        }
        // the chapters are in the table tag,
        else if (node.type === 'table') {
          console.log('table', node);
          newBook.chapters.push(node);
        }
        // and thhe text is split up into divs with the chapter class name.
        else if (node.props && node.props.className === 'chapter') {
          newBook.text.push(node);
        }
      }
    });

    setBookContent(newBook);
  }, [book]);

  return (
    <div className="e-reader-section">
      <div>
        <button className="decrease-font">-</button>
        <button className="increase-font">+</button>
      </div>
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
