import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import AllPlacesScreen from '@screens/all-places';
import AddPlaceScreen from '@screens/add-place';

import { Colors } from '@constants/colors';

import { StackRoutes, type RoutesParams } from './types';

const Stack = createNativeStackNavigator<RoutesParams>();

export function Routes() {
   return (
      <NavigationContainer>
         <Stack.Navigator
            screenOptions={{
               headerStyle: { backgroundColor: Colors.primary500 },
               headerTintColor: Colors.gray700,
               contentStyle: { backgroundColor: Colors.gray700 },
            }}>
            <Stack.Screen
               name={StackRoutes.ALL_PLACES}
               component={AllPlacesScreen}
               options={{
                  title: 'Your favorites places',
               }}
            />
            <Stack.Screen
               name={StackRoutes.ADD_PLACES}
               component={AddPlaceScreen}
               options={{
                  title: 'Add a new place',
               }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
