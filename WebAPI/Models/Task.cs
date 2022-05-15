using System;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace WebAPI.Models
{
    public class Task
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("DateAdded")]
        //[BsonDateTimeOptions(Kind =DateTimeKind.Local)]
        //[JsonIgnore]
        public string DateAdded { get; set; }

        [BsonElement("Status")]
        public string Status { get; set; }

        [BsonElement("DateFinished")]
        //[BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public string DateFinished { get; set; }

        public string formatDate(DateTime dateTime)
        {
            return dateTime.ToString("dddd, dd MMMM yyyy");
        } 
    }
}
