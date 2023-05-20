import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import PlaceRow from './PlaceRow';
import {useNavigation} from '@react-navigation/native';

const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
};
const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
};

const DestinationSearch = () => {
  const [originPlace, setOriginPlace] = useState('');
  const [destinationPlace, setDestinationPlace] = useState('');

  const navigation = useNavigation();

  const goToResults = () => {
    if (originPlace && destinationPlace) {
      // console.warn('Redirect to results');
      navigation.navigate('SearchResults', {
        originPlace,
        destinationPlace,
      });
    }
  };

  useEffect(() => {
    goToResults();
  }, [originPlace, destinationPlace]);

  return (
    <SafeAreaView style={{paddingTop: 40, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setOriginPlace({data, details});
            console.log(details);
          }}
          styles={{
            textInput: styles.textInput,
            container: {
              position: 'absolute',
              top: 0,
              left: 10,
              right: 10,
            },
            listView: {
              position: 'absolute',
              top: 105,
            },
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyDlftpDMMjhq6MSN9p2SRZpOOqY-br-4gY',
            language: 'en',
          }}
          currentLocation={true}
          currentLocationLabel="Current location"
          renderRow={data => <PlaceRow data={data} />}
          enablePoweredByContainer={false}
          renderDescription={data => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        />
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setDestinationPlace({data, details});
            // console.log(data, details);
          }}
          styles={{
            textInput: styles.textInput,
            container: {
              position: 'absolute',
              top: 55,
              left: 10,
              right: 10,
            },

            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyDlftpDMMjhq6MSN9p2SRZpOOqY-br-4gY',
            language: 'en',
          }}
          renderRow={data => <PlaceRow data={data} />}
          enablePoweredByContainer={false}
        />
        {/* circle near origininput */}
        <View style={styles.circle} />
        {/* circle near line */}
        <View style={styles.line} />
        {/* circle near square */}
        <View style={styles.square} />
      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    height: '100%',
  },
  textInput: {
    padding: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
    marginLeft: 20,
  },
  separator: {
    backgroundColor: '#efefef',
    height: 1,
  },
  circle: {
    width: 5,
    height: 5,
    backgroundColor: 'black',
    position: 'absolute',
    top: 25,
    left: 15,
    borderRadius: 5,
  },
  line: {
    width: 1,
    height: 49,
    backgroundColor: '#919191',
    position: 'absolute',
    top: 30.5,
    left: 17,
  },
  square: {
    width: 5,
    height: 5,
    backgroundColor: 'black',
    position: 'absolute',
    top: 80,
    left: 15,
  },
});
