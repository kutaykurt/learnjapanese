import React, { createContext, useState } from 'react';

export const VocabularyContext = createContext();

export const VocabularyProvider = ({ children }) => {
  const [vocabularyList, setVocabularyList] = useState([]);

  const addVocabulary = (newVocabulary) => {
    // Überprüfe, ob die Vokabel bereits in der Liste vorhanden ist
    const isVocabularyExists = vocabularyList.some(
      (vocab) =>
        vocab.character === newVocabulary.character &&
        vocab.pronunciation === newVocabulary.pronunciation &&
        vocab.translation === newVocabulary.translation
    );
  
    if (!isVocabularyExists) {
      // Wenn die Vokabel noch nicht vorhanden ist, füge sie hinzu
      newVocabulary.id = Date.now();
      setVocabularyList([...vocabularyList, newVocabulary]);
    } else {
      console.log('Vocabulary already exists:', newVocabulary);
      // Hier könntest du eine Benachrichtigung anzeigen oder einfach die Existenz der Vokabel loggen
      alert("Vocabulary already in your list!")
    }
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