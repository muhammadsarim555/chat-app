import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Login from './src/Screens/Login';
import Navigation from './src/Navigation/stack';
import Loader from "./src/Component/ActivityIndicator"

console.disableYellowBox = true;

const App = () => {
  return <Navigation />;
};

export default App;
