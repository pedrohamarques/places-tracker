import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DUMMY_PLACE } from '@components/places-list/__tests__/dummy';

import { PlaceItem } from '../place-item';

const mockValues = {
   onSelect: jest.fn(),
   place: DUMMY_PLACE,
};

describe('components/place-list/components/place-item/<PlaceItem />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('renders component properly', () => {
      render(<PlaceItem {...mockValues} />);

      expect(
         screen.getByTestId(
            'components.place-list.components.place-item.pressable',
         ),
      ).toBeTruthy();
      expect(
         screen.getByTestId(
            'components.place-list.components.place-item.image',
         ),
      ).toBeTruthy();
      expect(screen.getByText('Some title')).toBeTruthy();
      expect(screen.getByText('Rua Teste')).toBeTruthy();
   });

   it('calls onSelect function when component is pressed', () => {
      render(<PlaceItem {...mockValues} />);

      fireEvent.press(
         screen.getByTestId(
            'components.place-list.components.place-item.pressable',
         ),
      );

      expect(mockValues.onSelect).toHaveBeenCalledTimes(1);
   });
});
