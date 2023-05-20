import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Register from '../login/Register';
import OtpSend from '../otp/OtpSend';

const Intro = () => {
  const [showSlider, setShowSlider] = useState(true);
  const onDone = () => {
    setShowSlider(false);
  };
  const slides = [
    {
      key: 1,
      title: 'Request Ride',
      text: 'Request a ride get picked up by a nearby community drive',
      image: require('../../assets/car1.png'),
      backgroundColor: '#fff',
    },
    {
      key: 2,
      title: 'Confirm Your Driver',
      text: 'Huge drivers network helps you find comfortable, safe and cheap ride',
      image: require('../../assets/car1.png'),
      // backgroundColor: '#22bcb5',
    },
    {
      key: 3,
      title: 'Track your Ride',
      text: 'Know your driver in advance and be able to view current location in real time on the map',
      image: require('../../assets/car1.png'),
      // backgroundColor: '#22bcb5',
    },
  ];

  const RenderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 152,
          paddingTop: 218,
        }}>
        <Image style={styles.introImageStyle} source={item.image} />
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Text style={styles.introTextStyle}>{item.text}</Text>
        {item.key === 3 && (
          <TouchableOpacity
            onPress={onDone}
            style={{
              zIndex: 10,
              position: 'absolute',
              bottom: 100,
              alignSelf: 'center',
              borderRadius: 10,
              padding: 10,
              width: 200,
              height: 50,
              justifyContent: 'center',
              backgroundColor: '#4BE5B1',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontWeight: '700',
                textAlign: 'center',
              }}>
              {'Get Started'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={{marginTop: -55}}>
      <View style={styles.container}>
        {showSlider ? (
          <AppIntroSlider
            activeDotStyle={{width: 40, backgroundColor: '#3DDEA8'}}
            dotStyle={{width: 40, backgroundColor: '#F2F1F6'}}
            data={slides}
            renderItem={RenderItem}
            onDone={false}
            showSkipButton={false}
            showNextButton={false}
            showDoneButton={false}
          />
        ) : (
          <View style={{paddingTop: 232, paddingBottom: 300}}>
            <OtpSend />
          </View>
          // <>
          //   <Register />
          // </>
        )}
      </View>
    </ScrollView>
  );
};

export default Intro;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    color: '#000',
    paddingTop: 40,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
    paddingTop: 50,
    color: '#000',
  },
});
