import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type Place from '@models/place';

type PlaceItemProps = {
   place: Place;
   onSelect: () => void;
};

export function PlaceItem({ place, onSelect }: PlaceItemProps) {
   return (
      <Pressable onPress={onSelect}>
         <Image source={{ uri: place.imageUri }} />
         <View>
            <Text>{place.title}</Text>
            <Text>{place.address}</Text>
         </View>
      </Pressable>
   );
}

const styles = StyleSheet.create({});
