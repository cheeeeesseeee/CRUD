import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TodoItem({ item, onDelete, onEdit }) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{item.text}</Text>
      <Button color='#007BFF' title="Edit" onPress={() => onEdit(item)} />
      <View style={styles.space} />
      <Button color='#FF5733' title="Delete" onPress={() => onDelete(item.key)} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  text: {
    marginBottom: 10,
  },
  space: {
    width: 10, 
    height: 10,
  },
});
