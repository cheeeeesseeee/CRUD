import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function AddTodo({ onAdd }) {
    const [newTodo, setNewTodo] = useState('');
    const [error, setError] = useState(null);

    const changeHandler = (val) => {
        setNewTodo(val);
    }

    const handleAddTodo = async () => {
        try {
            const todo = { text: newTodo};  
            console.log("Sending payload:", JSON.stringify(todo));
            const response = await fetch('http://10.0.2.2:5189/todo', {  
                method: 'POST',  
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',  
                },
                body: JSON.stringify(todo),  
            });
    
            if (!response.ok) {
                throw new Error('Failed to add todo');
            }
    
            const addedTodo = await response.json(); 
            onAdd(addedTodo);  
            setNewTodo('');  
        } catch (error) {
            console.error('Add todo error:', error);
            setError(error.message);
        }
    };
    
      
    return (
        <View>
            <TextInput 
                style={styles.input}
                value={newTodo}
                placeholder='New Loan Type'
                onChangeText={changeHandler}
            />
            <Button onPress={handleAddTodo} title='Add Loan Type' color='#556B2F' />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    }
});
