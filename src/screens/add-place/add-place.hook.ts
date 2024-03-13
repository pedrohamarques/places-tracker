import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackRoutes, type RoutesParams } from '@routes/types';
import type Place from '@models/place';

export function useAddPlaceScreen() {
   const navigation = useNavigation<NativeStackNavigationProp<RoutesParams>>();
   function createPlaceHandler(place: Place) {
      navigation.navigate(StackRoutes.ALL_PLACES, { place });
   }

   return {
      createPlaceHandler,
   };
}
