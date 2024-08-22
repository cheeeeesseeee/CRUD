import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleChange = (val) => {
    setText(val);
  };

  const handleSubmit = () => {
    onAdd({ text, key: Math.random().toString() });
    setText('');
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Add new Loan Type..."
        onChangeText={handleChange}
        value={text}
      />
      <Button onPress={handleSubmit} title="Add Loan Type" color="#007BFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
    