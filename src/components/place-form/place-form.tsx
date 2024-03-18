import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '@constants/colors';

import { ImagePicker } from '@components/image-picker';
import { LocationPicker } from '@components/location-picker';
import { Button } from '@components/ui/button';

import { usePlaceForm } from './place-form.hook';

import type Place from '@models/place';

type PlaceFormProps = {
   onCreatePlace: (data: Place) => void;
   testID?: string;
};

export function PlaceForm({
   onCreatePlace,
   testID = 'components.place-form',
}: PlaceFormProps) {
   const {
      changeTitleHandler,
      enteredTitle,
      takeImageHandler,
      takeLocationHandler,
      savePlaceHandler,
   } = usePlaceForm({ onCreatePlace });
   return (
      <ScrollView style={styles.form} testID={testID}>
         <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
               onChangeText={event => changeTitleHandler(event)}
               value={enteredTitle}
               style={styles.input}
               testID='components.place-form.text-input'
            />
         </View>
         <ImagePicker
            onImage={takeImageHandler}
            testID='components.place-form.image-picker'
         />
         <LocationPicker
            onLocation={takeLocationHandler}
            testID='components.place-form.location-picker'
         />
         <Button onPress={savePlaceHandler}>Add Place</Button>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   form: {
      flex: 1,
      padding: 24,
   },
   label: {
      fontWeight: 'bold',
      marginBottom: 4,
      color: Colors.primary500,
   },
   input: {
      marginVertical: 8,
      paddingHorizontal: 4,
      paddingVertical: 8,
      fontSize: 16,
      borderBottomColor: Colors.primary700,
      borderBottomWidth: 2,
      backgroundColor: Colors.primary100,
   },
});
