import React, {useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AuthGlobal from '../common/store/AuthGlobal';
import axios from 'axios';
import {logoutUser} from '../common/action/Auth.action';

const CustomDrawer = props => {
  const context = useContext(AuthGlobal);

  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate('Login');
    }
    AsyncStorage.getItem('jwt')
      .then(res => {
        axios
          .get(
            `http://10.0.2.2:3007/api/user/${context.stateUser.user.userId}`,
            {
              headers: {Authorization: `Bearer ${res}`},
            },
          )
          .then(user => setUserProfile(user.data));
      })
      .catch(error => console.log(error));

    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);
  console.log(userProfile ? userProfile.id : '');
  return (
    <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: '#212121', padding: 15}}>
        {/* User Row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#cacaca',
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />

          <View>
            <Text style={{color: 'white', fontSize: 24}}>
              {userProfile ? userProfile.name : ''}
            </Text>
            <Text style={{color: 'lightgrey'}}>5.00 *</Text>
          </View>
        </View>

        {/* Messages Row */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#919191',
            borderTopWidth: 1,
            borderTopColor: '#919191',
            paddingVertical: 5,
            marginVertical: 10,
          }}>
          <Pressable
            onPress={() => {
              console.warn('Messages');
            }}>
            <Text style={{color: '#dddddd', paddingVertical: 5}}>Messages</Text>
          </Pressable>
        </View>

        {/* Do more */}
        <Pressable
          onPress={() => {
            console.warn('Make Money Driving');
          }}>
          <Text style={{color: '#dddddd', paddingVertical: 5}}>
            Do more with your account
          </Text>
        </Pressable>

        {/* Make money */}
        <Pressable
          onPress={() => {
            console.warn('Make Money Driving');
          }}>
          <Text style={{color: 'white', paddingVertical: 5}}>
            Make money driving
          </Text>
        </Pressable>
      </View>

      <DrawerItemList {...props} />

      {/* Make money */}

      <Pressable
        onPress={() => [
          AsyncStorage.removeItem('jwt'),
          logoutUser(context.dispatch),
        ]}>
        <Text style={{padding: 5, paddingLeft: 20}}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
