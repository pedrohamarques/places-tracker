import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
   PermissionStatus,
   getCurrentPositionAsync,
   useForegroundPermissions,
} from 'expo-location';

import type { Location } from '@typings/data';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type RoutesParams, StackRoutes } from '@routes/types';

export function useLocationPicker() {
   const [locationPermissionInformation, requestPermission] =
      useForegroundPermissions();

   const [pickedLocation, setPickedLocation] = useState<Location | null>(null);

   const navigation = useNavigation<NativeStackNavigationProp<RoutesParams>>();

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

   return {
      getLocationHandler,
      pickOnMapHandler,
      pickedLocation,
   };
}
