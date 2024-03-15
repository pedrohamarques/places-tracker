import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { PlaceForm } from '../place-form';

const mockParams = {
   onCreatePlace: jest.fn(),
};

const mockHookValues = {
   enteredTitle: 'Some title',
   changeTitleHandler: jest.fn(),
   savePlaceHandler: jest.fn(),
};

const mockUsePlaceForm = jest.fn();

jest.mock('../place-form.hook', () => ({
   usePlaceForm: () => mockUsePlaceForm(),
}));

jest.mock('@react-navigation/native', () => ({
   useIsFocused: jest.fn(),
   useNavigation: jest.fn(),
   useRoute: jest.fn(),
}));

describe('components/place-form/<PlaceForm />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
      mockUsePlaceForm.mockReturnValue(mockHookValues);
   });

   it('renders screen properly', () => {
      render(<PlaceForm {...mockParams} />);

      expect(screen.getByText('Title')).toBeTruthy();
      expect(
         screen.getByTestId('components.place-form.text-input'),
      ).toBeTruthy();
      expect(
         screen.getByTestId('components.place-form.image-picker'),
      ).toBeTruthy();
      expect(
         screen.getByTestId('components.place-form.location-picker'),
      ).toBeTruthy();

      expect(screen.getByText('Add Place')).toBeTruthy();
   });

   it('calls savePlaceHandler when button is pressed', () => {
      render(<PlaceForm {...mockParams} />);

      fireEvent.press(screen.getByText('Add Place'));

      expect(mockHookValues.savePlaceHandler).toHaveBeenCalledTimes(1);
   });

   it('calls changeTitleHandler when text input is typed', () => {
      render(<PlaceForm {...mockParams} />);

      fireEvent.changeText(
         screen.getByTestId('components.place-form.text-input'),
         'Inputting',
      );

      expect(mockHookValues.changeTitleHandler).toHaveBeenCalledTimes(1);
      expect(mockHookValues.changeTitleHandler).toHaveBeenCalledWith(
         'Inputting',
      );
   });
});
