
using IFM360.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using VMS_Web.Models;
using IFM360.AuthFilter;
namespace IFM360.Controllers
{
    [AuthenticationFilter]
    public class AdminController : Controller
    {
        IConfiguration _config;
        CommanClass comman = new CommanClass();
 

        public AdminController(IConfiguration configuration)
        {
            _config = configuration;
          
        }
        public async Task<IActionResult> Index()
        {
            
            ViewBag.otp_verification_flag = HttpContext.Session.GetString("otp_verification_flag").ToString();
            return View();
        }

        public IActionResult VarifyOTP() => View();      
    
        public IActionResult SendOTP()
        {
            if (HttpContext.Session.GetString("mobile_no_flag") == "0")
            {
                return RedirectToAction("VisitorCheckin");
            }

            ViewBag.Emailid = HttpContext.Session.GetString("EmailId");
            ViewBag.Password = HttpContext.Session.GetString("Password");
            ViewBag.otp_verification_flag = HttpContext.Session.GetString("otp_verification_flag");
            return View();
        }
            
        public IActionResult ReceptionIn() => View();       
    
        public async Task<IActionResult> VisitorCheckin()    
        {

            ViewBag.SessionID = HttpContext.Session.GetString("SessionID");
            ViewBag.visitor_photo_flag = HttpContext.Session.GetString("visitor_photo_flag");
            ViewBag.visitor_id_flag = HttpContext.Session.GetString("visitor_id_flag");
            ViewBag.additional_details_flag = HttpContext.Session.GetString("additional_details_flag");
            ViewBag.card_number_flag = HttpContext.Session.GetString("card_number_flag");
            ViewBag.company_name_flag = HttpContext.Session.GetString("company_name_flag");
            ViewBag.disclaimer_flag = HttpContext.Session.GetString("disclaimer_flag");
            ViewBag.purpose_flag = HttpContext.Session.GetString("purpose_flag");
            ViewBag.whom_to_meet_flag = HttpContext.Session.GetString("whom_to_meet_flag");
            ViewBag.name_flag = HttpContext.Session.GetString("name_flag");
            ViewBag.mobile_no_flag = HttpContext.Session.GetString("mobile_no_flag");
            ViewBag.otp_verification_flag = HttpContext.Session.GetString("otp_verification_flag");
            ViewBag.type_of_visitor_flag = HttpContext.Session.GetString("type_of_visitor_flag");
            ViewBag.temperature_flag = HttpContext.Session.GetString("temperature_flag");
            ViewBag.vehicle_flag = HttpContext.Session.GetString("vehicle_flag");
            ViewBag.laptop_flag = HttpContext.Session.GetString("laptop_flag");
                  

            var employees = new List<Employee>();
            string ApiEmployee = $"https://ifm360.in/ivmapi/api/FirstTimeVisitor/GetEmployeeList?LocationID={HttpContext.Session.GetString("locationid")}"
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
            };
            
            ViewBag.EmployeeList= employees;
            return View();
        }

        public async Task<IActionResult> Sentotp(string mobileno)
        {
            string email = HttpContext.Session.GetString("EmailId");
            string password = HttpContext.Session.GetString("Password");

            string apiurl = @$"https://ifm360.in/ivmapi/api/firsttimevisitor/sendotp?emailid={email}&password={password}&mobileno={mobileno}";
            using (var httpclient = new HttpClient())
                    {
                HttpResponseMessage response = await httpclient.GetAsync(apiurl);

                if (response.IsSuccessStatusCode)
                {
                    string apiresponse = await response.Content.ReadAsStringAsync();

                    if(apiresponse != "OTP Send Sucessfully !!")
                    {
                        HttpContext.Session.SetString("Mob", mobileno);
                        return RedirectToAction("VarifyOTP");
                    }

                    return Json(JsonConvert.SerializeObject(apiresponse));

                }

            }
            return Json(JsonConvert.SerializeObject("failed to send otp!"));

        }

        public async Task<JsonResult> AddNewVistor(AddNewVisitor obj)
        {
            string email = HttpContext.Session.GetString("EmailId");
            string password = HttpContext.Session.GetString("Password");
            string apiurl = @$"https://ifm360.in/ivmapi/api/FirstTimeVisitor/AddNewVisitor";
            var dt = await comman.PostFill(apiurl,obj);
            return Json(JsonConvert.SerializeObject(dt));
        }
    
        public IActionResult CheckOut() => View();      
    
        public async Task<IActionResult> VisitorDashboard() => View();

    
        public async Task<IActionResult> PrintPass() => View();
       



       
    
