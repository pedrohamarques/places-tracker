import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IconButtonProps = {
   icon: keyof typeof Ionicons.glyphMap;
   size: number;
   color?: string;
   onPress: () => void;
   testID?: string;
};

export function IconButton({
   icon,
   size,
   color,
   onPress,
   testID = 'components.ui.icon-button',
}: IconButtonProps) {
   return (
      <Pressable
         onPress={onPress}
         testID={testID}
         style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
         <Ionicons name={icon} size={size} color={color} />
      </Pressable>
   );
}

const styles = StyleSheet.create({
   button: {
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
   },
   pressed: {
      opacity: 0.7,
   },
});
