import React from 'react';
import {Dimensions, View} from 'react-native';
import RouteMap from '../routeMap/RouteMap';
import TaxiTypes from '../taxiTypes/TaxiTypes';
import {useRoute} from '@react-navigation/native';

const SearchResults = () => {
  const route = useRoute();

  console.log(route.params);

  const {originPlace, destinationPlace} = route.params;

  // console.log('params', route.params);

  return (
    <View>
      <View style={{height: Dimensions.get('window').height - 250}}>
        <RouteMap
          originPlace={originPlace}
          destinationPlace={destinationPlace}
        />
      </View>
      <View style={{height: 250}}>
        <TaxiTypes
          originPlace={originPlace}
          destinationPlace={destinationPlace}
        />
      </View>
    </View>
  );
};

export default SearchResults;
