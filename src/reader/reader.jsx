/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'html-react-parser';
// import { startText } from './speech';

function Reader({ book }) {
  const [font, setFont] = useState('Times');
  const [fontSize, setFontSize] = useState(24);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookContent, setBookContent] = useState([]);

  // Component Did Mount
  // useEffect(() => {
  //   // const contentDiv = document.getElementById('content');
  //   // const linePosition = document.querySelector(`[data-line="207"]`);
  //   // console.log(linePosition);
  //   // console.log(document.querySelector('#content'));
  //   // contentDiv.scrollTop = 7000;
  //   // setCurrentPage(7000);
  // }, []);

  const getContent = (node) => {
    if (typeof node.props.children !== 'string') {
      if (node.props.className) {
        console.log(node.props.className);
      }
      if (Array.isArray(node.props.children)) {
        // console.log(node.props.children);
        const nodesFound = [];
        for (let i = 0; i < node.props.children.length; i += 1) {
          if (typeof node.props.children[i] !== 'string') {
            console.log('F', node.props.children[i]);
            nodesFound.push(node.props.children[i]);
          }
        }
        return nodesFound;
      }
    }
  };

  // // Get a new book HTML string and run it through a parser to get it's contents.
  // // NOTE: NOT EVERY BOOK IS FORMATTED THE SAME!!!
  useEffect(() => {
    // If there is a new book,
    // console.log('UE NEW BOOK', book);
    const newBookContent = [];

    if (book.length > 0) {
      const rawDiv = ReactHtmlParser(book);
      // Do a first pass to get the body's children.
      let rawContent;
      try {
        rawContent = rawDiv.props.children;
      } catch {
        console.log('parsing error');
      }

      rawContent.forEach((node) => {
        if (typeof node !== 'string') {
          if (node.type === 'div') {
            const newNode = getContent(node);
            if (newNode) {
              newBookContent.push(newNode);
            }
          } else if (node.type !== 'blockquote' && node.type !== 'hr') {
            newBookContent.push(node);
          }
        }
      });
      console.log(newBookContent);
    }

    // Update states
    // setFontSize((size) => Number(size));
    setBookContent(newBookContent);
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
    if (event.target?.classList?.contains('nav-btn')) {
      return;
    }
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
        {/* <button type="button" onClick={startText} id="tts">Start Reading</button> */}
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
            {/* {bookContent.map((node) => {
              const uniqueNode = assignLineIndex(node);
              return uniqueNode;
            })} */}
            {bookContent}
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
  // return (<div>test</div>);
}

export default Reader;
