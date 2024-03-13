import { GET_ADDRESS_API_KEY } from '@env';

import type { AddressRequestProps } from '@typings/data';

export function useRequests() {
   async function getAddress(lat: number, lgn: number) {
      const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lgn}&api_key=${GET_ADDRESS_API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
         throw new Error('Failed to fetch address!');
      }

      const { address }: AddressRequestProps = await response.json();

      return address;
   }

   return {
      getAddress,
   };
}
