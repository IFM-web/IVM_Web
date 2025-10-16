using Microsoft.Build.Framework;

namespace IFM360.Models
{
    public class EmployeeLogin
    {
        [Required]
        public string EmailId { get; set; }
        [Required]
        public string PIN{  get; set; }
    }
}
