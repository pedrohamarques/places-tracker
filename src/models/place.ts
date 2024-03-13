import type { FullLocationProps } from '@typings/data';

export default class Place {
   title: string;
   imageUri: string;
   location: FullLocationProps | null;
   id?: number;
   constructor(
      title: string,
      imageUri: string,
      location: FullLocationProps | null,
      id?: number,
   ) {
      (this.imageUri = imageUri),
         (this.title = title),
         (this.location = location),
         (this.id = id);
   }
}
