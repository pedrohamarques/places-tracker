import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { usePlaceForm } from './place-form.hook';
import { Colors } from '@constants/colors';

export function PlaceForm() {
   const { changeTitleHandler, enteredTitle } = usePlaceForm();
   return (
      <ScrollView style={styles.form}>
         <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
               onChangeText={event => changeTitleHandler(event)}
               value={enteredTitle}
               style={styles.input}
            />
         </View>
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
