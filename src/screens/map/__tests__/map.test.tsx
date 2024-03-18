import React from 'react';

import { render, screen } from '@testing-library/react-native';
import { MapScreen } from '../map';

const mockNavigation = {
   setOptions: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
   useRoute: () => ({
      params: {
         initialLat: 1,
         initialLng: 1,
      },
   }),
   useNavigation: jest.fn(),
}));

describe('screens/map/<MapScreen />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('renders screen properly', () => {
      render(<MapScreen navigation={mockNavigation} />);

      expect(screen.getByTestId('screens.map.map-view'));
   });
});
