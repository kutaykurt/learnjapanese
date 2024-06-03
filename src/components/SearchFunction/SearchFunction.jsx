import React from "react";
import Fuse from "fuse.js";

const SearchFunction = ({ data, onSearchResults, query, setQuery }) => {
  // Props angepasst
  const handleSearch = (e) => {
    const { value } = e.target;
    setQuery(value);

    if (value.trim() !== "") {
      const fuse = new Fuse(data, {
        keys: [
          "japaneseHiragana",
          "japaneseKatakana",
          "pronunciation",
          "translation.english",
          "translation.german",
        ],
        threshold: 0.3,
      });
      const results = fuse.search(value).map((result) => result.item);
      onSearchResults(results);
    } else {
      onSearchResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search vocabularies..."
        value={query}
        onChange={handleSearch}
        className="search-input-field"
      />
    </div>
  );
};

export default SearchFunction;
