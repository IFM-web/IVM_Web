using IFM360.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Diagnostics;
using VMS_Web.Models;

namespace IFM360.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        CommanClass comman = new CommanClass();
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Login()
        {
            HttpContext.Session.Clear();
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(login obj)
        {

            string apiUrl = $"https://ifm360.in/ivmapi/api/ReceptionLogin/Login?emailID={obj.EmailId}&password={obj.Password}";

            DataTable dt = await comman.Fill(apiUrl);
            if (dt.Rows.Count != 0)
            {
                string mes = dt.Rows[0][0].ToString();
                if (mes != "fail")

                {
                    HttpContext.Session.SetString("EmailId", obj.EmailId);
                    HttpContext.Session.SetString("Password", obj.Password);
                    HttpContext.Session.SetString("CompanyName", dt.Rows[0]["company_name"].ToString());
                    HttpContext.Session.SetString("Companylogo", dt.Rows[0]["company_logo_url"].ToString());
                    HttpContext.Session.SetString("adminname", dt.Rows[0]["admin_name"].ToString());
                    HttpContext.Session.SetString("companyid", dt.Rows[0]["company_id"].ToString());
                    HttpContext.Session.SetString("locationid", dt.Rows[0]["location_id"].ToString());
                    HttpContext.Session.SetString("SessionId", dt.Rows[0]["SessionID"].ToString());
                    HttpContext.Session.SetString("UserType", dt.Rows[0]["UserType"].ToString());
                    if (dt.Rows[0]["UserType"].ToString() == "Admin") {
                        return RedirectToAction("Home", "AdminArea");
                    }
                    else if (dt.Rows[0]["UserType"].ToString() == "SuperAdmin")
                    {
                        return RedirectToAction("Home", "SuperAdmin");
                    }
                        return RedirectToAction("Index", "Admin");
                }
                else
                {
                    ViewBag.Massage = dt.Rows[0][1];
                }
            }
            else
            {
                ViewBag.Massage = "Invalid Email Id or Password !!";
            }
                return View();

        }
        public IActionResult TouchlessRegistration(string Id)
        {

            return View();
        }
        public async Task<IActionResult> EmployeeLogin()
        {
            HttpContext.Session.Clear();
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> EmployeeLogin(EmployeeLogin obj)
        {
            HttpContext.Session.Clear();

            string apiUrl = $"https://ifm360.in/ivmapi/api/EmployeeModule/EmployeeLogin?EmployeeEmailID={obj.EmailId}&password={obj.PIN}";

            DataTable dt = await comman.Fill(apiUrl);
            string mes = dt.Rows[0][0].ToString();
            if (mes == "1")

            {
                HttpContext.Session.SetString("EmpEmailId", obj.EmailId);
                HttpContext.Session.SetString("Password", obj.PIN.ToString());
                HttpContext.Session.SetString("EmployeeName", dt.Rows[0]["Name"].ToString());
                HttpContext.Session.SetString("Mobile", dt.Rows[0]["Mobile"].ToString());
                HttpContext.Session.SetString("department_id", dt.Rows[0]["department_id"].ToString());
                HttpContext.Session.SetString("location_id", dt.Rows[0]["location_id"].ToString());
                HttpContext.Session.SetString("Company_id", dt.Rows[0]["Company_id"].ToString());
                

                return RedirectToAction("UpComing", "Employee");
            }
            else
            {
                ViewBag.Massage = dt.Rows[0][1];
            }

            return View();
        }

        public IActionResult Register() => View();



        public async Task<IActionResult> Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }

        public async Task<IActionResult> EmployeeLogout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("EmployeeLogin");
        }

        public IActionResult CreatePin() => View();
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
