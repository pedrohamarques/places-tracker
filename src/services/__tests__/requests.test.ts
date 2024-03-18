import { act, renderHook, waitFor } from '@testing-library/react-native';

import { useRequests } from '@services/requests';
import { Alert } from 'react-native';

const spyAlert = jest.spyOn(Alert, 'alert');

describe('services/requests/useRequests', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   it('returns address when getAddress is called and the request is successful', async () => {
      global.fetch = jest.fn(() =>
         Promise.resolve({
            json: () => Promise.resolve({ address: 'Some address' }),
            ok: true,
         }),
      ) as jest.Mock;

      const { result } = renderHook(() => useRequests());

      await act(() => result.current.getAddress(-1, -1));

      expect(result.current.getAddress(-1, -1)).resolves.toBe('Some address');
   });

   it('throws an error when getAddress is called and the request is not successful', async () => {
      global.fetch = jest.fn().mockRejectedValueOnce(new Error()) as jest.Mock;

      const { result } = renderHook(() => useRequests());

      await act(() => result.current.getAddress(-1, -1));

      await waitFor(() => expect(spyAlert).toHaveBeenCalledTimes(1));

      expect(spyAlert).toHaveBeenCalledWith('Failed to fetch address!');
   });
});
