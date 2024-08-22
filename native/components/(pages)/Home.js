import React from 'react';
import { StatusBar, StyleSheet, View, Text, Button } from 'react-native';

export default function App({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('Loan Types');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loan Types</Text>
      <Button color='#556B2F'  title='Check Loan Types Here' onPress={pressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
