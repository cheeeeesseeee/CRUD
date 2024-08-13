import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Alert, ScrollView } from 'react-native';
import Header from './components/header';
import AddTodo from './components/addTodo';
import TodoItem from './components/todos';
import { deleteTodo } from './api';

export default function App() {

  const [todos, getTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:5189/todo', {
          headers: {
            'Accept': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Network response error');
        }
        const json = await response.json();
        getTodos(json);
        console.log(json);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    }

    fetchTodos();
  }, []);

  const handleAddTodo = (text) => {
    getTodos((prevTodos) => [
      { text: text, key: Math.random().toString() },
      ...prevTodos
    ]);
  };

  const handleDeleteTodo = async (key) => {
    try {
      await deleteTodo(key);
      getTodos((prevTodos) => {
        return prevTodos.filter(todo => todo.key !== key);
      });
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo onAdd={ handleAddTodo } />
        <TodoItem todos={todos} onDelete={handleDeleteTodo}/>
      </View>
    </ScrollView>
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
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
  }
});
