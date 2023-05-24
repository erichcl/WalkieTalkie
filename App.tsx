import React from 'react';
import configStore from './src/store/configureStore';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import DefaultStack from './src/screens/DefaultStack';

const store = configStore();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DefaultStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
