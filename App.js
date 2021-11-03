import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { NativeBaseProvider, Center } from 'native-base';
import Login from './components/Login';
import Loading from './components/Loading';
import Home from './components/Home';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);


  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NativeBaseProvider>
      {initializing && <Loading />}
      {!initializing && (
        <Center flex={1} px="3">
          {!user && <Login />}
          {user && <Home />}
        </Center>
      )}
    </NativeBaseProvider>
  );
};

export default App;
