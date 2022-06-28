import React, { useState, useEffect } from "react";
import SearchBooks from "./search.jsx";
import SearchDisplay from "./searchdisplay.jsx";

const SearchSection = function SearchSection() {
  const [bookList, setBookList] = useState();
  const [count, setCount] = useState(0);
  return (
    <>
      <SearchBooks setBookList={setBookList} setCount={setCount} />
      <SearchDisplay bookList={bookList} count={count} />
    </>
  );
};

export default SearchSection;
