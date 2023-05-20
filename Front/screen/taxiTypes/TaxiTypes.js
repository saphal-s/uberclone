import React, {useState, useEffect, useContext} from 'react';
import {
  Modal,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {getDistance} from 'geolib';
import {useNavigation} from '@react-navigation/native';
import AuthGlobal from '../../common/store/AuthGlobal';
import AsyncStorage from '@react-native-community/async-storage';
import OrderDetails from './OrderDetails';

const TaxiTypes = ({originPlace, destinationPlace}) => {
  // console.log(originPlace, 'Taxi types');

  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  const [reserveSeat, setReserveSeat] = useState();

  const navigation = useNavigation();
  const [display, setDisplay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mdata, setMdata] = useState({});
  const [distance, setDistance] = useState(0);

  const [bookseats, setBookSeats] = useState(0);

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      navigation.navigate('Login');
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
  console.log(userProfile, 'user');

  useEffect(() => {
    var dis = getDistance(
      {
        latitude: originPlace.details.geometry.location.lat,
        longitude: originPlace.details.geometry.location.lng,
      },
      {
        latitude: destinationPlace.details.geometry.location.lat,
        longitude: destinationPlace.details.geometry.location.lng,
      },
    );
    setDistance(dis / 1000);
  }, []);

  // const calculateDistance = () => {
  // };

  const [typesData, setTypesData] = useState([]);

  let price = 20 * distance;

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:3007/api/driver`)
      .then(res => {
        setTypesData(res.data.response);
      })
      .catch(error => {
        console.log('Api call error');
        // alert(error.message);
      });
    return () => {
      setTypesData([]);
    };
  }, []);
  // console.log(typesData);

  let total = mdata.bookseat * 1 + reserveSeat * 1;

  console.log(total);

  console.log(price, 'price');
  console.log(reserveSeat, 'reserveSeat');

  const handleSubmit = async () => {
    let order = {
      originLatitude: originPlace.details.geometry.location.lat,
      originLongitude: originPlace.details.geometry.location.lng,
      destinationLatitude: destinationPlace.details.geometry.location.lat,
      destinationLongitude: destinationPlace.details.geometry.location.lng,
      reserveSeat: reserveSeat,
      amount: price * reserveSeat,
      orderdBy: userProfile ? userProfile.id : '',
      receivedBy: mdata.id,
    };

    const response = axios.post;
    axios
      .post(`http://10.0.2.2:3007/api/order`, order)
      .then(res => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 100,
            type: 'success',
            text1: 'Your seat has been booked!',
          });
          setReserveSeat(' ');
        }
      })
      .catch(errors => {
        Toast.show({
          topOffset: 100,
          type: 'error',
          text1: 'This email already exits. Please Login!',
          autoHide: true,
          visibilityTime: 2500,
          position: 'top',
          bottomOffset: 50,
        });
        console.log(errors, 'error');
      });
  };

  const updateSeat = async (id, total) => {
    const response = axios.post;
    axios
      .post(`http://10.0.2.2:3007/api/driverseat/${id}`, {bookseat: total})
      .then(res => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 100,
            type: 'success',
            text1: 'Your seat has been update',
          });
        }
      })
      .catch(errors => {
        Toast.show({
          topOffset: 100,
          type: 'error',
          text1: 'This email already exits. Please Login!',
          autoHide: true,
          visibilityTime: 2500,
          position: 'top',
          bottomOffset: 50,
        });
        console.log(errors, 'error');
      });
  };

  return (
    <View style={{marginTop: -80}}>
      {display ? (
        <>
          <OrderDetails total={total} />
        </>
      ) : (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {mdata.vehicleno} ({mdata.seat}/{mdata.bookseat})
                </Text>
                <Text style={styles.modalText}>{mdata.name}</Text>
                <Text style={styles.modalText}>{mdata.phone}</Text>
                <Text style={styles.modalText}>Rs. {price}/Person</Text>
                <Text style={styles.modalText}>Total Price: Rs. {price}</Text>
                <ScrollView>
                  <View>
                    <Text style={{}}>Enter No. of Seat</Text>
                    <TextInput
                      placeholderTextColor="#666666"
                      style={styles.textInput}
                      autoCapitalize="none"
                      maxLength={10}
                      id={'reserveSeat'}
                      name={'reserveSeat'}
                      value={reserveSeat}
                      keyboardType={'numeric'}
                      onChangeText={text => setReserveSeat(text)}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        updateSeat(mdata.id, total);
                        handleSubmit();
                        alert('Your took took is booked :)');
                        setDisplay(true);
                        setModalVisible(!modalVisible);
                      }}
                      style={styles.confirm}>
                      <Text style={styles.confirmtext}>Confirm Taxi</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {typesData.map(t => (
            <Pressable
              onPress={() => {
                setModalVisible(true), setMdata(t);
              }}>
              {t.bookseat == 6 ? (
                <></>
              ) : (
                <View style={[styles.container]} key={t.id}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/car1.png')}
                  />
                  <View style={styles.middleContainer}>
                    <Text style={styles.type}>
                      {t.vehicleno}
                      <Ionicons name={'person'} size={12} />
                      {t.bookseat}/{t.seat}
                    </Text>
                    <Text style={styles.time}>1:00 PM</Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text style={styles.price}>
                      <Ionicons name={'pricetag'} size={18} color={'#42d742'} />
                      Rs. {price}
                    </Text>
                  </View>
                </View>
              )}
            </Pressable>
          ))}
        </>
      )}
    </View>
  );
};

export default TaxiTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textInput: {
    backgroundColor: '#ccc',
    width: 260,
    paddingLeft: 20,
    marginLeft: 4,
  },
  image: {
    height: 70,
    width: 80,
    resizeMode: 'contain',
  },
  middleContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  time: {
    color: '#a6a6a6',
  },
  rightContainer: {
    width: 130,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
  },
  confirm: {
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    width: 250,
  },
  confirmtext: {
    color: 'white',
    fontWeight: 'bold',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    position: 'absolute',
    right: 0,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  detailContainer: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 30,
  },
  detailText: {
    fontWeight: '600',
    fontSize: 16,
    padding: 5,
  },
  cancel: {
    backgroundColor: 'red',
    padding: 5,
  },
  cancelText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
