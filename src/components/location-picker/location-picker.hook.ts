import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
   RouteProp,
   useNavigation,
   useRoute,
   useIsFocused,
} from '@react-navigation/native';
import {
   PermissionStatus,
   getCurrentPositionAsync,
   useForegroundPermissions,
} from 'expo-location';

import type { Location } from '@typings/data';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type RoutesParams, StackRoutes } from '@routes/types';

type useLocationPickerProps = {
   onLocation: (location: Location) => void;
};

export function useLocationPicker({ onLocation }: useLocationPickerProps) {
   const isFocused = useIsFocused();
   const [locationPermissionInformation, requestPermission] =
      useForegroundPermissions();

   const [pickedLocation, setPickedLocation] = useState<Location | null>(null);

   const navigation = useNavigation<NativeStackNavigationProp<RoutesParams>>();
   const route = useRoute<RouteProp<RoutesParams, StackRoutes.ADD_PLACES>>();

   async function verifyPermissions() {
      if (
         locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
      ) {
         const permissionResponse = await requestPermission();

         return permissionResponse.granted;
      } else if (
         locationPermissionInformation?.status === PermissionStatus.DENIED
      ) {
         Alert.alert(
            'Insufficient Permissiones!',
            'You need to grant location permission to use this app.',
         );
         return false;
      }
      return true;
   }

   async function getLocationHandler() {
      const hasPermission = await verifyPermissions();

      if (!hasPermission) {
         return;
      }
      const location = await getCurrentPositionAsync();

      setPickedLocation({
         lat: location.coords.latitude,
         lng: location.coords.longitude,
      });
   }

   function pickOnMapHandler() {
      navigation.navigate(StackRoutes.MAP);
   }

   useEffect(() => {
      if (isFocused && route.params) {
         const mapPickedLocation = {
            lat: route.params.pickedLat,
            lng: route.params.pickedLng,
         };
         setPickedLocation(mapPickedLocation);
      }
   }, [route, isFocused]);

   useEffect(() => {
      if (pickedLocation) {
         onLocation(pickedLocation);
      }
   }, [pickedLocation, onLocation]);

   return {
      getLocationHandler,
      pickOnMapHandler,
      pickedLocation,
   };
}
