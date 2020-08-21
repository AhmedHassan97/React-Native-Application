import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { YellowBox } from 'react-native';


const store = ConfigureStore();
YellowBox.ignoreWarnings([
  'Animated: `useNativeDriver` was not specified.',
]);
export default function App() {
  return (
    <Provider store={store}>
        <Main />
      </Provider>
  );
}


