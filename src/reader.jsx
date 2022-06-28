import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'html-react-parser';

function Reader({ book }) {

  const bookSchema = {
    title: [],
    author: [],
    chapters: [],
    text: [],
  };

  const [font, setFont] = useState('font1');
  const [fontSize, setFontSize] = useState(12);
  const [bookContent, setBookContent] = useState(bookSchema);

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

  const handleMinus = (event) => {
    setFontSize((size) => size - 4);
  };

  const handlePlus = (event) => {
    setFontSize((size) => size + 4);
  };

  return (
    <section className="e-reader-section">
      <div className="book-controls">
        <p>font size and select</p>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <button id="font-size-plus" type="button" onClick={handleMinus}>FONT -</button>
        <button id="font-size-minus" type="button" onClick={handlePlus}>FONT +</button>
      </div>
      <div className="frame">
        <div className="read-body-wrap">
          <div className="content-wrap">
            <button id="page-prev-btn" type="button">PREV</button>
            <div className="content" style={{'fontSize': fontSize + 'px'}}>CONTENT</div>
            <button id="page-next-btn" type="button">NEXT</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reader;
