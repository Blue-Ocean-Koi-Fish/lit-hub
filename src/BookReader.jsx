import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'html-react-parser';
// import sampleText from './book-sample';
// const textURL = "https://www.gutenberg.org/files/1342/1342-0.txt";

function BookReader({ book }) {
  const [bookText, setBookText] = useState();
  const [bookInfo, setBookInfo] = useState();
  // const [bookAuthor, setBookAuthor] = useState();
  // const [contents, setContents] = useState();
  // const [chapters, setChapters] = useState();

  useEffect(() => {
    const rawDiv = ReactHtmlParser(book).props.children[1].props.children;
    // console.log(rawDiv);
    const gutenbergInfo = [];
    const contents = [];
    const bookTitle = [];
    const bookAuthor = [];
    const chapters = [];

    rawDiv.map((node) => {
      if (node !== '\n' && node.type !== 'hr') {
        if (node.type === 'table') {
          console.log(node.props.children.props.children)
          contents.push(node.props.children.props.children);
        } else if (node.type === 'h1') {
          bookTitle.push(node);
        } else if (node.type === 'h2') {
          bookAuthor.push(node);
        } else if (node.props && node.props.className === 'chapter') {
          chapters.push(node);
        } else {
          gutenbergInfo.push(node);
        }
      }
    });


    const info = { title: bookTitle, author: bookAuthor };
    const text = { content: contents, chapter: chapters};
    // console.log(divs);
    setBookText(text);
    setBookInfo(info);
  }, [book]);

  return (
    <div>
      <div className="book-info">
        {bookInfo ? bookInfo.title : null}
        {bookInfo ? bookInfo.author : null}
      </div>
      <div className="book-text">
        <div className="book-contents">
          {bookText ? bookText.content.map((content) => { return <table>{content}</table> }) : null}
        </div>
        {/* <div className="book-contents">
          {bookText ? bookText.chapter : null}
        </div> */}
      </div>
    </div>
  );
}

export default BookReader;
