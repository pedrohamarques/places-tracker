import { useCallback, useState } from 'react';

import type { Location } from '@typings/data';

export function usePlaceForm() {
   const [enteredTitle, setEnteredTitle] = useState('');
   const [pickedLocation, setPickedLocation] = useState<Location | null>(null);
   const [pickedImage, setPickedImage] = useState('');

   function changeTitleHandler(enteredText: string) {
      setEnteredTitle(enteredText);
   }

   function savePlaceHandler() {
      console.log(enteredTitle);
      console.log(pickedImage);
      console.log(pickedLocation);
   }

   function takeImageHandler(imageUri: string) {
      setPickedImage(imageUri);
   }

   const takeLocationHandler = useCallback((location: Location) => {
      setPickedLocation(location);
   }, []);

   return {
      changeTitleHandler,
      savePlaceHandler,
      takeImageHandler,
      takeLocationHandler,
      enteredTitle,
   };
}
