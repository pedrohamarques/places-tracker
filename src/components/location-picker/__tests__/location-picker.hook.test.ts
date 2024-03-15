import { act, renderHook, waitFor } from '@testing-library/react-native';

import { useLocationPicker } from '../location-picker.hook';

import { StackRoutes } from '@routes/types';
import { Alert } from 'react-native';

const mockHookParams = {
   onLocation: jest.fn(),
};

const mockNavigate = jest.fn();
const mockUseIsFocused = jest.fn();
const mockUseRoute = jest.fn();

jest.mock('@react-navigation/native', () => ({
   useIsFocused: () => mockUseIsFocused(),
   useNavigation: () => ({
      navigate: mockNavigate,
   }),
   useRoute: () => mockUseRoute(),
}));

const mockUseForegroundPermissions = jest.fn();
const mockGetCurrentPositionAsync = jest.fn();

const mockRequestPermission = jest.fn();

jest.mock('expo-location', () => ({
   useForegroundPermissions: () => mockUseForegroundPermissions(),
   getCurrentPositionAsync: () => mockGetCurrentPositionAsync(),
   PermissionStatus: {
      UNDETERMINED: 'undetermined',
      GRANTED: 'granted',
      DENIED: 'denied',
   },
}));

const spyAlert = jest.spyOn(Alert, 'alert');

const mockGetAddress = jest.fn();

jest.mock('@services/requests', () => ({
   useRequests: () => ({
      getAddress: () => mockGetAddress(),
   }),
}));

describe('components/location-picker/useLocationPicker', () => {
   beforeEach(() => {
      jest.clearAllMocks();
      mockUseForegroundPermissions.mockReturnValue([
         {
            status: 'granted',
         },
         mockRequestPermission,
      ]);

      mockGetCurrentPositionAsync.mockResolvedValue({
         coords: {
            latitude: -4,
            longitude: -4,
         },
      });
   });

   it('navigates to Map Screen when PickOnMapHandler is called', () => {
      const { result } = renderHook(() => useLocationPicker(mockHookParams));

      act(() => result.current.pickOnMapHandler());

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith(StackRoutes.MAP);
   });

   it('gets current position when getLocationHandler is called and permission is granted', async () => {
      const { result } = renderHook(() => useLocationPicker(mockHookParams));

      await act(() => result.current.getLocationHandler());

      expect(mockRequestPermission).not.toHaveBeenCalled();
      expect(spyAlert).not.toHaveBeenCalled();

      expect(mockGetCurrentPositionAsync).toHaveBeenCalledTimes(1);
      waitFor(() =>
         expect(result.current.pickedLocation).toEqual({
            lat: -4,
            lng: -4,
         }),
      );
   });

   it('returns undefined when getLocationHandler is called and the permission is undetermined, but not allowed', async () => {
      mockUseForegroundPermissions.mockReturnValueOnce([
         {
            status: 'undetermined',
         },
         mockRequestPermission,
      ]);

      mockRequestPermission.mockReturnValue({
         granted: false,
      });

      const { result } = renderHook(() => useLocationPicker(mockHookParams));

      await act(() => result.current.getLocationHandler());

      expect(mockRequestPermission).toHaveBeenCalledTimes(1);

      expect(spyAlert).not.toHaveBeenCalled();

      expect(mockGetCurrentPositionAsync).not.toHaveBeenCalled();

      expect(result.current.getLocationHandler()).resolves.toBeUndefined();
   });

   it('returns location when getLocationHandler is called and the permission is undetermined, but it is allowed', async () => {
      mockUseForegroundPermissions.mockReturnValueOnce([
         {
            status: 'undetermined',
         },
         mockRequestPermission,
      ]);

      mockRequestPermission.mockReturnValue({
         granted: true,
      });

      const { result } = renderHook(() => useLocationPicker(mockHookParams));

      await act(() => result.current.getLocationHandler());

      expect(mockRequestPermission).toHaveBeenCalledTimes(1);

      expect(spyAlert).not.toHaveBeenCalled();

      expect(mockGetCurrentPositionAsync).toHaveBeenCalledTimes(1);
      waitFor(() =>
         expect(result.current.pickedLocation).toEqual({
            lat: -4,
            lng: -4,
         }),
      );
   });

   it('calls Alert when permission is denied', async () => {
      mockUseForegroundPermissions.mockReturnValueOnce([
         {
            status: 'denied',
         },
         mockRequestPermission,
      ]);

      const { result } = renderHook(() => useLocationPicker(mockHookParams));

      await act(() => result.current.getLocationHandler());

      expect(mockRequestPermission).not.toHaveBeenCalled();

      expect(spyAlert).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledWith(
         'Insufficient Permissions!',
         'You need to grant location permission to use this app.',
      );

      expect(mockGetCurrentPositionAsync).not.toHaveBeenCalled();

      expect(result.current.getLocationHandler()).resolves.toBeUndefined();
   });

   it('sets picked location when the hook is called after navigating from other screen and is focused', () => {
      mockUseIsFocused.mockReturnValueOnce(true);
      mockUseRoute.mockReturnValueOnce({
         params: {
            pickedLat: -5,
            pickedLng: -5,
         },
      });

      const { result } = renderHook(() => useLocationPicker(mockHookParams));

      expect(result.current.pickedLocation).toEqual({
         lat: -5,
         lng: -5,
      });
   });

   it('calls onLocation when there is a picked location to save the address', async () => {
      mockUseIsFocused.mockReturnValueOnce(true);

      mockUseRoute.mockReturnValueOnce({
         params: {
            pickedLat: -5,
            pickedLng: -5,
         },
      });

      renderHook(() => useLocationPicker(mockHookParams));

      expect(mockGetAddress).toHaveBeenCalledTimes(1);

      (
         await waitFor(() => expect(mockHookParams.onLocation))
      ).toHaveBeenCalledTimes(1);
   });
});
