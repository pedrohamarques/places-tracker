import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useAddPlaceScreen } from '../add-place.hook';
import { StackRoutes } from '@routes/types';

const mockNavigate = jest.fn();

const dummyPlace = {
   title: 'Some title',
   imageUri: 'someUri',
   location: {
      lat: 1,
      lng: 1,
   },
};

jest.mock('@react-navigation/native', () => ({
   useNavigation: () => ({
      navigate: mockNavigate,
   }),
}));

const mockInsertPlace = jest.fn();

jest.mock('@services/database', () => ({
   useDatabaseServices: () => ({
      insertPlace: mockInsertPlace,
   }),
}));

describe('screens/add-place/useAddPlaceScreen', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('adds a place and navigates to all places screen when createPlaceHandler is called', async () => {
      const { result } = renderHook(() => useAddPlaceScreen());

      await act(() => result.current.createPlaceHandler(dummyPlace));

      await waitFor(() => expect(mockInsertPlace).toHaveBeenCalledTimes(1));
      expect(mockInsertPlace).toHaveBeenCalledWith({
         title: 'Some title',
         imageUri: 'someUri',
         location: {
            lat: 1,
            lng: 1,
         },
      });

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(StackRoutes.ALL_PLACES);
   });
});
