import React, { createContext, useState } from "react";

export const VocabularyContext = createContext();

export const VocabularyProvider = ({ children }) => {
  const [hiraganaVocabularyList, setHiraganaVocabularyList] = useState([]);
  const [katakanaVocabularyList, setKatakanaVocabularyList] = useState([]);
  const [selectedGermanVocabularies, setSelectedGermanVocabularies] = useState(
    []
  );
  const [selectedEnglishVocabularies, setSelectedEnglishVocabularies] =
    useState([]);

  const generateVocabularyId = (vocabulary, scriptType) => {
    if (scriptType !== "hiragana" && scriptType !== "katakana") {
      throw new Error("Invalid script type provided.");
    }

    const japaneseScript =
      scriptType === "hiragana"
        ? vocabulary.japaneseHiragana
        : vocabulary.japaneseKatakana;
    const pronunciation = vocabulary.pronunciation || "";
    const germanTranslation =
      vocabulary.translation && vocabulary.translation.german
        ? vocabulary.translation.german
        : "";
    const englishTranslation =
      vocabulary.translation && vocabulary.translation.english
        ? vocabulary.translation.english
        : "";
    const categories = vocabulary.categories || "";

    return `${japaneseScript}-${pronunciation}-${germanTranslation}-${englishTranslation}-${categories}`;
  };

  const addVocabulary = (newVocabulary, scriptType) => {
    if (scriptType !== "hiragana" && scriptType !== "katakana") {
      throw new Error("Invalid script type provided.");
    }

    const newVocabularyId = generateVocabularyId(newVocabulary, scriptType);
    const vocabularyList =
      scriptType === "hiragana"
        ? hiraganaVocabularyList
        : katakanaVocabularyList;
    const setVocabularyList =
      scriptType === "hiragana"
        ? setHiraganaVocabularyList
        : setKatakanaVocabularyList;
    const isVocabularyExists = vocabularyList.some(
      (vocab) => vocab.id === newVocabularyId
    );

    if (!isVocabularyExists) {
      const updatedVocabularyList = [
        ...vocabularyList,
        { ...newVocabulary, id: newVocabularyId },
      ];
      setVocabularyList(updatedVocabularyList);
    } else {
      console.log("Vocabulary already exists:", newVocabulary);
      // Hier kannst du wählen, ob du das vorhandene Vokabular aktualisieren oder das neue hinzufügen möchtest
      // Fürs Erste logge ich eine Nachricht zum Zwecke der Demonstration
      removeVocabulary(newVocabularyId, scriptType);
    }
  };

  const removeVocabulary = (id, scriptType) => {
    if (scriptType !== "hiragana" && scriptType !== "katakana") {
      throw new Error("Invalid script type provided.");
    }

    const vocabularyList =
      scriptType === "hiragana"
        ? hiraganaVocabularyList
        : katakanaVocabularyList;
    const setVocabularyList =
      scriptType === "hiragana"
        ? setHiraganaVocabularyList
        : setKatakanaVocabularyList;
    const updatedList = vocabularyList.filter((vocab) => vocab.id !== id);
    setVocabularyList(updatedList);
  };

  const isVocabularySelected = (item, scriptType, language) => {
    if (scriptType !== "hiragana" && scriptType !== "katakana") {
      throw new Error("Invalid script type provided.");
    }

    const vocabularyList =
      scriptType === "hiragana"
        ? hiraganaVocabularyList
        : katakanaVocabularyList;
    const isSelected = vocabularyList.some((vocab) => {
      const japaneseScript =
        scriptType === "hiragana"
          ? item.japaneseHiragana
          : item.japaneseKatakana;
      if (language === "german") {
        return (
          (japaneseScript === vocab.japaneseHiragana ||
            japaneseScript === vocab.japaneseKatakana) &&
          vocab.pronunciation === item.pronunciation &&
          vocab.translation &&
          vocab.translation.german === item.translation.german
        );
      }
      if (language === "english") {
        return (
          (japaneseScript === vocab.japaneseHiragana ||
            japaneseScript === vocab.japaneseKatakana) &&
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

  const toggleSelectedVocabulary = (item, scriptType, language) => {
    if (scriptType !== "hiragana" && scriptType !== "katakana") {
      throw new Error("Invalid script type provided.");
    }

    if (isVocabularySelected(item, scriptType, language)) {
      const vocabularyList =
        scriptType === "hiragana"
          ? hiraganaVocabularyList
          : katakanaVocabularyList;
      const setSelectedVocabularies =
        language === "german"
          ? setSelectedGermanVocabularies
          : setSelectedEnglishVocabularies;
      const updatedSelectedVocabularies = vocabularyList.filter(
        (vocab) => vocab.id !== item.id
      );
      setSelectedVocabularies(updatedSelectedVocabularies);
    } else {
      const setSelectedVocabularies =
        language === "german"
          ? setSelectedGermanVocabularies
          : setSelectedEnglishVocabularies;
      setSelectedVocabularies([...selectedGermanVocabularies, item]); // Korrigierter Variablenname
    }
  };

  return (
    <VocabularyContext.Provider
      value={{
        hiraganaVocabularyList,
        katakanaVocabularyList,
        addHiraganaVocabulary: (newVocabulary) =>
          addVocabulary(newVocabulary, "hiragana"),
        addKatakanaVocabulary: (newVocabulary) =>
          addVocabulary(newVocabulary, "katakana"),
        removeHiraganaVocabulary: (id) => removeVocabulary(id, "hiragana"),
        removeKatakanaVocabulary: (id) => removeVocabulary(id, "katakana"),
        isHiraganaVocabularySelected: (item, language) =>
          isVocabularySelected(item, "hiragana", language),
        isKatakanaVocabularySelected: (item, language) =>
          isVocabularySelected(item, "katakana", language),
        toggleSelectedHiraganaVocabulary: (item, language) =>
          toggleSelectedVocabulary(item, "hiragana", language),
        toggleSelectedKatakanaVocabulary: (item, language) =>
          toggleSelectedVocabulary(item, "katakana", language),
        selectedGermanVocabularies,
        selectedEnglishVocabularies,
      }}
    >
      {children}
    </VocabularyContext.Provider>
  );
};
