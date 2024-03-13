import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import { useImagePicker } from './image-picker.hook';
import { Colors } from '@constants/colors';

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
         <Button title='Take Image' onPress={takeImageHandler} />
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
