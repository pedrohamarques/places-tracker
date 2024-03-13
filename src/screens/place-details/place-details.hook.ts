import { RouteProp, useRoute } from '@react-navigation/native';
import { RoutesParams, StackRoutes } from '@routes/types';
import { useDatabaseServices } from '@services/database';
import { PlaceDetailsProps } from '@typings/data';
import { useEffect, useState } from 'react';

export function usePlaceDetailsScreen() {
   const route = useRoute<RouteProp<RoutesParams, StackRoutes.PLACE_DETAILS>>();
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

   function showOnMapHandler() {}
   return {
      showOnMapHandler,
      loadedPlace,
   };
}
