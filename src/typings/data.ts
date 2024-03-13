export type Location = {
   lat: number;
   lng: number;
};

export type AddressRequestProps = {
   place_id: number;
   licence: string;
   osm_type: string;
   osm_id: number;
   lat: string;
   lon: string;
   display_name: string;
   address: AddressProps;
   boundingbox: string[];
};

export type AddressProps = {
   house_number: string;
   road: string;
   neighbourhood: string;
   suburb: string;
   county: string;
   city: string;
   state: string;
   'ISO3166-2-lvl4': string;
   postcode: string;
   country: string;
   country_code: string;
};

export type FullLocationProps = Location & {
   address?: AddressProps;
};

export type FetchedFormattedPlaceProps = {
   id: number;
   imageUri: string;
   location: {
      address: string;
      lat: string;
      lng: string;
   };
   title: string;
};

export type PlaceDetailsProps = {
   id: number;
   imageUri: string;
   address: string;
   lat: string;
   Lng: string;
   title: string;
};
