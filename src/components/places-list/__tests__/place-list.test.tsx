import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { PlacesList } from '../places-list';
import { DUMMY_PLACE } from './dummy';

const mockValues = {
   places: [],
   onSelect: jest.fn(),
};

describe('components/place-list/<PlaceList />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('renders component properly when there is no places to show', () => {
      render(<PlacesList {...mockValues} />);

      expect(
         screen.getByText('No places added yet - start adding some!'),
      ).toBeTruthy();

      expect(screen.queryByTestId('components.place-list.flatlist')).toBeNull();
   });

   it('renders list when there are places to show', () => {
      const mockParams = {
         places: [DUMMY_PLACE],
         onSelect: jest.fn(),
      };

      render(<PlacesList {...mockParams} />);

      expect(
         screen.queryByTestId('No places added yet - start adding some!'),
      ).toBeNull();

      expect(screen.getByTestId('components.place-list.flatlist')).toBeTruthy();
      expect(
         screen.getByTestId('components.place-list-0.pressable'),
      ).toBeTruthy();
   });
});
