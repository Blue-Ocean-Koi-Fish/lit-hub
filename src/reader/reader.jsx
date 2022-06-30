/* eslint-disable jsx-a11y/no-static-element-interactions */
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
          // console.log('table', node);
          // node.props.children.props.children.forEach((child) => {
          //   newBook.chapters.push(child.props.children.props.children);
          // });
          // console.log(newBook.chapters);
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
    // console.log(value);
    setFont(value);
  };

  const pageForward = () => {
    const contentDiv = document.getElementById('content');
    contentDiv.style.scrollBehavior = 'smooth';
    contentDiv.scrollTop = currentPage + 500;
    setCurrentPage((page) => page + 500);
  };

  const pageBackward = () => {
    const contentDiv = document.getElementById('content');
    contentDiv.style.scrollBehavior = 'smooth';
    if (contentDiv.scrollTop !== 0) {
      contentDiv.scrollTop = currentPage - 500;
    }
    if (contentDiv.scrollTop <= 0) {
      contentDiv.scrollTop = 0;
    }
    setCurrentPage((page) => page - 500);
  };

  const updateChapter = (event) => {
    /* You can assign 'data-' attribute to each chapter element and read it:
     Ex: <p data-id='3'></p>, <h3 data-chapter='Section Zero'></h3>
     -> document.getAttribute('data-chapter'); */

    const { value } = event.target;
    const chapterDiv = document.getElementById(value.slice(1));

    const contentDiv = document.getElementById('content');

    console.log(value.slice(1), chapterDiv.scrollTop, contentDiv.scrollTop);
    chapterDiv.scrollIntoView();
    setCurrentPage(contentDiv.scrollTop);
  };

  // Scrolling behavior of a smartphone
  let pos = { origin: null, clientOrigin: null };

  const grabMouseMove = (event) => {
    const contentDiv = document.getElementById('content');
    const { clientY } = event;
    const { origin, clientOrigin } = pos;

    const dy = clientY - clientOrigin;
    contentDiv.scrollTop = origin - dy * 1.75;
    console.log(contentDiv.scrollTop);
    setCurrentPage(origin - dy * 1.75);
  };

  const grabMouseUp = (event) => {
    // if (event.target?.classList?.contains('.nav-btn')) {
    //   return;
    // }
    const contentDiv = document.getElementById('content');
    contentDiv.style.cursor = 'grab';
    contentDiv.removeEventListener('mousemove', grabMouseMove);
    contentDiv.removeEventListener('mouseup', grabMouseUp);
  };

  const grabMouseDown = (event) => {
    const contentDiv = document.getElementById('content');
    contentDiv.style.scrollBehavior = 'initial';
    contentDiv.style.cursor = 'grabbing';
    // How far the mouse has been moved
    pos = { origin: contentDiv.scrollTop, clientOrigin: event.clientY };
    contentDiv.addEventListener('mousemove', grabMouseMove);
    contentDiv.addEventListener('mouseup', grabMouseUp);
  };

  // Expanded view
  const toggleExpandView = (event) => {
    event.preventDefault();
    const eReader = document.querySelector('.e-reader-section');
    const headers = document.querySelectorAll('.header-moving, .header-static');

    if (eReader?.classList?.contains('expanded')) {
      eReader?.classList?.remove('expanded');
      headers.forEach((header) => {
        // eslint-disable-next-line no-param-reassign
        header.style.display = 'flex';
      });
    } else {
      eReader?.classList?.add('expanded');
      headers.forEach((header) => {
        // eslint-disable-next-line no-param-reassign
        header.style.display = 'none';
      });
    }
  };

  // Dark mode -> TODO: Change to relevant state
  const toggleDarkMode = (event) => {
    event.preventDefault();
    if (document.querySelector('.dark-mode-reader') !== null) {
      document.querySelector('.read-body-wrap')?.classList?.remove('dark-mode-reader');
    } else {
      document.querySelector('.read-body-wrap')?.classList?.add('dark-mode-reader');
    }
  };

  // Used to assign a unique line to each element in the reader body
  // for reader's session progress retention
  let index = -1;
  const assignLineIndex = (node) => {
    index += 1;
    const lastIndex = index;
    let children = [];
    if (typeof node !== 'string') {
      if (Array.isArray(node?.props?.children)) {
        const lastIndexInner = index;
        children = node?.props?.children.map((childNode) => (assignLineIndex(childNode)));
        return React.cloneElement(node, { children, 'data-line': lastIndexInner });
      }
      return React.cloneElement(node, { 'data-line': lastIndex });
    }
    return node;
  };

  return (
    <section className="e-reader-section">

      <div className="book-controls">
        <button id="dark-mode" className="btn" type="button" onClick={toggleDarkMode}>
          <i className="fa-solid fa-moon" />
        </button>
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
        <div className="content-wrap" onMouseDown={grabMouseDown}>
          <div
            id="content"
            style={{
              fontSize: `${fontSize}px`,
              fontFamily: `${font}`,
            }}
          >
            {bookContent.text.map((node) => {
              const uniqueNode = assignLineIndex(node);
              return uniqueNode;
            })}
          </div>
          <div className="page-nav-btns-wrap">
            <button id="page-prev-btn" className="nav-btn" type="button" onClick={pageBackward}>
              <i className="fa-solid fa-angle-up" />
            </button>
            <button id="page-next-btn" className="nav-btn" type="button" onClick={pageForward}>
              <i className="fa-solid fa-angle-down" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reader;
