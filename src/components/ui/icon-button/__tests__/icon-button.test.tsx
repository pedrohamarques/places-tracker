import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Ionicons } from '@expo/vector-icons';

import { IconButton } from '../icon-button';

const mockValues = {
   onPress: jest.fn(),
   size: 24,
   icon: 'star' as keyof typeof Ionicons.glyphMap,
};

describe('components/ui/icon-button/<IconButton />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('renders component properly', () => {
      render(<IconButton {...mockValues} />);

      expect(
         screen.getByTestId('components.ui.icon-button.pressable'),
      ).toBeTruthy();
   });

   it('calls onPress function when component is pressed', () => {
      render(<IconButton {...mockValues} />);

      fireEvent.press(
         screen.getByTestId('components.ui.icon-button.pressable'),
      );

      expect(mockValues.onPress).toHaveBeenCalledTimes(1);
   });
});
