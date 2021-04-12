import React, { useState, useEffect } from 'react';

import { View } from "react-native";
import MovieView from '../movieView/movieView';
import Search from '../movieSearch/movieSearch';

const App = () => {
  const [opacityClass, setOpacityClass] = useState(0);
  const [searchPhrase, setSearchPhrase] = useState(false);

  useEffect(() => {
    setOpacityClass(1);
  }, []);

  const hanldeEvent = (e) => {
    setSearchPhrase(e.target.value);
  };

  return (
    <View style={{ transition: 'all 1s ease-in-out', opacity: opacityClass }}>
      <Search hanldeEvent={hanldeEvent} />
      <MovieView searchPhrase={searchPhrase} />
    </View>
  );
};

export default App;