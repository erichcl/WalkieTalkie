/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import App from './App';
import configStore from './src/store/configureStore';
import {Provider} from 'react-redux';

const store = configStore();

function AppWrapper(): JSX.Element {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWrapper;
