// search by, title, author, topic, license
import React, { useState } from 'react';
import axios from 'axios';
import langList from './resources';

const SearchBooks = function SearchBooks({
  setBookList,
  setCount,
  setSearchTerms,
  setShowSearchResults,
}) {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('en');

  const submitSearch = function submitSearch() {
    const authorWords = author.split(' ');
    const titleWords = title.split(' ');
    const searchTermArr = authorWords.concat(titleWords);
    const searchTerm = searchTermArr.join('%20');

    console.log(
      `http://gutendex.com/books?search=${searchTerm}&topic=${topic}&languages=${language}`,
    );
    axios
      .get(
        `http://gutendex.com/books?search=${searchTerm}&topic=${topic}&languages=${language}`,
      )
      .then((res) => {
        setSearchTerms({
          author,
          title,
          topic,
          language,
        });
        setBookList(res.data.results);
        setCount(res.data.count);
        setShowSearchResults(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      className="search-form"
      onSubmit={(event) => {
        event.preventDefault();
        submitSearch();
      }}
    >
      <label>Author</label>
      <input
        id="author"
        type="text"
        onChange={(e) => {
          e.preventDefault();
          setAuthor(e.target.value);
        }}
      />
      <label>Title</label>
      <input
        id="title"
        type="text"
        onChange={(e) => {
          e.preventDefault();
          setTitle(e.target.value);
        }}
      />
      <label>Topic</label>
      <input
        id="topic"
        type="text"
        onChange={(e) => {
          e.preventDefault();
          setTopic(e.target.value);
        }}
      />
      <label>Select Language</label>
      <select
        name="Language"
        id="language"
        onChange={(e) => {
          e.preventDefault();
          setLanguage(e.target.value);
        }}
      >
        {langList.map((val) => (
          <option key={val.name} value={val.code}>
            {val.name}
          </option>
        ))}
      </select>
      <input type="submit" value="Search" id="search-submit" />
    </form>
  );
};

export default SearchBooks;
