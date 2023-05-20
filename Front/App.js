import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');
import 'react-native-gesture-handler';
import RootNavigator from './navigation/RootNavigator';
import {StatusBar, LogBox} from 'react-native';
import HomeNavigator from './navigation/HomeNavigator';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './common/store/Auth';
import {Provider} from 'react-redux';
import store from './redux/store';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs(true);

const App = () => {
  const androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Uber App Camera Permission',
          message:
            'Uber App needs access to your camera ' +
            'so you can take awesome rides.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      androidPermission();
    } else {
      Geolocation.requestAuthorization();
    }
  }, []);
  return (
    <Auth>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        {/* <NavigationContainer>
        {login == true ? <RootNavigator /> : <HomeNavigator />}
      </NavigationContainer> */}
        <NavigationContainer>
          <RootNavigator />
          <Toast ref={ref => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
};

export default App;
