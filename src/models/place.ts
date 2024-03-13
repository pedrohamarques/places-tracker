import type { FullLocationProps } from '@typings/data';

export default class Place {
   title: string;
   imageUri: string;
   location: FullLocationProps | null;
   id: string;
   constructor(
      title: string,
      imageUri: string,
      location: FullLocationProps | null,
   ) {
      (this.imageUri = imageUri),
         (this.title = title),
         (this.location = location),
         (this.id = new Date().toString() + Math.random().toString());
   }
}
