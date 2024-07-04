import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import { useDispatch } from "react-redux";
import { addVocabulary } from "../../redux/vocabularySlice";

const SearchResults = ({ data, onSearchResults }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query");
    if (query && query.trim() !== "") {
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
      const results = fuse.search(query).map((result) => result.item);
      onSearchResults(results);
    } else {
      onSearchResults([]);
    }
  }, [location.search, data, onSearchResults]);

  const handleAddVocabulary = (vocab, scriptType, translationKey) => {
    const newVocabulary = {
      ...vocab,
      translation: { [translationKey]: vocab.translation[translationKey] },
    };
    dispatch(addVocabulary({ newVocabulary, scriptType }));
  };

  const renderResults = (results, language) => {
    return (
      <div className="Main">
        <h2>
          {language.charAt(0).toUpperCase() + language.slice(1)} Vocabulary
        </h2>
        {results.length > 0 ? (
          <table className="my-table">
            <tbody>
              <tr>
                <th>Script</th>
                <th>Pronunciation</th>
                <th>Translation</th>
                <th>Action</th>
              </tr>
              {results.map((item, index) => (
                <tr key={index}>
                  <td>{item.japaneseHiragana || item.japaneseKatakana}</td>
                  <td>{item.pronunciation}</td>
                  <td>{item.translation[language]}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleAddVocabulary(
                          item,
                          item.japaneseHiragana ? "hiragana" : "katakana",
                          language
                        )
                      }
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    );
  };

  const query = new URLSearchParams(location.search).get("query");
  const germanResults = data.filter((item) =>
    item.translation.german?.toLowerCase().includes(query?.toLowerCase())
  );
  const englishResults = data.filter((item) =>
    item.translation.english?.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div className="search-results">
      <h2>Search Results:</h2>
      {data.length > 0 ? (
        <>
          {renderResults(germanResults, "german")}
          {renderResults(englishResults, "english")}
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
