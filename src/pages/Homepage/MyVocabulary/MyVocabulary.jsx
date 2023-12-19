import React, { useContext } from 'react';
import { VocabularyContext } from '../../../components/VocabularyProvider';

const MyVocabulary = () => {
  const { vocabularyList, removeVocabulary } = useContext(VocabularyContext);

  const handleRemoveVocabulary = (id) => {
    removeVocabulary(id);
  };

  return (
    <div>
      <h2>My Vocabularies</h2>
      {vocabularyList.length > 0 ? (
        <div>
          <p>Selected Vocabularies:</p>
          <ul>
            {vocabularyList.map((vocab) => (
              <li key={vocab.id}>
                {vocab.character} - {vocab.pronunciation} - {vocab.translation}
                <button onClick={() => handleRemoveVocabulary(vocab.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No Vocabularies selected yet.</p>
      )}
    </div>
  );
};

export default MyVocabulary;