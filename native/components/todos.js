import React from 'react';
import { StyleSheet, Text, Image, FlatList, Button, View } from 'react-native';

export default function TodosItem ({ todos, onDelete }) {

    const renderItem = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.text}</Text>
          <Button title='Delete' onPress={() => onDelete(item.key)} />
        </View>
      );
    return (
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
    )
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
        fontSize: 18,
    }
})
