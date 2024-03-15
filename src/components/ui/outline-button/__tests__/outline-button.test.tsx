import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Ionicons } from '@expo/vector-icons';

import { OutlineButton } from '../outline-button';

const mockValues = {
   onPress: jest.fn(),
   icon: 'star' as keyof typeof Ionicons.glyphMap,
};

describe('components/ui/outline-button/<OutlineButton />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('renders component properly', () => {
      render(
         <OutlineButton {...mockValues}>
            <Text>Teste</Text>
         </OutlineButton>,
      );

      expect(
         screen.getByTestId('components.ui.outline-button.pressable'),
      ).toBeTruthy();
      expect(screen.getByText('Teste')).toBeTruthy();
   });

   it('calls onPress function when component is pressed', () => {
      render(
         <OutlineButton {...mockValues}>
            <Text>Teste</Text>
         </OutlineButton>,
      );

      fireEvent.press(
         screen.getByTestId('components.ui.outline-button.pressable'),
      );

      expect(mockValues.onPress).toHaveBeenCalledTimes(1);
   });
});
