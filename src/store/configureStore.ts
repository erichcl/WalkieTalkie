import {configureStore} from '@reduxjs/toolkit';

import talkingReducer from '../reducers/talkingReducer';
const configStore = () => {
  return configureStore({
    reducer: {
      talking: talkingReducer,
    },
  });
};
export default configStore;
