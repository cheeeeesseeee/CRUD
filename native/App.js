import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Header from './components/header';
import AddTodo from './components/addTodo';
import { deleteTodo } from './api';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newText, setNewText] = useState('');
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:5189/todo', {
          headers: {
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const json = await response.json();
        setTodos(json);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = (todo) => {
    const newTodo = { text: todo.text, key: todo.key || Math.random().toString() };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = async (key) => {
    try {
      await deleteTodo(key);
      setTodos((prevTodos) => prevTodos.filter(todo => todo.key !== key));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleUpdateTodo = async (key, text) => {
    try {
      const response = await fetch(`http://localhost:5189/todo/${key}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.key === key ? updatedTodo : todo))
      );
      setEditingTodo(null);
      setModalVisible(false);
    } catch (error) {
      console.error('Update todo error:', error);
    }
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setNewText(todo.text);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.Loans}>{item.text}</Text>
      <Button color='green' title="Edit" onPress={() => openEditModal(item)} />
      <View style={styles.space} />
      <Button color='red' title="Delete" onPress={() => handleDeleteTodo(item.key)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <AddTodo onAdd={handleAddTodo} />
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />

        {/* Edit Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            setEditingTodo(null);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                placeholder="Edit todo"
                value={newText}
                onChangeText={setNewText}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleUpdateTodo(editingTodo.key, newText)}
              >
                <Text style={styles.buttonText}>Update Todo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setEditingTodo(null);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  space: {
    width: 10, 
    height: 10,
  },
  Loans: {
    marginBottom: 10,
    alignItems: 'center',
    fontWeight: '450',
    justifyContent: 'center'
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    width: '80%', 
    maxHeight: '50%', 
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: 'coral',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonClose: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
