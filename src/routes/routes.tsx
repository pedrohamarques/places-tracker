import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import AllPlacesScreen from '@screens/all-places';
import AddPlaceScreen from '@screens/add-place';

import { StackRoutes, type RoutesParams } from './types';

const Stack = createNativeStackNavigator<RoutesParams>();

export function Routes() {
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen
               name={StackRoutes.ALL_PLACES}
               component={AllPlacesScreen}
            />
            <Stack.Screen
               name={StackRoutes.ADD_PLACES}
               component={AddPlaceScreen}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
