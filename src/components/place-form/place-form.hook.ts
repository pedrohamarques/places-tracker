import { useState } from 'react';

export function usePlaceForm() {
   const [enteredTitle, setEnteredTitle] = useState('');

   function changeTitleHandler(enteredText: string) {
      setEnteredTitle(enteredText);
   }

   return {
      changeTitleHandler,
      enteredTitle,
   };
}
