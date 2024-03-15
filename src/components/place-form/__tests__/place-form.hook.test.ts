import { act, renderHook } from '@testing-library/react-native';

import { usePlaceForm } from '../place-form.hook';

const mockHookParams = {
   onCreatePlace: jest.fn(),
};

describe('components/place-form/usePlaceForm', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('changes title when changeTitleHandler is called', () => {
      const { result } = renderHook(() => usePlaceForm(mockHookParams));

      act(() => result.current.changeTitleHandler('Teste'));

      expect(result.current.enteredTitle).toBe('Teste');
   });

   it('saves the place when savePlaceHandler is called', () => {
      const { result } = renderHook(() => usePlaceForm(mockHookParams));

      act(() => result.current.savePlaceHandler());

      expect(mockHookParams.onCreatePlace).toHaveBeenCalledTimes(1);
      expect(mockHookParams.onCreatePlace).toHaveBeenCalledWith({
         title: '',
         imageUri: '',
         location: null,
      });
   });

   it('saves the place with full data when image and location are taken', () => {
      const { result } = renderHook(() => usePlaceForm(mockHookParams));

      act(() => result.current.changeTitleHandler('Teste'));

      act(() => result.current.takeImageHandler('someUri'));

      act(() =>
         result.current.takeLocationHandler({
            lat: -5,
            lng: -4,
         }),
      );

      act(() => result.current.savePlaceHandler());

      expect(mockHookParams.onCreatePlace).toHaveBeenCalledTimes(1);
      expect(mockHookParams.onCreatePlace).toHaveBeenCalledWith({
         title: 'Teste',
         imageUri: 'someUri',
         location: {
            lat: -5,
            lng: -4,
         },
      });
   });
});
