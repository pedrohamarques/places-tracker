import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { OutlineButton } from '@components/ui/outline-button';

import { Colors } from '@constants/colors';

import { useLocationPicker } from './location-picker.hook';
import { formatCoordinate } from '@utils/location';

export function LocationPicker() {
   const { getLocationHandler, pickOnMapHandler, pickedLocation } =
      useLocationPicker();
   return (
      <View>
         <View style={styles.mapPreview}>
            {pickedLocation ? (
               <>
                  <Text>Latitude: {formatCoordinate(pickedLocation).lat}</Text>
                  <Text>Longitude: {formatCoordinate(pickedLocation).lng}</Text>
               </>
            ) : (
               <Text>No location saved yet.</Text>
            )}
         </View>
         <View style={styles.actions}>
            <OutlineButton icon='location' onPress={getLocationHandler}>
               Locate User
            </OutlineButton>
            <OutlineButton icon='map' onPress={pickOnMapHandler}>
               Pick on map
            </OutlineButton>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   mapPreview: {
      width: '100%',
      height: 200,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary100,
      borderRadius: 4,
   },
   actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
   },
});
