import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {enableLatestRenderer} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
enableLatestRenderer();

const GOOGLE_MAPS_APIKEY = 'AIzaSyDlftpDMMjhq6MSN9p2SRZpOOqY-br-4gY';

const RouteMap = ({originPlace, destinationPlace}) => {
  let lats = originPlace.details.geometry.location.lat;
  let langs = originPlace.details.geometry.location.lng;
  const originLc = {
    latitude: originPlace.details.geometry.location.lat,
    longitude: originPlace.details.geometry.location.lng,
  };
  const destinationLc = {
    latitude: destinationPlace.details.geometry.location.lat,
    longitude: destinationPlace.details.geometry.location.lng,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{backgroundColor: '#ccc', height: '100%'}}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: lats,
          longitude: langs,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          origin={originLc}
          destination={destinationLc}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="black"
        />
        <Marker coordinate={originLc} title={'Origin'} />
        <Marker coordinate={destinationLc} title={'Destination'} />
      </MapView>
    </View>
  );
};

export default RouteMap;

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    backgroundColor: '#fff',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
});
