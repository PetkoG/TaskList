using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoCRUD.Model
{
    public class TaskEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public int ParentTaskId { get; set; }
        public int UserId { get; set; }
        public string Tags { get; set; }
        public bool IsRoot { get; set; }
        [NotMapped]
        public IList<int> Children { set; get; } = new List<int>();
        [NotMapped]
        public bool IsOpen { get; set; } = false;
        [NotMapped]
        public string User { get; set; }

    }
}
