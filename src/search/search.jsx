// search by, title, author, topic, license
import React, { useState } from "react";
import axios from "axios";
import langList from "./resources";

const SearchBooks = function SearchBooks({
  setBookList,
  setCount,
  setSearchTerms,
  setShowSearchResults,
}) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("en");

  const submitSearch = function submitSearch() {
    let authorWords = author.split(" ");
    let titleWords = title.split(" ");
    let searchTermArr = authorWords.concat(titleWords);
    let searchTerm = "";
    for (let i = 0; i < searchTermArr.length; i++) {
      searchTerm += searchTermArr[i] + "%20";
    }
    axios
      .get(
        `http://localhost/search=${searchTerm}&topic=${topic}&languages=${language}`,
      )
      .then((res) => {
        setSearchTerms({
          author: author,
          title: title,
          topic: topic,
          language: language,
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
