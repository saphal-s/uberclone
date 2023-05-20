import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {enableLatestRenderer} from 'react-native-maps';
import cars from '../../assets/data/taxi';
enableLatestRenderer();

const HomeMap = () => {
  const getImage = type => {
    if (type === 'Taxi-1') {
      return require('../../assets/car1.png');
    }
    if (type === 'Taxi-2') {
      return require('../../assets/car1.png');
    }
    return require('../../assets/car1.png');
  };
  return (
    <View style={styles.container}>
      <MapView
        style={{backgroundColor: '#ccc', height: '100%'}}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: 27.6915,
          longitude: 85.342,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {cars.map(car => (
          <Marker
            key={car.id}
            coordinate={{latitude: car.latitude, longitude: car.longitude}}>
            <Image
              style={{
                width: 45,
                height: 45,
                resizeMode: 'contain',
                transform: [
                  {
                    rotate: `${car.heading}deg`,
                  },
                ],
              }}
              source={getImage(car.type)}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  container: {
    height: 400,
    backgroundColor: '#fff',
  },
});
