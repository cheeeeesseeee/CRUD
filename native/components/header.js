import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function header () {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>
                Loan Types
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 40,
        paddingTop: 5,
        backgroundColor: '#556B2F'
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
})