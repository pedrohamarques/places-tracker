import React, { useLayoutEffect } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';

import { OutlineButton } from '@components/ui/outline-button';

import { Colors } from '@constants/colors';

import { usePlaceDetailsScreen } from './place-details.hook';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RoutesParams } from '@routes/types';

type PlaceDetailsScreenNavigationProps = {
   navigation: Pick<NativeStackNavigationProp<RoutesParams>, 'setOptions'>;
};

export function PlaceDetailsScreen({
   navigation,
}: PlaceDetailsScreenNavigationProps) {
   const { showOnMapHandler, loadedPlace } = usePlaceDetailsScreen();

   useLayoutEffect(() => {
      navigation.setOptions({
         title: loadedPlace?.title,
      });
   }, [navigation, loadedPlace]);

   if (!loadedPlace) {
      return (
         <View style={styles.fallback}>
            <Text>Loading place data...</Text>
         </View>
      );
   }

   return (
      <ScrollView>
         <Image
            style={styles.image}
            source={{ uri: loadedPlace.imageUri }}
            testID='screens.place-details.image'
         />
         <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
               <Text style={styles.address}>{loadedPlace?.address}</Text>
            </View>
            <OutlineButton icon='map' onPress={showOnMapHandler}>
               View On Map
            </OutlineButton>
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   image: {
      height: '35%',
      minHeight: 300,
      width: '100%',
   },
   locationContainer: {
      justifyContent: 'center',
      alignItems: 'center',
   },
   addressContainer: {
      padding: 20,
   },
   address: {
      color: Colors.primary500,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
   },
   fallback: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
});
