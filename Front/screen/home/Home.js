import React from 'react';
import {View, Dimensions} from 'react-native';
import CovidMessage from '../covidMessage/Index';

import HomeMap from '../homeMap/Index';
import HomeSearch from '../homeSearch/HomeSearch';

const Home = () => {
  return (
    <View>
      <View style={{height: Dimensions.get('window').height - 380}}>
        <HomeMap />
      </View>
      {/* covid message */}
      <CovidMessage />
      {/* srearch */}
      <HomeSearch />
    </View>
  );
};

export default Home;
