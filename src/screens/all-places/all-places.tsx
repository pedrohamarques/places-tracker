import React, { useLayoutEffect } from 'react';
import { PlacesList } from '@components/places-list';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RoutesParams } from '@routes/types';
import { IconButton } from '@components/ui/icon-button';
import { useAllPlacesScreen } from './all-places.hook';

type AllPlacesScreenNavigationProps = {
   navigation: Pick<NativeStackNavigationProp<RoutesParams>, 'setOptions'>;
};

export function AllPlacesScreen({
   navigation,
}: AllPlacesScreenNavigationProps) {
   const { headerButtonHandler, placeSelectHandler, loadedPlaces } =
      useAllPlacesScreen();

   useLayoutEffect(() => {
      navigation.setOptions({
         headerRight: ({ tintColor }) => (
            <IconButton
               size={24}
               icon='add'
               color={tintColor}
               onPress={headerButtonHandler}
            />
         ),
      });
   }, []);

   return <PlacesList places={loadedPlaces} onSelect={placeSelectHandler} />;
}
