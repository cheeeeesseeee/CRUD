// api/todoApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5189/todo'; 

// export const getTodos = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching todos:", error);
//     throw error; 
//   }
// };

export const addTodo = async (todo) => {
  try {
    const response = await axios.post(API_URL, todo);
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const updateTodo = async (key, todo) => {
  try {
    const response = await axios.put(`${API_URL}/${key}`, todo);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (key) => {
  try {
    const response = await axios.delete(`${API_URL}/${key}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
