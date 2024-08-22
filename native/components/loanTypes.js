import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export default function TodoItem({ item, onDelete, onEdit }) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{item.text}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onEdit(item)}>
          <AntDesign name='edit' size={18} color='#007BFF' />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => onDelete(item.key)}>
          <MaterialIcons name='delete' size={18} color='#FF5733' />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  text: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: '100%', 
    justifyContent: 'center',
    margin: 5
  },
  buttonText: {
    marginLeft: 5,
    color: '#007BFF',
    alignItems: 'center',
    alignSelf: 'center'
  },
});
