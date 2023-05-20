import React, {useContext, useState, useEffect} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import NewOrderPopup from '../../components/newOrderPopup/NewOrderPopup';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios';
import AuthGlobal from '../../../context/store/AuthGlobal';
import AsyncStorage from '@react-native-community/async-storage';

const destinationLc = {latitude: 27.6768, longitude: 85.349};

const GOOGLE_MAPS_APIKEY = 'AIzaSyDlftpDMMjhq6MSN9p2SRZpOOqY-br-4gY';

const HomeScreen = () => {
  const context = useContext(AuthGlobal);
  // console.log(context.stateUser.user.driverId);
  const [isOnline, setIsOnline] = useState();
  const [myposition, setMyposition] = useState();

  const [order, setOrder] = useState();

  const [newOrder, setNewOrder] = useState([]);
  const [user, setUser] = useState([]);
  const [checkOrder, setCheckorder] = useState([]);

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:3007/api/orders`)
      .then(res => {
        setNewOrder(res.data.response[0]);
        setCheckorder(res.data.response);
        // console.log(res.data.response[0]);
      })
      .catch(error => {
        console.log('Api call error');
        // alert(error.message);
      });
    return () => {
      setNewOrder([]);
      setCheckorder([]);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:3007/api/users`)
      .then(res => {
        setUser(res.data.response);
        // console.log(res.data.response[0]);
      })
      .catch(error => {
        console.log('Api call error');
        // alert(error.message);
      });
    return () => {
      setUser([]);
    };
  }, []);

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
            `http://10.0.2.2:3007/api/driver/${context.stateUser.user.driverId}`,
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

  const onUserLocationChange = event => {
    setMyposition(event.nativeEvent.coordinate);
  };

  const onDirectionFound = e => {
    console.log('Direction found: ', e);
    if (order) {
      setOrder({
        ...order,
        distance: e.distance,
        duration: e.duration,
        pickedUp: order.pickedUp || e.distance < 0.4,
        isFinished: order.pickedUp && e.distance < 0.4,
      });
    }
  };

  const getDestination = () => {
    if (order && order.pickedUp) {
      return {
        latitude: order.destinationLatitude,
        longitude: order.destinationLongitude,
      };
    }
    return {
      latitude: order.originLatitude,
      longitude: order.originLongitude,
    };
  };

  const onDecline = () => {
    setNewOrder();
  };

  const onAccept = newOrder => {
    setOrder(newOrder);
    setNewOrder();
  };

  const onGoPress = () => {
    setIsOnline(!isOnline);
  };

  useEffect(() => {
    if (order && order.distance && order.distance < 0.4) {
      setOrder({...order, pickedUp: true});
    }
  }, []);

  console.log(order, 'order');
  const renderBottomTitle = () => {
    if (order && order.isFinished) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#cb1a1a',
              width: 200,
              padding: 8,
              paddingLeft: 60,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
              }}>
              Completed
            </Text>
          </View>
          {user &&
            user.map(u => {
              if (u._id == order.orderdBy) {
                return (
                  <Text key={u._id} style={styles.bottomText}>
                    {u.name}
                  </Text>
                );
              }
            })}
          {/* <Text style={styles.bottomText}>{order.user.name}</Text> */}
        </View>
      );
    }

    if (order && order.pickedUp) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : ''} min</Text>
            <View
              style={{
                backgroundColor: 'red',
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginHorizontal: 10,
              }}>
              <FontAwesome name={'user'} size={20} color={'white'} />
            </View>
            <Text>
              {order && order.distance ? order.distance.toFixed(1) : ''} Km
            </Text>
          </View>

          {user &&
            user.map(u => {
              if (u._id == order.orderdBy) {
                return (
                  <Text key={u._id} style={styles.bottomText}>
                    Dropping off {u.name}
                  </Text>
                );
              }
            })}
          {/* <Text style={styles.bottomText}>Dropping off {order.user.name}</Text> */}
        </View>
      );
    }
    if (order) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : ''} min</Text>
            <View
              style={{
                backgroundColor: '#48d42a',
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginHorizontal: 10,
              }}>
              <FontAwesome name={'user'} size={20} color={'white'} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : ''} Km</Text>
          </View>
          {user &&
            user.map(u => {
              if (u._id == order.orderdBy) {
                return (
                  <View key={u._id}>
                    <Text style={styles.bottomText}>Picking up {u.name}</Text>
                    <Text style={styles.bottomText}>{u.phone}</Text>
                  </View>
                );
              }
            })}
          {/* <Text style={styles.bottomText}>Picking up {order.user.name}</Text> */}
        </View>
      );
    }
    if (isOnline) {
      return <Text style={styles.bottomText}>You're online</Text>;
    }
    return <Text style={styles.bottomText}>You're offline</Text>;
  };

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        style={{height: Dimensions.get('window').height - 90, width: '100%'}}
        region={{
          latitude: 27.6667,
          longitude: 85.35,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {order && (
          <MapViewDirections
            onReady={onDirectionFound}
            // origin={myposition}
            origin={destinationLc}
            destination={getDestination()}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )}
      </MapView>

      {checkOrder &&
        checkOrder.map(a => {
          if ((userProfile && userProfile.id) == a.receivedBy) {
            return (
              <>
                <Pressable
                  onPress={() => console.warn('Balance')}
                  style={styles.balanceButton}>
                  <Text style={styles.balanceText}>
                    <Text style={{color: 'green'}}>Rs.</Text>
                    {order && order.amount}
                  </Text>
                </Pressable>
                <Pressable onPress={onGoPress} style={styles.goButton}>
                  <Text style={styles.goText}>{isOnline ? 'END' : 'GO'} </Text>
                </Pressable>

                <View style={styles.bottomContainer}>
                  <Ionicons
                    name={'md-options-outline'}
                    size={25}
                    color="#4a4a4a"
                  />
                  {renderBottomTitle()}
                  <Entypo name={'menu'} size={25} color="#4a4a4a" />
                </View>
                {newOrder && (
                  <NewOrderPopup
                    newOrder={newOrder}
                    duration={2}
                    distance={0.7}
                    onDecline={onDecline}
                    onAccept={() => onAccept(newOrder)}
                  />
                )}
              </>
            );
          } else {
            return (
              <View style={{alignItems: 'center'}}>
                <View style={{alignItems: 'center', paddingTop: 20}}>
                  <Text
                    style={{
                      backgroundColor: 'blue',
                      color: '#fff',
                      fontSize: 17,
                      fontWeight: '700',
                      textAlign: 'center',
                      padding: 10,
                    }}>
                    No Request
                  </Text>
                </View>
              </View>
            );
          }
        })}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bottomContainer: {
    height: 90,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 22,
    color: '#4a4a4a',
  },
  roundButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
  },
  goButton: {
    position: 'absolute',
    backgroundColor: '#1495ff',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    bottom: 110,
    left: Dimensions.get('window').width / 2 - 37,
  },
  goText: {
    fontSize: 25,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  balanceButton: {
    position: 'absolute',
    backgroundColor: '#000000',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: 10,
    left: Dimensions.get('window').width / 2 - 37,
  },
  balanceText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
