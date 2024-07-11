import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

export default function TabTwoScreen() {
    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);
    const [countThree, setCountThree] = useState(0);
    const [countTotalGraphs, setCountTotalGraphs] = useState(0);
    const [countTotalHair, setCountTotalHair] = useState(0);

    const colorScheme = useColorScheme();
    const styles = createStyles(colorScheme);

    function handlePress(value: number) {
        if (value === 1) setCountOne(countOne + 1);
        if (value === 2) setCountTwo(countTwo + 1);
        if (value === 3) setCountThree(countThree + 1);

        setCountTotalGraphs(countTotalGraphs + 1);
        setCountTotalHair(countTotalHair + value);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.titleContainer}>
                <ThemedText type="title" style={styles.customTitle}>Counter</ThemedText>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handlePress(1)}>
                    <Text style={styles.buttonText}>{`Increment 1 (${countOne})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress(2)}>
                    <Text style={styles.buttonText}>{`Increment 2 (${countTwo})`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handlePress(3)}>
                    <Text style={styles.buttonText}>{`Increment 3 (${countThree})`}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.countContainer}>
                <ThemedText style={styles.largeText}>{`Count: ${countTotalGraphs}`}</ThemedText>
                <ThemedText style={styles.smallText}>{`Total Hairs: ${countTotalHair}`}</ThemedText>
            </View>
        </SafeAreaView>
    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            paddingTop: 10,
            // backgroundColor: colors.background,
            // borderWidth: 1,
            // borderColor: colors.icon,
        },
        titleContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: colors.icon,
            height: 40,
        },
        buttonContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: colors.tint,
            paddingTop: 10,
            paddingBottom: 10,
        },
        button: {
            borderRadius: 10,
            margin: 15,
            width: '90%',
            borderWidth: 1,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.tint,
            // borderColor: colors.icon,
        },

        buttonText: {
            color: colors.background,
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        countContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: colors.icon,
            height: 120,
        },
        customTitle: {
            fontSize: 30,
        },
        largeText: {
            fontSize: 50,
            paddingTop: 30,
            marginTop: 20,
            marginBottom: 5,
            color: colors.text,
            fontWeight: 'bold',

        },
        smallText: {
            fontSize: 20,
            marginBottom: 20,
            color: colors.text,
        },
    });
}
