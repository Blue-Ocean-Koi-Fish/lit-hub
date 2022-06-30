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
    let searchTerm = '';
    if (author.length && title.length) {
      const authorWords = author.split(' ');
      const titleWords = title.split(' ');
      const searchTermArr = authorWords.concat(titleWords);
      searchTerm = searchTermArr.join('%20');
    } else if (author.length) {
      searchTerm = author.replaceAll(' ', '%20');
    } else {
      searchTerm = title.replaceAll(' ', '%20');
    }

    axios
      .get('/search', {
        params: {
          search: searchTerm,
          topic,
          language,
        },
      })
      .then((res) => {
        console.log(res);
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
        if ([author, title, topic].some((a) => a.length)) {
          submitSearch();
        }
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
