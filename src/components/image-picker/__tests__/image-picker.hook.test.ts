import { act, renderHook, waitFor } from '@testing-library/react-native';

import { useImagePicker } from '../image-picker.hook';

import { Alert } from 'react-native';

const mockHookParams = {
   onImage: jest.fn(),
};

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
   useNavigation: () => ({
      navigate: mockNavigate,
   }),
}));

const mockUseCameraPermissions = jest.fn();
const mockLaunchCameraAsync = jest.fn();

const mockRequestPermission = jest.fn();

jest.mock('expo-image-picker', () => ({
   useCameraPermissions: () => mockUseCameraPermissions(),
   launchCameraAsync: () => mockLaunchCameraAsync(),
   PermissionStatus: {
      UNDETERMINED: 'undetermined',
      GRANTED: 'granted',
      DENIED: 'denied',
   },
}));

const spyAlert = jest.spyOn(Alert, 'alert');

describe('components/location-picker/useImagePicker', () => {
   beforeEach(() => {
      jest.clearAllMocks();
      mockUseCameraPermissions.mockReturnValue([
         {
            status: 'granted',
         },
         mockRequestPermission,
      ]);

      mockLaunchCameraAsync.mockResolvedValue({
         assets: [{ uri: 'someUri' }],
      });
   });

   it('gets image when takeImageHandler is called and permission is granted', async () => {
      const { result } = renderHook(() => useImagePicker(mockHookParams));

      await act(() => result.current.takeImageHandler());

      expect(mockRequestPermission).not.toHaveBeenCalled();
      expect(spyAlert).not.toHaveBeenCalled();

      waitFor(() => expect(mockLaunchCameraAsync).toHaveBeenCalledTimes(1));

      expect(mockHookParams.onImage).toHaveBeenCalledTimes(1);

      waitFor(() => expect(result.current.pickedImage).toBe('someUri'));
   });

   it('returns undefined when takeImageHandler is called and the permission is undetermined, but not allowed', async () => {
      mockUseCameraPermissions.mockReturnValueOnce([
         {
            status: 'undetermined',
         },
         mockRequestPermission,
      ]);

      mockRequestPermission.mockReturnValue({
         granted: false,
      });

      const { result } = renderHook(() => useImagePicker(mockHookParams));

      await act(() => result.current.takeImageHandler());

      expect(mockRequestPermission).toHaveBeenCalledTimes(1);

      expect(spyAlert).not.toHaveBeenCalled();

      expect(mockLaunchCameraAsync).not.toHaveBeenCalled();

      expect(result.current.takeImageHandler()).resolves.toBeUndefined();
   });

   it('returns location when takeImageHandler is called and the permission is undetermined, but it is allowed', async () => {
      mockUseCameraPermissions.mockReturnValueOnce([
         {
            status: 'undetermined',
         },
         mockRequestPermission,
      ]);

      mockRequestPermission.mockReturnValue({
         granted: true,
      });

      const { result } = renderHook(() => useImagePicker(mockHookParams));

      await act(() => result.current.takeImageHandler());

      expect(mockRequestPermission).toHaveBeenCalledTimes(1);

      expect(spyAlert).not.toHaveBeenCalled();

      waitFor(() => expect(mockLaunchCameraAsync).toHaveBeenCalledTimes(1));

      expect(mockHookParams.onImage).toHaveBeenCalledTimes(1);

      waitFor(() => expect(result.current.pickedImage).toBe('someUri'));
   });

   it('calls Alert when permission is denied', async () => {
      mockUseCameraPermissions.mockReturnValueOnce([
         {
            status: 'denied',
         },
         mockRequestPermission,
      ]);

      const { result } = renderHook(() => useImagePicker(mockHookParams));

      await act(() => result.current.takeImageHandler());

      expect(mockRequestPermission).not.toHaveBeenCalled();

      expect(spyAlert).toHaveBeenCalledTimes(1);
      expect(spyAlert).toHaveBeenCalledWith(
         'Insufficient Permissions!',
         'You need to grant camera permission to use this app.',
      );

      expect(mockLaunchCameraAsync).not.toHaveBeenCalled();

      expect(result.current.takeImageHandler()).resolves.toBeUndefined();
   });
});
