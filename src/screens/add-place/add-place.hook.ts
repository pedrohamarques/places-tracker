import { useNavigation } from '@react-navigation/native';

import { useDatabaseServices } from '@services/database';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackRoutes, type RoutesParams } from '@routes/types';
import type Place from '@models/place';

export function useAddPlaceScreen() {
   const navigation = useNavigation<NativeStackNavigationProp<RoutesParams>>();
   const { insertPlace } = useDatabaseServices();

   async function createPlaceHandler(place: Place) {
      await insertPlace(place);
      navigation.navigate(StackRoutes.ALL_PLACES);
   }

   return {
      createPlaceHandler,
   };
}
