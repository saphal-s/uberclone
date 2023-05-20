import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';

import Error from '../shared/Error';
import {useNavigation} from '@react-navigation/native';
import AuthGlobal from '../../common/store/AuthGlobal';
import {loginUser} from '../../common/action/Auth.action';

const Login = () => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate('HomeScreen');
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };
    if (email === '' || password === '') {
      setError('Please fill all fields !');
    } else {
      loginUser(user, context.dispatch);
      // setEmail('');
      // setPassword('');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.loginTitle}>Login as User</Text>
        <View style={styles.input_level}>
          <Text style={styles.text_header}>Email</Text>
          <TextInput
            placeholder="eg. abc@gmail.com"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            name={'email'}
            id={'email'}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.input_level}>
          <Text style={styles.text_header}>Password</Text>
          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            name={'password'}
            id={'password'}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <Toast />
        {error ? <Error message={error} /> : null}
        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: '#fff',
                borderWidth: 1,
                marginTop: 15,
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
              Sign In
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
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  color: '#fff',
                  paddingBottom: 10,
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginTop: 10,
                  paddingLeft: 20,
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20d2bb',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    paddingTop: 167,
    paddingBottom: 121,
  },
  loginTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    paddingTop: 30,
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
    marginBottom: 50,
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
    marginTop: 20,
  },
});
