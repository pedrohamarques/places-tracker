import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import type Place from '@models/place';
import { PlaceItem } from './components';

type PlacesListProps = {
   places: Place[];
};

export function PlacesList({ places }: PlacesListProps) {
   if (!places || places.length === 0) {
      return (
         <View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>
               No places added yet - start adding some!{' '}
            </Text>
         </View>
      );
   }

   return (
      <FlatList
         data={places}
         keyExtractor={item => item.id}
         renderItem={({ item }) => (
            <PlaceItem place={item} onSelect={() => {}} />
         )}
      />
   );
}

const styles = StyleSheet.create({
   fallbackContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   fallbackText: {
      fontSize: 16,
   },
});
