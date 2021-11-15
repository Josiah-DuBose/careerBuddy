import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import reducers from './reducers';
import Drawer from './components/Drawer';

const store = createStore(reducers);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Drawer />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
