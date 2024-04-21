import React, { useContext } from "react";
import { VocabularyContext } from "../../../components/VocabularyProvider";

const MyVocabulary = () => {
  const { vocabularyList, removeVocabulary } = useContext(VocabularyContext);

  const handleRemoveVocabulary = (id) => {
    removeVocabulary(id);
  };

  const renderAlphabetVocabulary = () => {
    const alphabetVocabularies = vocabularyList.filter(
      (vocab) => vocab.character && vocab.pronunciation && vocab.translation
    );

    return (
      <div className="Main">
        <h2>Alphabet Vocabularies</h2>
        {alphabetVocabularies.length > 0 ? (
          <div>
            <table className="my-table">
              <tbody>
                <tr>
                  <th>Hiragana</th>
                  <th>Pronounciation</th>
                  <th>Translation</th>
                </tr>
                {alphabetVocabularies.map((vocab) => (
                  <tr key={vocab.id} className="list-items-container">
                    <td>{vocab.character}</td>
                    <td>{vocab.pronunciation}</td>
                    <td>{vocab.translation}</td>
                      <button className="remove-button" onClick={() => handleRemoveVocabulary(vocab.id)}>
                        X
                      </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Alphabet Vocabularies selected yet.</p>
        )}
      </div>
    );
  };

  const renderGermanVocabulary = () => {
    const germanVocabularies = vocabularyList.filter(
      (vocab) =>
        vocab.japanese && vocab.pronunciation && vocab.translation.german
    );

    return (
      <div className="Main">
        <h2>German Vocabularies</h2>
        {germanVocabularies.length > 0 ? (
          <div>
            <table className="my-table">
              <tbody>
                <tr>
                  <th>Hiragana</th>
                  <th>Pronounciation</th>
                  <th>German</th>
                </tr>
                {germanVocabularies.map((vocab) => (
                  <tr key={vocab.id} className="list-items-container">
                    <td>{vocab.japanese}</td>
                    <td>{vocab.pronunciation}</td>
                    <td>{vocab.translation.german}</td>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveVocabulary(vocab.id)}
                    >
                      X
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No German Vocabularies selected yet.</p>
        )}
      </div>
    );
  };
  const renderEnglishVocabulary = () => {
    const englishVocabularies = vocabularyList.filter(
      (vocab) =>
        vocab.japanese && vocab.pronunciation && vocab.translation.english
    );

    return (
      <div className="Main">
        <h2>English Vocabularies</h2>
        {englishVocabularies.length > 0 ? (
            <table className="my-table">
              <tbody>
                <tr>
                  <th>Hiragana</th>
                  <th>Pronounciation</th>
                  <th>English</th>
                </tr>
                {englishVocabularies.map((vocab) => (
                  <tr key={vocab.id} className="list-items-container">
                    <td>{vocab.japanese}</td>
                    <td>{vocab.pronunciation}</td>
                    <td>{vocab.translation.english}</td>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveVocabulary(vocab.id)}
                      >
                        X
                      </button>
                  </tr>
                ))}
              </tbody>
            </table>
        ) : (
          <p>No English Vocabularies selected yet.</p>
        )}
      </div>
    );
  };

  return (
    <div>
      {renderAlphabetVocabulary()}
      {renderGermanVocabulary()}
      {renderEnglishVocabulary()}
    </div>
  );
};

export default MyVocabulary;
