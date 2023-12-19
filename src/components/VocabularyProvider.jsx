import React, { createContext, useState } from 'react';

export const VocabularyContext = createContext();

export const VocabularyProvider = ({ children }) => {
  const [vocabularyList, setVocabularyList] = useState([]);

  const addVocabulary = (newVocabulary) => {
    newVocabulary.id = Date.now();
    setVocabularyList([...vocabularyList, newVocabulary]);
  };

  const removeVocabulary = (id) => {
    const updatedList = vocabularyList.filter((vocab) => vocab.id !== id);
    setVocabularyList(updatedList);
  };

  return (
    <VocabularyContext.Provider value={{ vocabularyList, addVocabulary, removeVocabulary }}>
      {children}
    </VocabularyContext.Provider>
  );
};