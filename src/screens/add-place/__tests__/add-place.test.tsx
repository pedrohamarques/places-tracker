import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { AddPlaceScreen } from '../add-place';

jest.mock('@react-navigation/native', () => ({
   useNavigation: jest.fn(),
   useIsFocused: jest.fn(),
   useRoute: jest.fn(),
}));

describe('screens/add-place/<AddPlaceScreen />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('renders screen properly', () => {
      render(<AddPlaceScreen />);

      expect(screen.getByTestId('screens.add-place.place-form')).toBeTruthy();
   });
});
