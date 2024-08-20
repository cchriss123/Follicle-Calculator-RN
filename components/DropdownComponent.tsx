import React from 'react';
import {StyleSheet, View, Text, Appearance} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAppState, DonorZone } from '@/state/Store';
import {Colors} from "@/constants/Colors";

export interface DropdownComponentProps {
  selectedZone: DonorZone | null;
  setSelectedZone: (zone: DonorZone | null) => void;
}

export function DropdownComponent({selectedZone, setSelectedZone}: DropdownComponentProps) {
  const zoneState = useAppState();
  const zones = zoneState.donorZones;
  const colorScheme = Appearance.getColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const styles = createStyles(Appearance.getColorScheme() , colors);

  function renderItem(zone: DonorZone) {
    return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{zone.name}</Text>
          {zone === selectedZone && (
              <AntDesign
                  style={styles.icon}
                  color="black"
                  name="check"
                  size={20}
              />
          )}
        </View>
    );
  }

  return (
      <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={zones}
          maxHeight={400}
          labelField="name"
          valueField="name"
          placeholder="Select zone"
          value={selectedZone}

          onChange={z => setSelectedZone(zones.find(zone => zone === z) || null)}
          renderItem={renderItem}
      />
  );
}

function createStyles(colorScheme: "light" | "dark" | null | undefined, colors: {
  primaryText: string;
  solidBackground: string;
  secondaryBlue: string;
  neutralGrey: string;
  softBackground: string;
  primaryBlue: string;
  themedGrey: string;
}) {
  return StyleSheet.create({
    dropdown: {
      borderWidth: 1,
      borderColor: colors.themedGrey,
      marginBottom: 16,
      height: 50,
      backgroundColor: colors.solidBackground,
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 5,
      width: '100%',
      elevation: 5,
    },
    icon: {
      marginRight: 5,
      color: colors.primaryText,

    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.solidBackground,
    },
    textItem: {
      flex: 1,
      fontSize: 16,
      color: colors.primaryText,
    },
    placeholderStyle: {
      fontSize: 16,
      color: colors.neutralGrey,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: colors.primaryText,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },

  });
}
