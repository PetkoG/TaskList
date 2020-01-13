using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDoCRUD.Model;

namespace ToDoCRUD.Data
{
    public class TasksContext : DbContext
    {
        public TasksContext (DbContextOptions<TasksContext> options)
            : base(options)
        {
        }

        public DbSet<ToDoCRUD.Model.TaskEntity> Tasks { get; set; }
        public DbSet<ToDoCRUD.Model.User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Model.TaskEntity>().ToTable("Tasks");
            modelBuilder.Entity<Model.User>().ToTable("Users");
        }
    }
}
