import { useCallback, useState } from 'react';

import type { FullLocationProps } from '@typings/data';
import Place from '@models/place';

type usePlaceFormProps = {
   onCreatePlace: (data: Place) => void;
};

export function usePlaceForm({ onCreatePlace }: usePlaceFormProps) {
   const [enteredTitle, setEnteredTitle] = useState('');
   const [pickedLocation, setPickedLocation] =
      useState<FullLocationProps | null>(null);
   const [pickedImage, setPickedImage] = useState('');

   function changeTitleHandler(enteredText: string) {
      setEnteredTitle(enteredText);
   }

   function savePlaceHandler() {
      const placeData = new Place(enteredTitle, pickedImage, pickedLocation);
      onCreatePlace(placeData);
   }

   function takeImageHandler(imageUri: string) {
      setPickedImage(imageUri);
   }

   const takeLocationHandler = useCallback((location: FullLocationProps) => {
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
