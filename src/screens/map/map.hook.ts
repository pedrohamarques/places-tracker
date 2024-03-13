import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { MapPressEvent } from 'react-native-maps';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackRoutes, type RoutesParams } from '@routes/types';
import type { Location } from '@typings/data';

export function useMapScreen() {
   const navigation = useNavigation<NativeStackNavigationProp<RoutesParams>>();
   const [selectedLocation, setSelectedLocation] = useState<Location | null>(
      null,
   );
   const region = {
      latitude: 37.78,
      longitude: -122.43,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.042,
   };

   function selectLocationHandler({ nativeEvent }: MapPressEvent) {
      const lat = nativeEvent.coordinate.latitude;
      const lng = nativeEvent.coordinate.longitude;

      setSelectedLocation({ lat, lng });
   }

   const savePickedLocationHandler = useCallback(() => {
      if (!selectedLocation) {
         Alert.alert(
            'No location picked!',
            'You have to pick a location (by tapping on the map) first!',
         );
         return;
      }

      navigation.navigate(StackRoutes.ADD_PLACES, {
         pickedLat: selectedLocation.lat,
         pickedLng: selectedLocation.lng,
      });
   }, [navigation, selectedLocation]);

   return {
      region,
      selectLocationHandler,
      savePickedLocationHandler,
      selectedLocation,
   };
}
