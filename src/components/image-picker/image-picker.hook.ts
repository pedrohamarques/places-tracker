import {
   launchCameraAsync,
   useCameraPermissions,
   PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';

export function useImagePicker() {
   const [cameraPermissionInformation, requestPermission] =
      useCameraPermissions();
   const [pickedImage, setPickedImage] = useState<string | null>(null);

   async function verifyPermissionHandler() {
      if (
         cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED
      ) {
         const permissionResponse = await requestPermission();
         return permissionResponse.granted;
      } else if (
         cameraPermissionInformation?.status === PermissionStatus.DENIED
      ) {
         Alert.alert(
            'Insufficient Permissions!',
            'You need to grant camera permission to use this app.',
         );
         return false;
      }
      return true;
   }

   async function takeImageHandler() {
      const hasPermission = await verifyPermissionHandler();

      if (!hasPermission) {
         return;
      }

      const image = await launchCameraAsync({
         allowsEditing: true,
         aspect: [16, 9],
         quality: 0.5,
      });

      setPickedImage(image.assets![0].uri);
   }

   return {
      takeImageHandler,
      pickedImage,
   };
}
