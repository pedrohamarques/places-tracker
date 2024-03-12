import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type RoutesParams, StackRoutes } from '@routes/types';

export function useAllPlacesScreen() {
   const navigation = useNavigation<NativeStackNavigationProp<RoutesParams>>();

   function headerButtonHandler() {
      navigation.navigate(StackRoutes.ADD_PLACES);
   }

   return {
      headerButtonHandler,
   };
}
