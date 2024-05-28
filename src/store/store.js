import { configureStore } from "@reduxjs/toolkit";
import vocabularyReducer from '../features/voabularySlice';

const store = configureStore({
    reducer: {
        vocabulary: vocabularyReducer,
    },
});

export default store;