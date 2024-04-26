import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './reducers/coinSlice';

export default configureStore({
  reducer: {
    coin : coinReducer
  }
});