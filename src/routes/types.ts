export type RoutesParams = {
   [StackRoutes.ALL_PLACES]: undefined;
   [StackRoutes.ADD_PLACES]?: {
      pickedLat: number;
      pickedLng: number;
   };
   [StackRoutes.MAP]: undefined;
};

export enum StackRoutes {
   ALL_PLACES = 'AllPlaces',
   ADD_PLACES = 'AddPlaces',
   MAP = 'Map',
}
