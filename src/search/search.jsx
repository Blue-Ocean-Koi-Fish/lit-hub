// search by, title, author, topic, license
import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import langList from './resources';

const SearchBooks = function SearchBooks({
  setBookList,
  setCount,
  setSearchTerms,
  setShowSearchResults,
}) {
  const { t } = useTranslation();

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

    const collectionSection = document.querySelector('.collection-section-wrap');
    collectionSection?.classList?.add('loading');

    axios
      .get('/search', {
        params: {
          search: searchTerm,
          topic,
          language,
        },
      })
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
      .catch((err) => {
        console.log(err);
      })
      .finally(() => collectionSection.classList.remove('loading'));
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
      <label>{t('search.author')}</label>
      <input
        id="author"
        type="text"
        placeholder={t('search.author')}
        onChange={(e) => {
          e.preventDefault();
          setAuthor(e.target.value);
        }}
      />
      <label>{t('search.title')}</label>
      <input
        id="title"
        type="text"
        placeholder={t('search.title')}
        onChange={(e) => {
          e.preventDefault();
          setTitle(e.target.value);
        }}
      />
      <label>{t('search.topic')}</label>
      <input
        id="topic"
        type="text"
        placeholder={t('search.topic')}
        onChange={(e) => {
          e.preventDefault();
          setTopic(e.target.value);
        }}
      />
      <label>{t('search.language')}</label>
      <select
        name="Language"
        id="language"
        default={t('search.langDefault')}
        onChange={(e) => {
          e.preventDefault();
          setLanguage(e.target.value);
        }}
      >
        <option>{t('search.langDefault')}</option>
        {langList.map((val) => (
          <option key={val.name} value={val.code}>
            {val.name}
          </option>
        ))}
      </select>
      <button type="submit" id="search-submit">
        {t('search.search')}
        <i className="fa-solid fa-magnifying-glass" />
      </button>
    </form>
  );
};

export default SearchBooks;
