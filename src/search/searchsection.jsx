import React, { useState, useEffect } from "react";
import SearchBooks from "./search.jsx";

const SearchSection = function SearchSection({
  setShowSearchResults,
  setSearchTerms,
  searchTerms,
  setCount,
  setBookList,
}) {
  return (
    <SearchBooks
      setBookList={setBookList}
      setCount={setCount}
      setShowSearchResults={setShowSearchResults}
      setSearchTerms={setSearchTerms}
    />
  );
};

export default SearchSection;
