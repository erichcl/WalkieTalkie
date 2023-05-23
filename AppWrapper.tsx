/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
// import App from './App';
import configStore from './src/store/configureStore';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import DefaultStack from './src/screens/DefaultStack';

const store = configStore();

function AppWrapper(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DefaultStack />
      </NavigationContainer>
    </Provider>
  );
}

export default AppWrapper;
