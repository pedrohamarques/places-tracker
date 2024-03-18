import { formatAddress, formatCoordinate } from '@utils/location';

const mockAddress = {
   house_number: '15',
   road: 'Av Road',
   neighbourhood: 'Ng',
   suburb: 'Sub',
   county: 'County',
   city: 'City',
   state: 'State',
   'ISO3166-2-lvl4': 'What',
   postcode: '33333',
   country: 'Mars',
   country_code: 'MS',
};

describe('utils/location', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   describe('formatCoordinate', () => {
      it('returns the DMS coordinate properly when giving numeric coordinates', () => {
         expect(formatCoordinate({ lat: 15.25, lng: -30.5 })).toEqual({
            lat: `15\u00B0 15' 0'' N`,
            lng: `30\u00B0 30' 0'' W`,
         });
      });
   });

   describe('formatAddress', () => {
      it('returns the address in one line when full address is given', () => {
         expect(formatAddress(mockAddress)).toBe(
            '15 Av Road, City State 33333, Mars',
         );
      });

      it('returns the address in one line when there is no house_number', () => {
         expect(formatAddress({ ...mockAddress, house_number: '' })).toBe(
            'Av Road, City State 33333, Mars',
         );
      });

      it('returns a message when there is no address sent', () => {
         expect(formatAddress()).toBe('Not available.');
      });
   });
});
