import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CalculatorScreen() {
    return (


        <View style={styles.outerContainer}>
            <Text>Calculator Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
