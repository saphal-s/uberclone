import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import Error from '../shared/Error';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [vehicleno, setVehicleno] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    var validRegex =
      /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

    if (name === '') {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Name is required!',
        autoHide: true,
        visibilityTime: 2500,
        position: 'top',
        bottomOffset: 50,
        topOffset: 100,
      });
    } else if (email === '') {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Email is required!',
        autoHide: true,
        visibilityTime: 2500,
        position: 'top',
        bottomOffset: 50,
        topOffset: 100,
      });
    } else if (!email.match(validRegex)) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Invalid email!',
        autoHide: true,
        visibilityTime: 2500,
        position: 'top',
        bottomOffset: 50,
        topOffset: 100,
      });
    } else if (vehicleno === '') {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Vehicle no is required!',
        autoHide: true,
        visibilityTime: 2500,
        position: 'top',
        bottomOffset: 50,
        topOffset: 100,
      });
    } else if (password === '') {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Password is required!',
        autoHide: true,
        visibilityTime: 2500,
        position: 'top',
        bottomOffset: 50,
        topOffset: 100,
      });
    } else if (password.length < 6 || password.length > 16) {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Password must between 6 to 16 character',
        autoHide: true,
        visibilityTime: 2500,
        position: 'top',
        bottomOffset: 50,
        topOffset: 100,
      });
    }
    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      vehicleno: vehicleno,
    };

    try {
    } catch (error) {}

    const response = axios.post;
    axios
      .post(`http://10.0.2.2:3007/api/dregister`, user)
      .then(res => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 100,
            type: 'success',
            text1: 'Registration Completed.',
            text2: 'Please login your account.',
          });
          setTimeout(() => {
            navigation.navigate('Login');
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setVehicleno('');
            setError('');
          }, 700);
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.loginTitle}>Register as Driver</Text>
        <View style={styles.input_level}>
          <Text style={styles.text_header}>Name</Text>
          <TextInput
            placeholder="enter your name"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            id={'name'}
            name={'name'}
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.input_level}>
          <Text style={styles.text_header}>Email</Text>
          <TextInput
            placeholder="eg. abc@gmail.com"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            id={'email'}
            name={'email'}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.input_level}>
          <Text style={styles.text_header}>Enter your phone number</Text>
          <TextInput
            placeholder="+977-"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            maxLength={10}
            id={'phone'}
            name={'phone'}
            value={phone}
            keyboardType={'numeric'}
            onChangeText={text => setPhone(text)}
          />
        </View>
        <View style={styles.input_level}>
          <Text style={styles.text_header}>Enter your vehicle number</Text>
          <TextInput
            placeholder="enter your vehicle no."
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            maxLength={10}
            id={'vehicleno'}
            name={'vehicleno'}
            value={vehicleno}
            onChangeText={text => setVehicleno(text)}
          />
        </View>
        <View style={styles.input_level}>
          <Text style={styles.text_header}>Password</Text>
          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            id={'password'}
            name={'password'}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <Toast />
        {error ? <Error message={error} /> : null}
        <View style={styles.button}>
          <TouchableOpacity
            key={2}
            style={[
              styles.signIn,
              {
                borderColor: '#fff',
                borderWidth: 1,
                marginTop: 20,
              },
            ]}
            onPress={() => handleSubmit()}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#fff',
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={styles.flex}>
            <Text
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: '#fff',
                  paddingBottom: 10,
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginTop: 10,
                  paddingLeft: 20,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20d2bb',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 81,
  },
  loginImageStyle: {
    height: 155,
    width: 170,
  },
  loginTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    paddingTop: 25,
  },
  text_header: {
    color: '#fff',
    fontSize: 16,
    paddingBottom: 4,
    fontWeight: '600',
    textAlign: 'left',
  },
  textInput: {
    backgroundColor: '#fff',
    width: 300,
    paddingLeft: 20,
  },
  input_level: {
    paddingTop: 20,
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    width: 200,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
});

export default Register;
