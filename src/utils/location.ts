import { AddressProps, Location } from '@typings/data';

function formatToDMS(coord: number) {
   const absolute = Math.abs(coord);
   const degrees = Math.floor(absolute);
   const minutesNotTruncated = (absolute - degrees) * 60;
   const minutes = Math.floor(minutesNotTruncated);
   const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

   return `${degrees}\u00B0 ${minutes}' ${seconds}''`;
}

export function formatCoordinate({ lat, lng }: Location) {
   const latCoordinate = formatToDMS(lat);
   const latDirection = lat >= 0 ? 'N' : 'S';

   const lngCoordinate = formatToDMS(lng);
   const lngDirection = lng >= 0 ? 'E' : 'W';

   return {
      lat: `${latCoordinate} ${latDirection}`,
      lng: `${lngCoordinate} ${lngDirection}`,
   };
}

export function formatAddress(address?: AddressProps) {
   if (address) {
      return `${address.house_number ? `${address.house_number} ` : ''}${address?.road}, ${address?.city} ${address?.state} ${address?.postcode}, ${address?.country}`;
   }
   return 'Not available.';
}
