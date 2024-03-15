import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { LocationPicker } from '../location-picker';

const mockValues = {
   onLocation: jest.fn(),
};

const mockHookValues = {
   pickedLocation: null,
   getLocationHandler: jest.fn(),
   pickOnMapHandler: jest.fn(),
};

const mockUseLocationPicker = jest.fn();

jest.mock('../location-picker.hook', () => ({
   useLocationPicker: () => mockUseLocationPicker(),
}));

describe('components/location-picker/<LocationPicker />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
      mockUseLocationPicker.mockReturnValue(mockHookValues);
   });

   it('renders component properly when there are no picked location', () => {
      render(<LocationPicker {...mockValues} />);

      expect(
         screen.queryByTestId('components.location-picker.map-view'),
      ).toBeNull();

      expect(screen.getByText('No location saved yet.')).toBeTruthy();
      expect(screen.getByText('Locate User')).toBeTruthy();
      expect(screen.getByText('Pick on map')).toBeTruthy();
   });

   it('renders component properly when there are a picked location', () => {
      mockUseLocationPicker.mockReturnValueOnce({
         pickedLocation: {
            lat: -4,
            lng: -4,
         },
      });

      render(<LocationPicker {...mockValues} />);

      expect(
         screen.getByTestId('components.location-picker.map-view'),
      ).toBeTruthy();

      expect(screen.queryByText('No location saved yet.')).toBeNull();

      expect(screen.getByText('Locate User')).toBeTruthy();
      expect(screen.getByText('Pick on map')).toBeTruthy();
   });

   it('calls getLocationHandler when button is pressed', () => {
      render(<LocationPicker {...mockValues} />);

      fireEvent.press(screen.getByText('Locate User'));

      expect(mockHookValues.getLocationHandler).toHaveBeenCalledTimes(1);
   });

   it('calls pickOnMapHandler when button is pressed', () => {
      render(<LocationPicker {...mockValues} />);

      fireEvent.press(screen.getByText('Pick on map'));

      expect(mockHookValues.pickOnMapHandler).toHaveBeenCalledTimes(1);
   });
});
