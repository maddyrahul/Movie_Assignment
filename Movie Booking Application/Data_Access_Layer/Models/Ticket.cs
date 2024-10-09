using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.Models
{
    public class Ticket
    {
        [Key]
        public int TicketId { get; set; }
        public int NumberOfSeats { get; set; }
        public DateTime BookingDate { get; set; }

        // Foreign Key to User
        public int UserId { get; set; }
        public User? User { get; set; }

        // Foreign Key to Show
        public int ShowId { get; set; }
        public Show? Show { get; set; }
    }




}
