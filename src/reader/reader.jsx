/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'html-react-parser';

function Reader({ book }) {
  // console.log(book);

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

  const getChapter = (node) => {
    // Check node type.
    if (Array.isArray(node)) {
      // Search through node array.
      for (let i = 0; i < node.length; i += 1) {
        // Find child anchor
        const child = node[i].props.children;
        if (child !== null && child.type === 'a') {
          return child;
        }
      }
    } else {
      // Otherwise, node is an object.
      // Find child anchor.
      const child = node.props.children;
      if (child !== null && child.type === 'a') {
        return child;
      }
    }
    return null;
  };

  useEffect(() => {
    if (book) {
      const rawDiv = ReactHtmlParser(book);
      // console.log(rawDiv.props)
      let rawContent;
      try {
        rawContent = rawDiv.props.children;
        console.log(rawContent);
      } catch {
        console.log('parsing error');
      }

      const newBook = {
        title: [],
        author: [],
        chapters: [],
        text: [],
      };

      rawContent.forEach((node) => {
        // First filter carriage returns and breaks,
        if (typeof node !== 'string') {
          // Get all the chapters
          if (node.type === 'table' && node.props.className !== 'c7') {
            const tempNode = node.props.children.props.children;
            console.log(node.props.children.props.children.props.children);

            // tempNode.forEach((chapter) => {
            //   const chapterNode = getChapter(chapter.props.children);
            //   if (chapterNode) {
            //     newBook.chapters.push(chapterNode);
            //   }
            // });

          } else if (node.type === 'p' || node.type === 'h1' || node.type === 'h2' || node.type === 'h3') {
            // check if node is author or title also
            // console.log(node);
            if (node.props.children !== 'Contents') {
              newBook.text.push(node);
            }
          }
          // else {
          //   console.log(node.props.className);
          // }
        }
      });

      setBookContent(newBook);
      setFontSize((size) => Number(size));
  }
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
    console.log(event.target.value);
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
        <select onChange={updateChapter}>
          {bookContent.chapters
            ? bookContent.chapters.map((chapter, i) => {
              // console.log(chapter);
              const anchorLink = chapter.props.href;
              const optionContent = chapter.props.children;
              return <option key={i} value={anchorLink}>{optionContent}</option>;
            })
            : null}
        </select>
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
