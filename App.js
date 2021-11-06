import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import reducers from './reducers';
import Layout from './components/Layout';

const store = createStore(reducers);

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Layout />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
