import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { useDatabaseServices } from '@services/database';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type RoutesParams, StackRoutes } from '@routes/types';
import { FetchedFormattedPlaceProps } from '@typings/data';

export function useAllPlacesScreen() {
   const isFocused = useIsFocused();
   const navigation = useNavigation<NativeStackNavigationProp<RoutesParams>>();

   const { fetchPlaces } = useDatabaseServices();

   const [loadedPlaces, setLoadedPlaces] = useState<
      FetchedFormattedPlaceProps[]
   >([]);

   function headerButtonHandler() {
      navigation.navigate(StackRoutes.ADD_PLACES);
   }

   function placeSelectHandler(id: number) {
      navigation.navigate(StackRoutes.PLACE_DETAILS, { placeId: id });
   }

   useEffect(() => {
      async function loadPlaces() {
         const places = await fetchPlaces();
         setLoadedPlaces(places);
      }

      if (isFocused) {
         loadPlaces();
      }
   }, [isFocused]);

   return {
      headerButtonHandler,
      placeSelectHandler,
      loadedPlaces,
   };
}
