import React, { useLayoutEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';

import { useMapScreen } from './map.hook';
import { StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '@routes/types';
import { IconButton } from '@components/ui/icon-button';

type MapScreenNavigationProps = {
   navigation: Pick<NativeStackNavigationProp<RoutesParams>, 'setOptions'>;
};

export function MapScreen({ navigation }: MapScreenNavigationProps) {
   const {
      region,
      selectedLocation,
      selectLocationHandler,
      savePickedLocationHandler,
      initialLocation,
   } = useMapScreen();

   useLayoutEffect(() => {
      if (initialLocation) {
         return;
      }
      navigation.setOptions({
         headerRight: ({ tintColor }) => (
            <IconButton
               icon='save'
               size={24}
               color={tintColor}
               onPress={savePickedLocationHandler}
            />
         ),
      });
   }, [navigation, savePickedLocationHandler, initialLocation]);

   return (
      <MapView
         initialRegion={region}
         style={styles.map}
         onPress={selectLocationHandler}>
         {selectedLocation && (
            <Marker
               title='Picked location'
               coordinate={{
                  latitude: selectedLocation.lat,
                  longitude: selectedLocation.lng,
               }}
            />
         )}
      </MapView>
   );
}

const styles = StyleSheet.create({
   map: {
      flex: 1,
   },
});
