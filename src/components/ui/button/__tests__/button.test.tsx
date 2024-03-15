import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '../button';

const mockValues = {
   onPress: jest.fn(),
   icon: 'star' as keyof typeof Ionicons.glyphMap,
};

describe('components/ui/button/<Button />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('renders component properly', () => {
      render(
         <Button {...mockValues}>
            <Text>Teste</Text>
         </Button>,
      );

      expect(screen.getByTestId('components.ui.button.pressable')).toBeTruthy();
      expect(screen.getByText('Teste')).toBeTruthy();
   });

   it('calls onPress function when component is pressed', () => {
      render(
         <Button {...mockValues}>
            <Text>Teste</Text>
         </Button>,
      );

      fireEvent.press(screen.getByTestId('components.ui.button.pressable'));

      expect(mockValues.onPress).toHaveBeenCalledTimes(1);
   });
});
