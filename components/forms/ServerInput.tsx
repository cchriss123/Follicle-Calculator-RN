import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import FormStyles from "@/components/forms/styles/FormStyles";
import {useAppState} from '@/state/Store';
import BottomSheet from "@gorhom/bottom-sheet";


interface ServerInputProps {
    bottomSheetRef: React.RefObject<BottomSheet>;
}

function ServerInput({bottomSheetRef}: ServerInputProps) {
    const [inputIp, setInputIp] = useState('');
    const [message, setMessage] = useState('');
    const {styles, theme} = FormStyles();
    const globalState = useAppState();

    useEffect(() => {
        setInputIp(globalState.ip || '');
    }, [globalState.ip]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    function editZoneSubmit() {
        globalState.saveIp(inputIp);
        setMessage('New IP saved');
        bottomSheetRef.current?.close();
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Server IP"
                mode="outlined"
                value={inputIp}
                onChangeText={setInputIp}
                placeholder="Enter new IP"
                style={styles.input}
                theme={theme}
            />

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity
                    style={styles.button} onPress={editZoneSubmit}>
                    <Text style={styles.buttonTitle}>Save IP</Text>
                </TouchableOpacity>
            </View>

            {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
    );
}

export default ServerInput;
