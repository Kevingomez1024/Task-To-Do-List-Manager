using System;
using System.Collections.Generic;
using MongoDB.Driver;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class TaskService
    {
        private readonly IMongoCollection<Task> _tasks;

        public TaskService(ITasksDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _tasks = database.GetCollection<Task>(settings.CollectionName);
        }

        public List<Task> Get() => _tasks.Find(task => true).ToList();
        

        public Task Get(string id) =>
            _tasks.Find(task => task.Id == id).FirstOrDefault();

        public Task Create(Task task)
        {
            _tasks.InsertOne(task);
            return task;
        }

        public void Update(string id, Task taskIn) =>
            _tasks.ReplaceOne(task => task.Id == id, taskIn);

        public void Remove(Task taskIn) =>
            _tasks.DeleteOne(task => task.Id == task.Id);

        public void Remove(string id) =>
            _tasks.DeleteOne(task => task.Id == id);
    }
}
