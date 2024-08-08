import React, { useState, useRef, useEffect } from 'react';
import {Appearance, StyleSheet, Text, TouchableOpacity, View, FlatList, Image} from 'react-native';
import { Colors } from '@/constants/Colors';
import Icon from "react-native-vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import { useAppState, Zone, DonorZone, RecipientZone } from "@/state/Store";
import AddZone from "@/components/forms/AddZone";
import EditDonorZone from "@/components/forms/EditZone";
import logoImg from '@/assets/images/logo.png';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ResetButton from "@/components/ResetButton";
import ServerInput from "@/components/forms/ServerInput";

//TODO fix area styling on calculator screen
//TODO style calculator pdf
//TODO go over colour themes
Appearance.getColorScheme = () => 'light';

export default function ZonesScreen() {
    const colorScheme = Appearance.getColorScheme();
    const styles = createStyles(colorScheme);
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const globalState = useAppState();
    const [menuVisible, setMenuVisible] = useState(false);
    const [wheelMenuVisible, setWheelMenuVisible] = useState(false);
    const donorZones = globalState.donorZones;
    const recipientZones = globalState.recipientZones;
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const bottomSheetRefs = {
        addDonor: useRef<BottomSheet>(null),
        addRecipient: useRef<BottomSheet>(null),
        editDonor: useRef<BottomSheet>(null),
        editRecipient: useRef<BottomSheet>(null),
        wheel: useRef<BottomSheet>(null),
    };

    useEffect(() => {
        if (!menuVisible) setSelectedZone(null);
    }, [menuVisible]);
    
    function openMenu(ref: React.RefObject<BottomSheet>, zone: Zone | null = null) {
        setSelectedZone(zone);
        ref.current?.expand();
        ref.current?.snapToIndex(1);
    }


    function handleMenuPress() {
        if (wheelMenuVisible) {
            setWheelMenuVisible(false);
            bottomSheetRefs.wheel.current?.close();
        } else {
            setWheelMenuVisible(true);
            bottomSheetRefs.wheel.current?.expand();
            bottomSheetRefs.wheel.current?.snapToIndex(2);
        }
    }



    function renderZoneItem({ item }: { item: Zone }, ref: React.RefObject<BottomSheet>) {
        return (
            <TouchableOpacity
                style={styles.zoneButton}
                onPress={() => openMenu(ref, item)}
            >
                <Text style={styles.zoneButtonText}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{ flex: 1, paddingTop: 70}}>
            <View style={styles.topContainer}>
                <View style={styles.placeholderContainer} />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Image source={logoImg} style={styles.logo} />
                </View>
                <TouchableOpacity
                    style={styles.placeholderContainer}
                    onPress={() => handleMenuPress()}
                >
                    <FontAwesome gear="setting" size={35} color={wheelMenuVisible ? colors.primaryBlue : colors.neutralGrey} name="gear" />
                </TouchableOpacity>
            </View>



                <View style={styles.buttonWrapper}>
                    <View style={styles.buttonContainer}>

                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => openMenu(bottomSheetRefs.addDonor)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Add Donor Zones</Text>
                        </View>

                        <FlatList
                            data={donorZones}
                            renderItem={(item) => renderZoneItem(item, bottomSheetRefs.editDonor)}
                            style={styles.flatList}
                            contentContainerStyle={styles.flatListContent}
                        />

                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={() => openMenu(bottomSheetRefs.addRecipient)}>
                                <Icon name="add-circle" size={65} color={colors.primaryBlue} />
                            </TouchableOpacity>
                            <Text style={styles.zoneListTitle}>Add Recipient Zones</Text>
                        </View>
                        <FlatList
                            data={recipientZones}
                            renderItem={(item) => renderZoneItem(item, bottomSheetRefs.editRecipient)}
                            style={styles.flatList}
                            contentContainerStyle={styles.flatListContent}
                        />
                    </View>
                </View>


            <CustomBottomSheet ref={bottomSheetRefs.wheel} menuVisible={wheelMenuVisible} setMenuVisible={setWheelMenuVisible}>
                <ServerInput />
                <ResetButton />
            </CustomBottomSheet>



            <CustomBottomSheet ref={bottomSheetRefs.addDonor} menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
                <AddZone zones={donorZones} zoneType={'donor'} />
            </CustomBottomSheet>

            <CustomBottomSheet ref={bottomSheetRefs.addRecipient} menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
                <AddZone zones={recipientZones} zoneType={'recipient'} />
            </CustomBottomSheet>

            <CustomBottomSheet ref={bottomSheetRefs.editDonor} menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
                <EditDonorZone zone={selectedZone as DonorZone} zones={donorZones} />
            </CustomBottomSheet>

            <CustomBottomSheet ref={bottomSheetRefs.editRecipient} menuVisible={menuVisible} setMenuVisible={setMenuVisible}>
                <EditDonorZone zone={selectedZone as RecipientZone} zones={recipientZones} />
            </CustomBottomSheet>
        </View>

    );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return StyleSheet.create({
        buttonReset: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: colors.primaryBlue,
            borderRadius: 8,
            width: '40%',
        },
        buttonText: {
            color: 'white',
            fontSize: 16,
            marginLeft: 8,
        },


        buttonWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
            flex: 1,
            borderTopWidth: 1,
            borderColor: 'lightgrey',
        },
        buttonContainer: {
            flex: 1,
            marginHorizontal: 10,
        },
        button: {
            padding: 10,
            backgroundColor: colors.solidBackground,
            borderRadius: 8,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            alignItems: 'center',
        },
        zoneListTitle: {
            fontSize: 14,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.primaryText,
        },
        zoneButton: {
            marginVertical: 5,
            height: 50,
            padding: 10,
            backgroundColor: colors.primaryBlue,
            borderRadius: 8,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        zoneButtonText: {
            color: colors.solidBackground,
        },
        flatList: {
            flex: 1,
        },
        flatListContent: {
            paddingBottom: 10,
        },
        topContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 60,
            width: '100%',
            paddingBottom: '5%',
            marginTop: 10,

        },
        placeholderContainer: {
            width: 58.5,
        },
        logo: {
            width: 35,
            height: 35,
            resizeMode: 'contain',
        },


    });
}

