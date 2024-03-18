import { act, renderHook } from '@testing-library/react-native';

import { useMapScreen } from '../map.hook';
import { Alert } from 'react-native';
import { StackRoutes } from '@routes/types';

const mockUseRoute = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
   useRoute: () => mockUseRoute(),
   useNavigation: () => ({
      navigate: mockNavigate,
   }),
}));

const coordinates = {
   nativeEvent: {
      coordinate: {
         latitude: 37.78198453108739,
         longitude: -122.43511399434409,
      },
      position: { x: 158, y: 358.3333282470703 },
      target: 303,
   },
};

const spyAlert = jest.spyOn(Alert, 'alert');

describe('screens/map/useMapScreen', () => {
   beforeEach(() => {
      jest.clearAllMocks();
      mockUseRoute.mockReturnValue({
         params: null,
      });
   });

   it('returns initialLocation null and default location when hook is rendered without receiving props via route params', () => {
      const { result } = renderHook(() => useMapScreen());

      expect(result.current.initialLocation).toBeNull();
      expect(result.current.region).toEqual({
         latitude: 37.78,
         longitude: -122.43,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.042,
      });
   });

   it('returns initialLocation when hook is rendered after receiving props via route params', () => {
      mockUseRoute.mockReturnValueOnce({
         params: {
            initialLat: 1,
            initialLng: 1,
         },
      });
      const { result } = renderHook(() => useMapScreen());

      expect(result.current.initialLocation).toEqual({
         lat: 1,
         lng: 1,
      });
      expect(result.current.region).toEqual({
         latitude: 1,
         longitude: 1,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.042,
      });
   });

   it('sets location coordinates when selectLocationHandler is called and initialLocation is null', () => {
      const { result } = renderHook(() => useMapScreen());

      //@ts-expect-error ignore it
      act(() => result.current.selectLocationHandler(coordinates));

      expect(result.current.selectedLocation).toEqual({
         lat: 37.78198453108739,
         lng: -122.43511399434409,
      });
   });

   it('does not set location coordinates when selectLocationHandler is called and initialLocation is not null', () => {
      mockUseRoute.mockReturnValueOnce({
         params: {
            initialLat: 1,
            initialLng: 1,
         },
      });

      const { result } = renderHook(() => useMapScreen());

      //@ts-expect-error ignore it
      act(() => result.current.selectLocationHandler(coordinates));

      expect(result.current.selectedLocation).toEqual({
         lat: 1,
         lng: 1,
      });
   });

   it('calls Alert when there is no selectedLocation when calls savePickedLocationHandler', () => {
      const { result } = renderHook(() => useMapScreen());

      act(() => result.current.savePickedLocationHandler());

      expect(spyAlert).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledWith(
         'No location picked!',
         'You have to pick a location (by tapping on the map) first!',
      );

      expect(mockNavigate).not.toHaveBeenCalled();
   });

   it('navigates to add places screen when there is a selected location', () => {
      mockUseRoute.mockReturnValueOnce({
         params: {
            initialLat: 1,
            initialLng: 1,
         },
      });

      const { result } = renderHook(() => useMapScreen());

      act(() => result.current.savePickedLocationHandler());

      expect(spyAlert).not.toHaveBeenCalled();

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(StackRoutes.ADD_PLACES, {
         pickedLat: 1,
         pickedLng: 1,
      });
   });
});
