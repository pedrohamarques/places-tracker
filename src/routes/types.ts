export type RoutesParams = {
   [StackRoutes.ALL_PLACES]: undefined;
   [StackRoutes.ADD_PLACES]?: {
      pickedLat: number;
      pickedLng: number;
   };
   [StackRoutes.MAP]?: {
      initialLat: number;
      initialLng: number;
   };
   [StackRoutes.PLACE_DETAILS]: {
      placeId: number;
   };
};

export enum StackRoutes {
   ALL_PLACES = 'AllPlaces',
   ADD_PLACES = 'AddPlaces',
   MAP = 'Map',
   PLACE_DETAILS = 'PlaceDetails',
}
