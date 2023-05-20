import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const NumberInput = () => {
  const navigation = useNavigation();
  const [mobileNo, setMobileNo] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [confirm, setConfirm] = useState(null);

  const sendOtp = async () => {
    try {
      const mobile = '+977' + mobileNo;
      const response = await auth().signInWithPhoneNumber(mobile);
      setConfirm(response);
      console.log(response);
      alert('Otp Is Sent Please Verify It...');
    } catch (err) {
      console.log(err);
    }
  };

  const submitOtp = async () => {
    try {
      const response = await confirm.confirm(otpInput);
      console.log(response);
      alert('Your number is verified');
      if (response) {
        navigation.navigate('Register');
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!confirm) {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          {'Please enter your mobile number'}
        </Text>
        <View style={styles.containerInput}>
          <View style={styles.openDialogVie}>
            <Text>{'+977 |'}</Text>
          </View>
          <TextInput
            style={styles.phoneInnputStyle}
            placeholder="9866457226"
            keyboardType="numeric"
            onChangeText={value => setMobileNo(value)}
          />
        </View>
        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={() => sendOtp()}>
            <View style={styles.btnContinue}>
              <Text style={styles.textContinue}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          {'Enter your OTP code sent via SMS'}
        </Text>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.phoneInnputStyle}
            keyboardType="numeric"
            onChangeText={value => setOtpInput(value)}
          />
        </View>
        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={() => submitOtp()}>
            <View style={styles.btnContinue}>
              <Text style={styles.textContinue}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NumberInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTitle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 16,
  },
  containerInput: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadious: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#4BE5B1',
  },
  openDialogVie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneInnputStyle: {
    marginLeft: 5,
    flex: 1,
    height: 50,
  },
  viewBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadious: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4BE5B1',
    marginTop: 20,
  },
  textContinue: {
    color: '#ffffff',
    alignItems: 'center',
  },
});
