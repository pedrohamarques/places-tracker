import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useAllPlacesScreen } from '../all-places.hook';
import { StackRoutes } from '@routes/types';

const mockNavigate = jest.fn();
const mockIsFocused = jest.fn();

jest.mock('@react-navigation/native', () => ({
   useNavigation: () => ({
      navigate: mockNavigate,
   }),
   useIsFocused: () => mockIsFocused(),
}));

const mockFetchPlaces = jest.fn();

jest.mock('@services/database', () => ({
   useDatabaseServices: () => ({
      fetchPlaces: mockFetchPlaces,
   }),
}));

const mockLoadedPlaces = [
   {
      id: 1,
      imageUri: 'someUri',
      location: {
         address: 'Some address',
         lat: '1',
         long: '1',
      },
      title: 'Some title',
   },
];

describe('screens/all-places/useAllPlacesScreen', () => {
   beforeEach(() => {
      jest.clearAllMocks();
      mockIsFocused.mockReturnValue(true);
   });

   it('navigates to Add Places screen when headerButtonHandler is called', () => {
      const { result } = renderHook(() => useAllPlacesScreen());

      act(() => result.current.headerButtonHandler());

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(StackRoutes.ADD_PLACES);
   });

   it('navigates to Place Details screen when placeSelectHandler is called', () => {
      const { result } = renderHook(() => useAllPlacesScreen());

      act(() => result.current.placeSelectHandler(1));

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(StackRoutes.PLACE_DETAILS, {
         placeId: 1,
      });
   });

   it('loads places when the hook is called', async () => {
      mockFetchPlaces.mockResolvedValueOnce(mockLoadedPlaces);
      const { result } = renderHook(() => useAllPlacesScreen());

      await waitFor(() => expect(mockFetchPlaces).toHaveBeenCalledTimes(1));

      expect(result.current.loadedPlaces).toEqual([
         {
            id: 1,
            imageUri: 'someUri',
            location: {
               address: 'Some address',
               lat: '1',
               long: '1',
            },
            title: 'Some title',
         },
      ]);
   });
});
