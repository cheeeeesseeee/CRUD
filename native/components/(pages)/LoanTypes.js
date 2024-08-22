import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import Header from '../header';
import AddTodo from '../addTodo';
import LoanTypesItem from '../loanTypes';
import EditLoanTypesModal from '../editLoanTypesModal';
import { fetchItems, deleteLoanType, updateLoanType, addLoanType } from '../api';

export default function LoanTypes() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [newText, setNewText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItems();
      setTodos(data);
    };
    fetchData();
  }, []);

  const handleAddTodo = async (todo) => {
    const newTodo = { text: todo.text, key: todo.key || Math.random().toString() };
    
    try {
      const savedTodo = await addLoanType(newTodo);
      setTodos([...todos, savedTodo]);
    } catch (error) {
      console.error('Add loan type error:', error);
    }
  };

  const handleDeleteTodo = async (key) => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this loan type?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteLoanType(key);
              setTodos(prevTodos => prevTodos.filter(todo => todo.key !== key));
            } catch (error) {
              console.error('Delete error:', error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleUpdateTodo = async (key, text) => {
    try {
      const updatedTodo = await updateLoanType(key, text);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.key === key ? updatedTodo : todo))
      );
      setEditingTodo(null);
      setModalVisible(false);
    } catch (error) {
      console.error('Update loan type error:', error);
    }
  };
  
  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setNewText(todo.text);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AddTodo onAdd={handleAddTodo} />
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <LoanTypesItem item={item} onDelete={handleDeleteTodo} onEdit={openEditModal} />
          )}
          keyExtractor={item => item.key}
        />
        <EditLoanTypesModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          todo={editingTodo}
          newText={newText}
          setNewText={setNewText}
          onUpdate={handleUpdateTodo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
  },
});
