import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import BottomTabNavigator from './navigators/BottomTabNavigator';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
