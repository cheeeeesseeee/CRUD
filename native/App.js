import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import Navigator from './navigation/appNavigator'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff'
  },
});