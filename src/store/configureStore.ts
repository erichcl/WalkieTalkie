import {configureStore} from '@reduxjs/toolkit';
import talkingReducer from '../reducers/talkingReducer';

const store = configureStore({
  reducer: {
    talking: talkingReducer,
  },
});

const configStore = () => {
  return store;
};

export type RootState = ReturnType<typeof store.getState>;

export default configStore;
