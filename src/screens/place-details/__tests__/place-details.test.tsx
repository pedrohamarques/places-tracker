import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { PlaceDetailsScreen } from '../place-details';
import { DUMMY_PLACE } from './dummy';

const mockNavigation = {
   setOptions: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
   useNavigation: () => ({
      navigation: mockNavigation,
   }),
}));

const mockHookValues = {
   loadedPlace: DUMMY_PLACE,
   showOnMapHandler: jest.fn(),
};

const mockUsePlaceDetailsScreen = jest.fn();

jest.mock('../place-details.hook', () => ({
   usePlaceDetailsScreen: () => mockUsePlaceDetailsScreen(),
}));

describe('screens/place-details/<PlaceDetailsScreen />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
      mockUsePlaceDetailsScreen.mockReturnValue(mockHookValues);
   });

   it('renders screen properly when there is a place loaded', () => {
      render(<PlaceDetailsScreen navigation={mockNavigation} />);

      expect(screen.queryByText('Loading place data...')).toBeNull();

      expect(screen.getByTestId('screens.place-details.image')).toBeTruthy();
      expect(screen.getByText('Some address')).toBeTruthy();
      expect(screen.getByText('View On Map')).toBeTruthy();
   });

   it('renders screen properly when the place is not yet laoded', () => {
      const mockEmptyLoadedPlace = {
         ...mockHookValues,
         loadedPlace: null,
      };

      mockUsePlaceDetailsScreen.mockReturnValueOnce(mockEmptyLoadedPlace);

      render(<PlaceDetailsScreen navigation={mockNavigation} />);

      expect(screen.getByText('Loading place data...')).toBeTruthy();

      expect(screen.queryByTestId('screens.place-details.image')).toBeNull();
      expect(screen.queryByText('Some address')).toBeNull();
      expect(screen.queryByText('View On Map')).toBeNull();
   });

   it('calls showOnMapHandler when button is pressed', () => {
      render(<PlaceDetailsScreen navigation={mockNavigation} />);

      fireEvent.press(screen.getByText('View On Map'));

      expect(mockHookValues.showOnMapHandler).toHaveBeenCalledTimes(1);
   });
});
