/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'html-react-parser';
import './readerTemp.css';
// import { Speech, pause, cancel} from './speech';

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
  const [currentPage, setCurrentPage] = useState(0);

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
        } else if (node.type === 'h2') {
          // the author is the h2 tag,
          newBook.author.push(node);
        } else if (node.type === 'table') {
          // the chapters are in the table tag,
          console.log('table', node);
          console.log('here', node);
          // node.props.children.props.children.forEach((child) => {
          //   newBook.chapters.push(child.props.children.props.children);
          // });
          console.log(newBook.chapters);
        } else if (node.props && node.props.className === 'chapter') {
          // and thhe text is split up into divs with the chapter class name.
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
    const { value } = event.target;
    console.log(value);
    setFont(value);
  };

  const pageForward = () => {
    const contentDiv = document.getElementById('content');
    contentDiv.scrollTop = currentPage + 250;
    console.log(contentDiv.scrollTop);
    setCurrentPage((page) => page + 250);
  };

  const pageBackward = () => {
    const contentDiv = document.getElementById('content');
    if (contentDiv.scrollTop !== 0) {
      contentDiv.scrollTop = currentPage - 500;
    }
    if (contentDiv.scrollTop <= 0) {
      contentDiv.scrollTop = 0;
    }
    console.log(contentDiv.scrollTop);
    setCurrentPage((page) => page - 500);
  };

  const updateChapter = (event) => {
    const { value } = event.target;
    const chapterDiv = document.getElementById(value.slice(1));

    const contentDiv = document.getElementById('content');

    console.log(value.slice(1), chapterDiv.scrollTop, contentDiv.scrollTop);
    chapterDiv.scrollIntoView();
    setCurrentPage(contentDiv.scrollTop);
  };

  // Expanded view
  const toggleExpandView = (event) => {
    event.preventDefault();
    const eReader = document.querySelector('.e-reader-section');
    if (eReader?.classList?.contains('expanded')) {
      eReader?.classList?.remove('expanded');
      console.log('here');
    } else {
      eReader?.classList?.add('expanded');
    }
  };

  return (
    <section className="e-reader-section">
      <div className="book-controls">
        <select onChange={updateFont}>
          {['Baskerville', 'Bookerly', 'Georgia', 'Helvetica', 'Futura', 'Arial', 'Courier', 'Times'].map((fontOption, i) => (
            <option value={fontOption.toLowerCase()} key={i}>{fontOption}</option>))}
        </select>
        {/* <button className="expand"></button> */}
        {/* <select onChange={updateChapter}>
          {bookContent.chapters
            ? bookContent.chapters.map((chapter, i) => (
              <option key={i} value={chapter.props.href}>{chapter.props.children}</option>))
            : null}
        </select> */}
        <button id="font-size-plus" className="btn" type="button" onClick={decreaseFont}>
          <i className="fa-solid fa-minus" />
        </button>
        <button id="font-size-minus" className="btn" type="button" onClick={increaseFont}>
          <i className="fa-solid fa-plus" />
        </button>
        <button className="btn" id="expand-view" type="button" onClick={toggleExpandView}>
          <i className="fa-solid fa-expand" />
        </button>
      </div>
      <div className="read-body-wrap">
        <div className="content-wrap">
          <button id="page-prev-btn" className="nav-btn" type="button" onClick={pageBackward}>{'<'}</button>
          <div
            id="content"
            style={{
              fontSize: `${fontSize}px`,
              fontFamily: `${font}`,
            }}
          >
            {bookContent.text}
          </div>
          <button id="page-next-btn" className="nav-btn" type="button" onClick={pageForward}>{'>'}</button>
        </div>
      </div>
    </section>
  );
}

export default Reader;
