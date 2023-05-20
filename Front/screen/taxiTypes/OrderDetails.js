import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const OrderDetails = ({total}) => {
  const navigation = useNavigation();
  const [typesData, setTypesData] = useState([]);
  const [order, setOrder] = useState([]);

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

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:3007/api/orders`)
      .then(res => {
        setOrder(res.data.response);
      })
      .catch(error => {
        console.log('Api call error');
        // alert(error.message);
      });
    return () => {
      setOrder([]);
    };
  }, []);

  const handleSubmit = async id => {
    const response = axios.post;
    axios
      .delete(`http://10.0.2.2:3007/api/order/${id}`)
      .then(res => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 100,
            type: 'success',
            text1: 'Your order has been cancelled !',
          });
        }
      })
      .catch(errors => {
        Toast.show({
          topOffset: 100,
          type: 'error',
          text1: 'Something went wront.',
          autoHide: true,
          visibilityTime: 2500,
          position: 'top',
          bottomOffset: 50,
        });
        console.log(errors, 'error');
      });
  };

  const updateSeat = async (id, rseat) => {
    console.log(rseat, 'cancel-seat');
    let remaining = total - rseat;
    console.log(remaining, 'remaining');
    const response = axios.post;
    axios
      .post(`http://10.0.2.2:3007/api/driverseats/${id}`, {
        bookseat: remaining,
      })
      .then(res => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 100,
            type: 'success',
            text1: 'Your ride has been cancelled!',
          });
        }
      })
      .catch(errors => {
        Toast.show({
          topOffset: 100,
          type: 'error',
          text1: 'Something went wrong',
          autoHide: true,
          visibilityTime: 2500,
          position: 'top',
          bottomOffset: 50,
        });
        console.log(errors, 'error');
      });
  };

  return (
    <View style={styles.container}>
      {order &&
        order.map(o => {
          return (
            <View key={o._id}>
              {typesData &&
                typesData.map(t => {
                  if (t._id == o.receivedBy) {
                    return (
                      <View>
                        {o.orderStatus !== 'Completed' ? (
                          <>
                            <View>
                              <Text style={styles.text}>
                                Total Price: {o.amount}
                              </Text>
                              <Text style={styles.text}>
                                Reserved Seat: {o.reserveSeat}
                              </Text>
                              <Text style={styles.text}>
                                Drier Name: {t.name}
                              </Text>
                              <Text style={styles.text}>
                                Vehicle No: {t.vehicleno}
                              </Text>
                              <Text style={styles.text}>
                                Driver Contact: {t.phone}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                updateSeat(t._id, o.reserveSeat);
                                handleSubmit(o._id);
                                alert('Your order is cancelled :)');
                                navigation.navigate('HomeScreen');
                              }}
                              style={styles.cancel}>
                              <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <></>
                        )}
                      </View>
                    );
                  }
                })}
            </View>
          );
        })}
    </View>
  );
};

export default OrderDetails;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 40,
    margin: 30,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    padding: 4,
  },
  cancel: {
    backgroundColor: 'red',
    padding: 5,
    marginTop: 30,
    marginBottom: 50,
  },
  cancelText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
