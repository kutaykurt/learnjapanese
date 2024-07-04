import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hiraganaVocabularyList:
    JSON.parse(localStorage.getItem("hiraganaVocabularies")) || [],
  katakanaVocabularyList:
    JSON.parse(localStorage.getItem("katakanaVocabularies")) || [],
  selectedGermanVocabularies: [],
  selectedEnglishVocabularies: [],
};

const vocabularySlice = createSlice({
  name: "vocabulary",
  initialState,
  reducers: {
    addVocabulary: (state, action) => {
      const { newVocabulary, scriptType } = action.payload;
      const newVocabularyId = `${
        newVocabulary.japaneseHiragana || newVocabulary.japaneseKatakana
      }-${newVocabulary.pronunciation}-${
        newVocabulary.translation.german || ""
      }-${newVocabulary.translation.english || ""}`;
      const listKey =
        scriptType === "hiragana"
          ? "hiraganaVocabularyList"
          : "katakanaVocabularyList";

      if (!state[listKey].some((vocab) => vocab.id === newVocabularyId)) {
        state[listKey].push({ ...newVocabulary, id: newVocabularyId });
        localStorage.setItem(
          `${scriptType}Vocabularies`,
          JSON.stringify(state[listKey])
        );
      }
    },
    removeVocabulary: (state, action) => {
      const { id, scriptType } = action.payload;
      const listKey =
        scriptType === "hiragana"
          ? "hiraganaVocabularyList"
          : "katakanaVocabularyList";

      state[listKey] = state[listKey].filter((vocab) => vocab.id !== id);
      localStorage.setItem(
        `${scriptType}Vocabularies`,
        JSON.stringify(state[listKey])
      );
    },
    toggleSelectedVocabulary: (state, action) => {
      const { item, language } = action.payload;
      const selectedKey =
        language === "german"
          ? "selectedGermanVocabularies"
          : "selectedEnglishVocabularies";

      if (state[selectedKey].some((vocab) => vocab.id === item.id)) {
        state[selectedKey] = state[selectedKey].filter(
          (vocab) => vocab.id !== item.id
        );
      } else {
        state[selectedKey].push(item);
      }
    },
  },
});

export const { addVocabulary, removeVocabulary, toggleSelectedVocabulary } =
  vocabularySlice.actions;

export default vocabularySlice.reducer;
