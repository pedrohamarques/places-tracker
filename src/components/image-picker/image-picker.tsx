import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@constants/colors';

import { OutlineButton } from '@components/ui/outline-button';

import { useImagePicker } from './image-picker.hook';

type ImagePickerProps = {
   onImage: (imageUri: string) => void;
   testID?: string;
};

export function ImagePicker({
   onImage,
   testID = 'components.image-picker',
}: ImagePickerProps) {
   const { takeImageHandler, pickedImage } = useImagePicker({ onImage });
   return (
      <View testID={testID}>
         <View style={styles.imagePreview}>
            {pickedImage ? (
               <Image
                  source={{ uri: pickedImage }}
                  style={styles.image}
                  testID='components.image-picker.Image'
               />
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
