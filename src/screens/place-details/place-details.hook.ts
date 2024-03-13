import { useEffect, useState } from 'react';

import { useDatabaseServices } from '@services/database';

import {
   type RouteProp,
   useNavigation,
   useRoute,
} from '@react-navigation/native';

import { type RoutesParams, StackRoutes } from '@routes/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { PlaceDetailsProps } from '@typings/data';

export function usePlaceDetailsScreen() {
   const route = useRoute<RouteProp<RoutesParams, StackRoutes.PLACE_DETAILS>>();
   const navigation = useNavigation<NativeStackNavigationProp<RoutesParams>>();
   const [loadedPlace, setLoadedPlace] = useState<PlaceDetailsProps | null>(
      null,
   );

   const { fetchPlaceDetails } = useDatabaseServices();

   const selectedPlaceId = route.params.placeId;

   useEffect(() => {
      async function loadPlace() {
         const place = await fetchPlaceDetails(selectedPlaceId);
         setLoadedPlace(place);
      }
      loadPlace();
   }, [selectedPlaceId]);

   function showOnMapHandler() {
      if (loadedPlace) {
         navigation.navigate(StackRoutes.MAP, {
            initialLat: loadedPlace.lat,
            initialLng: loadedPlace.Lng,
         });
      }
   }
   return {
      showOnMapHandler,
      loadedPlace,
   };
}
