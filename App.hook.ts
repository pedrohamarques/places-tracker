import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { useDatabaseServices } from '@services/database';

SplashScreen.preventAutoHideAsync();

export function useApp() {
   const [appIsReady, setAppIsReady] = useState(false);
   const { init } = useDatabaseServices();

   useEffect(() => {
      init()
         .then(() => {
            setAppIsReady(true);
         })
         .catch(error => console.log(error));
   }, []);

   useEffect(() => {
      async function setReady() {
         if (appIsReady) {
            await SplashScreen.hideAsync();
         }
      }
      setReady();
   }, [appIsReady]);

   return {
      appIsReady,
   };
}
