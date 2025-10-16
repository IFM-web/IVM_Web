using IFM360.AuthFilter;
using IFM360.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace IFM360.Controllers
{
    [AuthenticationEmployee]
    public class EmployeeController : Controller
    {
        CommanClass comman = new CommanClass();
        public async Task<IActionResult> Upcoming()
        {
            return View();
        }
        public async Task<IActionResult> InviteVisitors()
        {
            var employees = new List<Employee>();
            string ApiEmployee = $"https://ifm360.in/ivmapi/api/FirstTimeVisitor/GetEmployeeList?LocationID={HttpContext.Session.GetString("location_id")}"
                          ;
            DataTable dt4 = await comman.Fill(ApiEmployee);
            foreach (DataRow r in dt4.Rows)
            {
                employees.Add(new Employee
                {
                    Id = r["Id"].ToString(),
                    EmpName = r["Name"].ToString(),
                    Designation = r["Designation"].ToString(),
                    Company = r["Company"].ToString()
                });
            }
            ;

            ViewBag.EmployeeList = employees;
            return View();
        }
        public async Task<IActionResult> PreInviteHistory()
        {
            return View();
        }
        public async Task<IActionResult> VisitorHistory() => View();
        
        public async Task<IActionResult> Logout()
        {
            return RedirectToAction("EmployeeLogin", "Admin");
         
        }
    }
}
