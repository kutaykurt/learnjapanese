import React, { createContext, useState } from 'react';

export const VocabularyContext = createContext();

export const VocabularyProvider = ({ children }) => {
  const [vocabularyList, setVocabularyList] = useState([]);
  const [selectedVocabularies, setSelectedVocabularies] = useState([]);

  const addVocabulary = (newVocabulary) => {
    // Überprüfe, ob die Vokabel bereits in der Liste vorhanden ist
    const isVocabularyExists = vocabularyList.some(
      (vocab) =>
        vocab.character === newVocabulary.character &&
        vocab.pronunciation === newVocabulary.pronunciation &&
        vocab.translation === newVocabulary.translation &&
        vocab.japanese === newVocabulary.japanese &&
        vocab.translation.english === newVocabulary.translation.english &&
        vocab.translation.german === newVocabulary.translation.german
    );

    if (!isVocabularyExists) {
      // Wenn die Vokabel noch nicht vorhanden ist, füge sie hinzu
      newVocabulary.id = Date.now();
      setVocabularyList([...vocabularyList, newVocabulary]);
    } else {
      console.log('Vocabulary already exists:', newVocabulary);
      alert('Vocabulary already in your list!');
    }
  };

  const removeVocabulary = (id) => {
    const updatedList = vocabularyList.filter((vocab) => vocab.id !== id);
    setVocabularyList(updatedList);
  };

  const isVocabularySelected = (item, language, alphabet) => {
    console.log("HELLOOO", item, language);

    const isSelected = vocabularyList.some((vocab) => {
      if (language === 'german') {
        return (
          vocab.japanese === item.japanese &&
          vocab.pronunciation === item.pronunciation &&
          vocab.translation.german === item.translation.german
          );
        }
        if (language === 'english') {
          return (
            vocab.japanese === item.japanese &&
            vocab.pronunciation === item.pronunciation &&
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
