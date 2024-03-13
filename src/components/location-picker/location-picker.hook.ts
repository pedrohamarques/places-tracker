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

import { useRequests } from '@services/requests';

import type { FullLocationProps } from '@typings/data';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type RoutesParams, StackRoutes } from '@routes/types';

type useLocationPickerProps = {
   onLocation: (location: FullLocationProps) => void;
};

export function useLocationPicker({ onLocation }: useLocationPickerProps) {
   const isFocused = useIsFocused();
   const [locationPermissionInformation, requestPermission] =
      useForegroundPermissions();

   const [pickedLocation, setPickedLocation] =
      useState<FullLocationProps | null>(null);

   const navigation = useNavigation<NativeStackNavigationProp<RoutesParams>>();
   const route = useRoute<RouteProp<RoutesParams, StackRoutes.ADD_PLACES>>();

   const { getAddress } = useRequests();

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
            'Insufficient Permissions!',
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
      async function handleLocation() {
         if (pickedLocation) {
            const address = await getAddress(
               pickedLocation.lat,
               pickedLocation.lng,
            );
            onLocation({ ...pickedLocation, address });
         }
      }
      handleLocation();
   }, [pickedLocation, onLocation]);

   return {
      getLocationHandler,
      pickOnMapHandler,
      pickedLocation,
   };
}
