class EventDto {
 constructor({
   id,
   name,
   date,
   location,
   description,
   image,
   fb
 }) {
   this.id = id;
   this.name = name;
   this.date = date;
   this.location = location;
   this.description = description;
   this.image = image;
   this.fb = fb;
 }

 static async fromEventModel(eventModel) {
   const {id, name, date, location, description, image} = eventModel;

   if (!eventModel.Post) {
     await eventModel.getPost()
   }

   const {fb} = eventModel.Post;

   return new EventDto({
     id,
     name,
     date,
     location,
     description,
     image,
     fb
   });
 }
}
export default EventDto;