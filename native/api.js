import axios from 'axios';

const API_URL = 'http://localhost:5189/todo'; 

export const deleteTodo = async (key) => {
  try {
    const response = await axios.delete(`${API_URL}/${key}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};