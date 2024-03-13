import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@constants/colors';

import { PlaceItem } from './components';

import { FetchedFormattedPlaceProps } from '@typings/data';

type PlacesListProps = {
   places: FetchedFormattedPlaceProps[];
   onSelect: (id: number) => void;
};

export function PlacesList({ places, onSelect }: PlacesListProps) {
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
         style={styles.list}
         data={places}
         keyExtractor={item => String(item.id)}
         renderItem={({ item }) => (
            <PlaceItem place={item} onSelect={() => onSelect(item.id)} />
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
      color: Colors.primary200,
   },
   list: {
      margin: 24,
   },
});