        public async Task<IActionResult> RepeatedSendOTP(){
                            
            if (HttpContext.Session.GetString("mobile_no_flag").ToString() != "1")
            {
                TempData["Message"] = "This  Feature is Disabled";
                return RedirectToAction("Index");
            }
         
            return View();
        }

    
        public async Task<IActionResult> RepeatVisitor()
        {
            var employees = new List<Employee>();
            string ApiEmployee = $"https://ifm360.in/ivmapi/api/FirstTimeVisitor/GetEmployeeList?LocationID={HttpContext.Session.GetString("locationid")}"
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

            string EmailId = HttpContext.Session.GetString("EmailId");
            string Password = HttpContext.Session.GetString("Password");
            ViewBag.SessionID = HttpContext.Session.GetString("SessionID");
            ViewBag.visitor_photo_flag = HttpContext.Session.GetString("visitor_photo_flag");
            ViewBag.visitor_id_flag = HttpContext.Session.GetString("visitor_id_flag");
            ViewBag.additional_details_flag = HttpContext.Session.GetString("additional_details_flag");
            ViewBag.card_number_flag = HttpContext.Session.GetString("card_number_flag");
            ViewBag.company_name_flag = HttpContext.Session.GetString("company_name_flag");
            ViewBag.disclaimer_flag = HttpContext.Session.GetString("disclaimer_flag");
            ViewBag.purpose_flag = HttpContext.Session.GetString("purpose_flag");
            ViewBag.whom_to_meet_flag = HttpContext.Session.GetString("whom_to_meet_flag");
            ViewBag.name_flag = HttpContext.Session.GetString("name_flag");
            ViewBag.mobile_no_flag = HttpContext.Session.GetString("mobile_no_flag");
            ViewBag.otp_verification_flag = HttpContext.Session.GetString("otp_verification_flag");
            ViewBag.type_of_visitor_flag = HttpContext.Session.GetString("type_of_visitor_flag");
            ViewBag.temperature_flag = HttpContext.Session.GetString("temperature_flag");
            ViewBag.vehicle_flag = HttpContext.Session.GetString("vehicle_flag");
            ViewBag.laptop_flag = HttpContext.Session.GetString("laptop_flag");
            ViewBag.EmailId = EmailId;
            ViewBag.Password = Password;



            return View();
        }
    
        public async Task<IActionResult> SearchInviteCode()
        {
            string EmailId = HttpContext.Session.GetString("EmailId");
            string Password = HttpContext.Session.GetString("Password");
            ViewBag.EmailId = EmailId;
            ViewBag.Password = Password;
            return  View();
        }
    
        public async Task<IActionResult> InvitedVisitor()
        {
            string email = HttpContext.Session.GetString("EmailId");
            string password = HttpContext.Session.GetString("Password");
            if (email == null)
            {
                return RedirectToAction("Login");
            }
                    

            ViewBag.SessionID = HttpContext.Session.GetString("SessionID");
            ViewBag.visitor_photo_flag = HttpContext.Session.GetString("visitor_photo_flag");
            ViewBag.visitor_id_flag = HttpContext.Session.GetString("visitor_id_flag");
            ViewBag.additional_details_flag = HttpContext.Session.GetString("additional_details_flag");
            ViewBag.card_number_flag = HttpContext.Session.GetString("card_number_flag");
            ViewBag.company_name_flag = HttpContext.Session.GetString("company_name_flag");
            ViewBag.disclaimer_flag = HttpContext.Session.GetString("disclaimer_flag");
            ViewBag.purpose_flag = HttpContext.Session.GetString("purpose_flag");
            ViewBag.whom_to_meet_flag = HttpContext.Session.GetString("whom_to_meet_flag");
            ViewBag.name_flag = HttpContext.Session.GetString("name_flag");
            ViewBag.mobile_no_flag = HttpContext.Session.GetString("mobile_no_flag");
            ViewBag.otp_verification_flag = HttpContext.Session.GetString("otp_verification_flag");
            ViewBag.type_of_visitor_flag = HttpContext.Session.GetString("type_of_visitor_flag");
            ViewBag.temperature_flag = HttpContext.Session.GetString("temperature_flag");
            ViewBag.vehicle_flag = HttpContext.Session.GetString("vehicle_flag");
            ViewBag.laptop_flag = HttpContext.Session.GetString("laptop_flag");
            

            var employees = new List<Employee>();
            string ApiEmployee = $"https://ifm360.in/ivmapi/api/FirstTimeVisitor/GetEmployeeList?LocationID={HttpContext.Session.GetString("locationid")}"
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

        public IActionResult PreInvitedDashboard()
        {
            return View();
        }
       


    }
}
