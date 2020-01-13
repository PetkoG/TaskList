using ToDoCRUD.Data;
using ToDoCRUD.Model;
using System;
using System.Linq;
using System.Collections.Generic;

namespace ToDoCRUD.Data
{
    public static class DbInitializer
    {
        public static void Initialize(TasksContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            var tasks = new List<TaskEntity>
            {
            new TaskEntity{Name="Tasks",Details="Details",IsRoot=true},
            new TaskEntity{Name="Modify roof and floor",Details="Internal work",ParentTaskId=1},
            new TaskEntity{Name="Construct collection stack",Details="Internal work",ParentTaskId=2},
            new TaskEntity{Name="Pour concrete and install frame",Details="External work",ParentTaskId=1},
            new TaskEntity{Name="Build high-temperature burner",Details="External work",ParentTaskId=1},
            new TaskEntity{Name="Install control system",Details="External work",ParentTaskId=1},
            new TaskEntity{Name="Install air pollution device",Details="External work",ParentTaskId=1},
            new TaskEntity{Name="Inspection and testing",Details="Mixed work",ParentTaskId=1}
            };
            tasks.ForEach(s => context.Tasks.Add(s));
            context.SaveChanges();

            var users = new List<User>
            {
            new User{Name="Carson" },
            new User{Name="Meredith"},
            new User{Name="Arturo" },
            new User{Name="Gytis"},
            new User{Name="Yan"}
            };

            users.ForEach(s => context.Users.Add(s));
            context.SaveChanges();
        }
    }
}