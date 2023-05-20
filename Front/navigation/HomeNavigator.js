import React from 'react';
import Intro from '../screen/home/Intro';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from '../screen/login/Register';
import Login from '../screen/login/Login';
import DestinationSearch from '../screen/destinationSearch/DestinationSearch';
import SearchResults from '../screen/searchResults/SearchResults';
import Home from '../screen/home/Home';
import OtpSend from '../screen/otp/OtpSend';
const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeFirst"
        component={Intro}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Opts"
        component={OtpSend}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DestinationSearch"
        component={DestinationSearch}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
