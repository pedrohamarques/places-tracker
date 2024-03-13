import { useEffect, useState } from 'react';
import {
   RouteProp,
   useIsFocused,
   useNavigation,
   useRoute,
} from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type RoutesParams, StackRoutes } from '@routes/types';
import Place from '@models/place';

export function useAllPlacesScreen() {
   const isFocused = useIsFocused();
   const navigation = useNavigation<NativeStackNavigationProp<RoutesParams>>();
   const route = useRoute<RouteProp<RoutesParams, StackRoutes.ALL_PLACES>>();

   const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

   function headerButtonHandler() {
      navigation.navigate(StackRoutes.ADD_PLACES);
   }

   useEffect(() => {
      if (isFocused && route.params) {
         setLoadedPlaces(currentPlaces => [
            ...currentPlaces,
            route.params.place,
         ]);
      }
   }, [isFocused, route]);

   return {
      headerButtonHandler,
      loadedPlaces,
   };
}
