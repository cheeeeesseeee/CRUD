export const fetchItems = async () => {
  try {
    const response = await fetch('http://10.0.2.2:5189/todo', {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response error');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const addLoanType = async (todo) => {
  try {
    const response = await fetch('http://10.0.2.2:5189/todo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error('Failed to add new todo');
    }

    return await response.json();
  } catch (error) {
    console.error('Add todo error:', error);
    throw error;
  }
};

export const deleteLoanType = async (key) => {
  try {
    const response = await fetch(`http://10.0.2.2:5189/todo/${key}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

export const updateLoanType = async (key, text) => {
  try {
    const response = await fetch(`http://10.0.2.2:5189/todo/${key}`, {
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

    return await response.json();
  } catch (error) {
    console.error('Update todo error:', error);
    throw error;
  }
};
