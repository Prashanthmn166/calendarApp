import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


import Colors from './constants/Colors';
import MainCalendarScreen from './screens/MainCalendarScreen';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <MainCalendarScreen></MainCalendarScreen>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    paddingTop:24,
    flex:1
  },
  container:{
    flex:1,
    backgroundColor: Colors.appBackGroudColor
  }
});
