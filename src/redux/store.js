import { configureStore } from '@reduxjs/toolkit';
import vocabularyReducer from './vocabularySlice';

const store = configureStore({
  reducer: {
    vocabulary: vocabularyReducer,
  },
});

export default store;
