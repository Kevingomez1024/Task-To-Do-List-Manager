using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: api/tasks
        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult(_taskService.Get());
        }


        // GET api/tasks/{id}
        [HttpGet("{id}")]
        public Models.Task Get(string id)
        {
            return _taskService.Get(id);
        }

        // POST api/values
        [HttpPost(Name = "Create")]
        public ActionResult<Models.Task> Create([FromBody] Models.Task newTask)
        {
            newTask.DateAdded = DateTime.Now.ToString("dddd, dd MMMM yyyy hh:mm tt");
            _taskService.Create(newTask);
            return new JsonResult("New Task Created Succesfully!");
        }

        // PUT api/tasks/
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Models.Task taskIn)
        {
            var task = _taskService.Get(id);

            if (task == null)
            {
                return NotFound();
            }

            if (task.DateFinished is null && taskIn.Status.Equals("Completed"))
            {

                taskIn.DateFinished = DateTime.Now.ToString("dddd, dd MMMM yyyy hh:mm tt");
            }
            else if(task.DateFinished is not null && !taskIn.Status.Equals("Completed"))
            {
                taskIn.DateFinished = null;
            }
            _taskService.Update(id, taskIn);

            return new JsonResult("Task Updated Succesfully!");
        }

        // DELETE api/tasks/
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var task = _taskService.Get(id);

            if (task == null)
            {
                return NotFound();
            }

            _taskService.Remove(task.Id);

            return new JsonResult("Task Deleted Succesfully!");
        }
    }
}
