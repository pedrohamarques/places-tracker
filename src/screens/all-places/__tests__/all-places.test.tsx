import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { AllPlacesScreen } from '../all-places';

const mockNavigation = {
   setOptions: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
   useNavigation: jest.fn(),
   useIsFocused: jest.fn(),
}));

describe('screens/all-places/<AllPlacesScreen />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('renders screen properly', () => {
      render(<AllPlacesScreen navigation={mockNavigation} />);

      expect(
         screen.getByText('No places added yet - start adding some!'),
      ).toBeTruthy();
   });
});
