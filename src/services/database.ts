import * as SQLite from 'expo-sqlite';

import { formatAddress } from '@utils/location';

import Place from '@models/place';
import { FetchedFormattedPlaceProps } from '@typings/data';

const database = SQLite.openDatabase('places.db');

export function useDatabaseServices() {
   function init() {
      const promise = new Promise((resolve, reject) => {
         database.transaction(transactionObject => {
            transactionObject.executeSql(
               `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )`,
               [],
               () => {
                  //@ts-expect-error any parameter
                  resolve();
               },
               (_, error) => {
                  reject(error);
                  return false;
               },
            );
         });
      });

      return promise;
   }

   function insertPlace(place: Place) {
      const promise = new Promise((resolve, reject) => {
         database.transaction(transactionObject => {
            transactionObject.executeSql(
               `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
               [
                  place.title,
                  place.imageUri,
                  formatAddress(place.location?.address),
                  place.location!.lat,
                  place.location!.lng,
               ],
               (_, result) => {
                  resolve(result);
               },
               error => {
                  reject(error);
                  return false;
               },
            );
         });
      });
      return promise;
   }

   function fetchPlaces() {
      const promise = new Promise<FetchedFormattedPlaceProps[]>(
         (resolve, reject) => {
            database.transaction(transactionObject => {
               transactionObject.executeSql(
                  `SELECT * FROM places`,
                  [],
                  (_, result) => {
                     const places: FetchedFormattedPlaceProps[] = [];

                     for (const dp of result.rows._array) {
                        places.push({
                           id: dp.id,
                           imageUri: dp.imageUri,
                           title: dp.title,
                           location: {
                              address: dp.address,
                              lat: dp.lat,
                              lng: dp.Lng,
                           },
                        });
                     }
                     resolve(places);
                  },
                  error => {
                     reject(error);
                     return false;
                  },
               );
            });
         },
      );
      return promise;
   }

   return {
      init,
      insertPlace,
      fetchPlaces,
   };
}
