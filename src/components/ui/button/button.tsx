import { Colors } from '@constants/colors';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonProps = React.PropsWithChildren & {
   onPress: () => void;
   testID?: string;
};

export function Button({
   onPress,
   children,
   testID = 'components.ui.button',
}: ButtonProps) {
   return (
      <Pressable
         onPress={onPress}
         testID={testID}
         style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
         <Text style={styles.text}>{children}</Text>
      </Pressable>
   );
}

const styles = StyleSheet.create({
   button: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      margin: 4,
      backgroundColor: Colors.primary800,
      elevation: 2,
      shadowColor: 'black',
      shadowOpacity: 0.15,
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 2,
      borderRadius: 4,
   },
   pressed: {
      opacity: 0.7,
   },
   text: {
      textAlign: 'center',
      fontSize: 16,
      color: Colors.primary50,
   },
});
