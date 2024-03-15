import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { ImagePicker } from '../image-picker';

const mockValues = {
   onImage: jest.fn(),
};

const mockHookValues = {
   pickedLocation: null,
   takeImageHandler: jest.fn(),
};

const mockUseImagePicker = jest.fn();

jest.mock('../image-picker.hook', () => ({
   useImagePicker: () => mockUseImagePicker(),
}));

describe('components/image-picker/<ImagePicker />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
      mockUseImagePicker.mockReturnValue(mockHookValues);
   });

   it('renders component properly when there are no picked image', () => {
      render(<ImagePicker {...mockValues} />);

      expect(screen.queryByTestId('components.image-picker.Image')).toBeNull();

      expect(screen.getByText('No image taken yet.')).toBeTruthy();
      expect(screen.getByText('Take Image')).toBeTruthy();
   });

   it('renders component properly when there are a picked image', () => {
      mockUseImagePicker.mockReturnValueOnce({
         pickedImage: 'someUri',
      });

      render(<ImagePicker {...mockValues} />);

      expect(screen.getByTestId('components.image-picker.Image')).toBeTruthy();

      expect(screen.queryByText('No image taken yet.')).toBeNull();

      expect(screen.getByText('Take Image')).toBeTruthy();
   });

   it('calls takeImageHandler when button is pressed', () => {
      render(<ImagePicker {...mockValues} />);

      fireEvent.press(screen.getByText('Take Image'));

      expect(mockHookValues.takeImageHandler).toHaveBeenCalledTimes(1);
   });
});
