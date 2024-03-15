import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@constants/colors';

type OutlineButtonProps = React.PropsWithChildren & {
   onPress: () => void;
   icon: keyof typeof Ionicons.glyphMap;
   testID?: string;
};

export function OutlineButton({
   onPress,
   icon,
   children,
   testID = 'components.ui.outline-button',
}: OutlineButtonProps) {
   return (
      <Pressable
         onPress={onPress}
         style={({ pressed }) => [styles.button, pressed && styles.pressed]}
         testID={`${testID}.pressable`}>
         <Ionicons
            name={icon}
            size={18}
            color={Colors.primary500}
            style={styles.icon}
         />
         <Text style={styles.text}>{children}</Text>
      </Pressable>
   );
}

const styles = StyleSheet.create({
   button: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      margin: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors.primary500,
   },
   pressed: {
      opacity: 0.7,
   },
   icon: {
      marginRight: 6,
   },
   text: {
      color: Colors.primary500,
   },
});
