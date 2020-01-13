using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoCRUD.Data;
using ToDoCRUD.Model;

namespace ToDoCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TasksContext _context;

        public TasksController(TasksContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskEntity>>> GetTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();
            foreach (TaskEntity task in tasks) 
            {
                if(task.ParentTaskId != 0)
                {
                    var parent = tasks.Find(t => t.ID == task.ParentTaskId);
                    parent.Children.Add(task.ID);
                }
                if(task.UserId != 0)
                {
                    var user = _context.Users.FirstOrDefault(i => i.ID == task.UserId);
                    task.User = user != null ? user.Name : "";
                }
                
            }
            return tasks;
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskEntity>> GetTaskEntity(Guid id)
        {
            var taskEntity = await _context.Tasks.FindAsync(id);

            if (taskEntity == null)
            {
                return NotFound();
            }

            return taskEntity;
        }

        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskEntity(int id, TaskEntity taskEntity)
        {
            if (id != taskEntity.ID)
            {
                return BadRequest();
            }

            _context.Entry(taskEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskEntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<TaskEntity>> PostTaskEntity([FromBody]TaskEntity taskEntity)
        {
            if(taskEntity.User != null)
            {
                var user = _context.Users.FirstOrDefault(i => i.Name == taskEntity.User);
                if(user == null)
                {
                    User u = new User { Name = taskEntity.User };
                    _context.Users.Add(u);
                    _context.SaveChanges();
                }
                taskEntity.UserId = _context.Users.Single(i => i.Name == taskEntity.User).ID;
            }
            _context.Tasks.Add(taskEntity);
            await _context.SaveChangesAsync();

            return Ok(taskEntity);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TaskEntity>> DeleteTaskEntity(Guid id)
        {
            var taskEntity = await _context.Tasks.FindAsync(id);
            if (taskEntity == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(taskEntity);
            await _context.SaveChangesAsync();

            return taskEntity;
        }

        private bool TaskEntityExists(int id)
        {
            return _context.Tasks.Any(e => e.ID == id);
        }
    }
}
