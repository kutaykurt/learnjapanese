import React, { createContext, useEffect, useState } from 'react';

export const VocabularyContext = createContext();

export const VocabularyProvider = ({ children }) => {
  const [vocabularyList, setVocabularyList] = useState([]);
  const [selectedVocabularies, setSelectedVocabularies] = useState([]);

  useEffect(() => {
    const storedVocabularies = localStorage.getItem('selectedVocabularies');
    if (storedVocabularies) {
      setSelectedVocabularies(JSON.parse(storedVocabularies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'selectedVocabularies',
      JSON.stringify(selectedVocabularies)
    );
  }, [selectedVocabularies]);

  const addVocabulary = (newVocabulary) => {
    const isVocabularyExists = vocabularyList.some(
      (vocab) =>
        vocab.character === newVocabulary.character &&
        vocab.pronunciation === newVocabulary.pronunciation &&
        vocab.translation === newVocabulary.translation
    );

    if (!isVocabularyExists) {
      newVocabulary.id = Date.now();
      setVocabularyList([...vocabularyList, newVocabulary]);
      setSelectedVocabularies([...selectedVocabularies, newVocabulary]);
    } else {
      alert("Vocabulary already exists!");
    }
  };

  const removeVocabulary = (id) => {
    const updatedList = vocabularyList.filter((vocab) => vocab.id !== id);
    setVocabularyList(updatedList);

    const updatedSelectedVocabularies = selectedVocabularies.filter(
      (vocab) => vocab.id !== id
    );
    setSelectedVocabularies(updatedSelectedVocabularies);
  };

  const isVocabularySelected = (item) => {
    return selectedVocabularies.some(
      (vocab) =>
        vocab.character === item.character &&
        vocab.pronunciation === item.pronunciation &&
        vocab.translation === item.translation
    );
  };

  return (
    <VocabularyContext.Provider
      value={{
        vocabularyList,
        addVocabulary,
        removeVocabulary,
        isVocabularySelected,
        selectedVocabularies,
      }}
    >
      {children}
    </VocabularyContext.Provider>
  );
};