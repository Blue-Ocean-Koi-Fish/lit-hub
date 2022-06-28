import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'html-react-parser';
import './readerTemp.css';

function Reader({ book }) {
  const bookSchema = {
    title: [],
    author: [],
    chapters: [],
    text: [],
  };

  const [font, setFont] = useState('Times');
  const [fontSize, setFontSize] = useState(24);
  const [bookContent, setBookContent] = useState(bookSchema);
  const [page, setPage] = useState(0);

  useEffect(() => {
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
    // setFontSize((size) => Number(size)); //?
  }, [book]);

  const increaseFont = (event) => {
    setFontSize((size) => size + 4);
  };

  const decreaseFont = (event) => {
    setFontSize((size) => size - 4);
  };

  const updateFont = (event) => {
    const value = event.target.value;
    console.log(value);
    setFont(value);
  };

  const pageForward = () => {
    const contentDiv = document.getElementById('content');
    contentDiv.scrollTop = page + 250;
    setPage((page) => page + 250);
  };

  const pageBackward = () => {
    const contentDiv = document.getElementById('content');
    if (contentDiv.scrollTop !== 0) {
      contentDiv.scrollTop = page - 100;
    } else if (contentDiv.scrollTop <= 0) {
      contentDiv.scrollTop = 0;
    }
    console.log(contentDiv.scrollTop);
    setPage((page) => page + 100);
  };

  return (
    <section className="e-reader-section">
      <div className="book-controls">
        <select onChange={updateFont}>
          <option value="monospace">Monospace</option>
          <option value="Arial">Arial</option>
          <option value="Times">Times New Roman</option>
        </select>
        <button id="font-size-plus" type="button" onClick={decreaseFont}>FONT -</button>
        <button id="font-size-minus" type="button" onClick={increaseFont}>FONT +</button>
      </div>
      <div className="frame">
        <div className="read-body-wrap">
          <div className="content-wrap">
            <button id="page-prev-btn" type="button" onClick={pageBackward}>PREV</button>
            <div
              id="content"
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: `${font}`,
              }}
            >
              {bookContent.text}
            </div>
            <button id="page-next-btn" type="button" onClick={pageForward}>NEXT</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reader;
