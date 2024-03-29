import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { OutlineButton } from '@components/ui/outline-button';

import { Colors } from '@constants/colors';

import { useLocationPicker } from './location-picker.hook';

import type { FullLocationProps } from '@typings/data';

type LocationPickerProps = {
   onLocation: (location: FullLocationProps) => void;
   testID?: string;
};

export function LocationPicker({
   onLocation,
   testID = 'components.location-picker',
}: LocationPickerProps) {
   const { getLocationHandler, pickOnMapHandler, pickedLocation } =
      useLocationPicker({ onLocation });

   const DELTA_VARIATION = 0.005;

   return (
      <View testID={testID}>
         <View style={styles.mapPreview}>
            {pickedLocation ? (
               <>
                  <MapView
                     style={styles.map}
                     region={{
                        latitude: pickedLocation.lat,
                        longitude: pickedLocation.lng,
                        latitudeDelta: DELTA_VARIATION,
                        longitudeDelta: DELTA_VARIATION,
                     }}
                     zoomEnabled={false}
                     rotateEnabled={false}
                     scrollEnabled={false}
                     testID='components.location-picker.map-view'>
                     <Marker
                        coordinate={{
                           latitude: pickedLocation.lat,
                           longitude: pickedLocation.lng,
                        }}
                     />
                  </MapView>
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
   map: {
      width: '100%',
      height: 200,
   },
});
