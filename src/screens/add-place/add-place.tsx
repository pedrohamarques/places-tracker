import React from 'react';
import { PlaceForm } from '@components/place-form';

import { useAddPlaceScreen } from './add-place.hook';

export function AddPlaceScreen() {
   const { createPlaceHandler } = useAddPlaceScreen();

   return (
      <PlaceForm
         onCreatePlace={createPlaceHandler}
         testID='screens.add-place.place-form'
      />
   );
}
