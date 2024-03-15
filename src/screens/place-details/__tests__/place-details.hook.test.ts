import { act, renderHook, waitFor } from '@testing-library/react-native';

import { usePlaceDetailsScreen } from '../place-details.hook';
import { StackRoutes } from '@routes/types';
import { DUMMY_PLACE } from './dummy';

const mockFetchPlaceDetails = jest.fn();

jest.mock('@services/database', () => ({
   useDatabaseServices: () => ({
      fetchPlaceDetails: () => mockFetchPlaceDetails(),
   }),
}));

const mockNavigate = jest.fn();
const mockUseRoute = jest.fn();

jest.mock('@react-navigation/native', () => ({
   useNavigation: () => ({
      navigate: mockNavigate,
   }),
   useRoute: () => mockUseRoute(),
}));

describe('screens/place-details/UsePlaceDetailsScreen', () => {
   beforeEach(() => {
      jest.clearAllMocks();
      mockUseRoute.mockReturnValue({
         params: {
            placeId: 1,
         },
      });
      mockFetchPlaceDetails.mockResolvedValue(DUMMY_PLACE);
   });

   it('sets place details when hook is called', async () => {
      const { result } = renderHook(() => usePlaceDetailsScreen());

      expect(mockFetchPlaceDetails).toHaveBeenCalledTimes(1);

      waitFor(() => expect(result.current.loadedPlace).toEqual(DUMMY_PLACE));
   });

   it('navigates to map screen when hook is called and there is a loaded place', async () => {
      const { result } = renderHook(() => usePlaceDetailsScreen());

      await waitFor(() =>
         expect(mockFetchPlaceDetails).toHaveBeenCalledTimes(1),
      );

      waitFor(() => expect(result.current.loadedPlace).toEqual(DUMMY_PLACE));

      act(() => result.current.showOnMapHandler());

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(StackRoutes.MAP, {
         initialLat: 4,
         initialLng: 4,
      });
   });
});
