import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@constants/colors';

import { OutlineButton } from '@components/ui/outline-button';

import { useImagePicker } from './image-picker.hook';

export function ImagePicker() {
   const { takeImageHandler, pickedImage } = useImagePicker();
   return (
      <View>
         <View style={styles.imagePreview}>
            {pickedImage ? (
               <Image source={{ uri: pickedImage }} style={styles.image} />
            ) : (
               <Text> No image taken yet.</Text>
            )}
         </View>
         <OutlineButton icon='camera' onPress={takeImageHandler}>
            Take Image
         </OutlineButton>
      </View>
   );
}

const styles = StyleSheet.create({
   imagePreview: {
      width: '100%',
      height: 200,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary100,
      borderRadius: 4,
   },
   image: {
      width: '100%',
      height: 200,
   },
});
