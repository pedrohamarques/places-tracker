import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Routes } from '@routes/routes';

import { useApp } from 'App.hook';

export default function App() {
   const { appIsReady } = useApp();

   if (!appIsReady) {
      return null;
   }

   return (
      <>
         <StatusBar style='auto' />
         <Routes />
      </>
   );
}
