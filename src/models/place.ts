export default class Place {
   title: string;
   imageUri: string;
   address: string;
   location: Location;
   id: string;
   constructor(
      title: string,
      imageUri: string,
      address: string,
      location: Location,
   ) {
      (this.imageUri = imageUri),
         (this.title = title),
         (this.address = address),
         (this.location = location),
         (this.id = new Date().toString() + Math.random().toString());
   }
}
