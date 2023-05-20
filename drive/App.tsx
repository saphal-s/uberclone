import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import {enableLatestRenderer} from 'react-native-maps';
import HomeScreen from './src/screens/homeScreen/HomeScreen';
import HomeNavigator from './src/navigation/HomeNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Auth from './context/store/Auth';
import store from './src/redux/store';
enableLatestRenderer();

const App = () => {
  return (
    <Auth>
      <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      
      <NavigationContainer>
         <HomeNavigator/> 
      </NavigationContainer>
        {/* <HomeScreen/> */}
      
      </Provider>
      
    </Auth>
  )
}

export default App