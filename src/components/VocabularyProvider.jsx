import React, { createContext, useState } from 'react';

export const VocabularyContext = createContext();

export const VocabularyProvider = ({ children }) => {
  const [vocabularyList, setVocabularyList] = useState([]);
  const [selectedVocabularies, setSelectedVocabularies] = useState([]);

  const generateVocabularyId = (vocabulary) => {
    return `${vocabulary.character}-${vocabulary.japanese}-${vocabulary.pronunciation}-${vocabulary.translation.german}-${vocabulary.translation.english}`;
  };

  const addVocabulary = (newVocabulary) => {
    const newVocabularyId = generateVocabularyId(newVocabulary);
    const isVocabularyExists = vocabularyList.some(
      (vocab) => generateVocabularyId(vocab) === newVocabularyId
    );

    if (!isVocabularyExists) {
      const updatedVocabularyList = [
        ...vocabularyList,
        { ...newVocabulary, id: newVocabularyId },
      ];
      setVocabularyList(updatedVocabularyList);
    } else {
      console.log('Vocabulary already exists:', newVocabulary);
      alert('Vocabulary already in your list!');
    }
  };

  const removeVocabulary = (id) => {
    const updatedList = vocabularyList.filter((vocab) => vocab.id !== id);
    setVocabularyList(updatedList);
  };

  const isVocabularySelected = (item, language) => {
    const isSelected = vocabularyList.some((vocab) => {
      if (language === 'german') {
        return (
          vocab.japanese === item.japanese &&
          vocab.pronunciation === item.pronunciation &&
          vocab.translation &&
          vocab.translation.german === item.translation.german
        );
      }
      if (language === 'english') {
        return (
          vocab.japanese === item.japanese &&
          vocab.pronunciation === item.pronunciation &&
          vocab.translation &&
          vocab.translation.english === item.translation.english
        );
      }
      if (item) {
        return (
          vocab.character === item.character &&
          vocab.pronunciation === item.pronunciation &&
          vocab.translation === item.translation
        );
      }
      return false;
    });
    return isSelected;
  };

  const toggleSelectedVocabulary = (item) => {
    if (isVocabularySelected(item)) {
      const updatedSelectedVocabularies = selectedVocabularies.filter(
        (vocab) => vocab.id !== item.id
      );
      setSelectedVocabularies(updatedSelectedVocabularies);
    } else {
      setSelectedVocabularies([...selectedVocabularies, item]);
    }
  };

  return (
    <VocabularyContext.Provider
      value={{
        vocabularyList,
        addVocabulary,
        removeVocabulary,
        isVocabularySelected,
        toggleSelectedVocabulary,
        selectedVocabularies, // Neuer State für ausgewählte Vokabeln
      }}
    >
      {children}
    </VocabularyContext.Provider>
  );
};
