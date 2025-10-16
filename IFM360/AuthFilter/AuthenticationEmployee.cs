using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.Data;
using IFM360.Models;
namespace IFM360.AuthFilter
{

    public class AuthenticationEmployee : ActionFilterAttribute
    {
        CommanClass comman = new CommanClass();
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            try {
                var Emailid = context.HttpContext.Session.GetString("EmpEmailId");
                var Password = context.HttpContext.Session.GetString("Password");

                if (string.IsNullOrEmpty(Emailid))
                {
                    var controller = (Controller)context.Controller;
                    context.Result = new RedirectToActionResult("EmployeeLogin", "Home", null);

                }
                else
                {

                    string apiUrl1 = $"https://ifm360.in/ivmapi/api/EmployeeModule/AppSetupflags?EmployeeEmailID={Emailid}";
                    DataTable dt1 =  comman.Filldb(apiUrl1);
                    var res = dt1.Rows[0] != null ? dt1.Rows[0].ToString() : "";
                    if (res != "fail")
                    {
                        context.HttpContext.Session.SetString("employee_visitor_photo_flag", dt1.Rows[0]["visitor_photo_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_visitor_id_flag", dt1.Rows[0]["visitor_id_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_additional_details_flag", dt1.Rows[0]["additional_details_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_card_number_flag", dt1.Rows[0]["card_number_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_company_name_flag", dt1.Rows[0]["company_name_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_disclaimer_flag", dt1.Rows[0]["disclaimer_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_purpose_flag", dt1.Rows[0]["purpose_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_whom_to_meet_flag", dt1.Rows[0]["whom_to_meet_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_name_flag", dt1.Rows[0]["name_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_mobile_no_flag", dt1.Rows[0]["mobile_no_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_otp_verification_flag", dt1.Rows[0]["otp_verification_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_type_of_visitor_flag", dt1.Rows[0]["type_of_visitor_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_temperature_flag", dt1.Rows[0]["temperature_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_laptop_flag", dt1.Rows[0]["laptop_flag"].ToString());
                        context.HttpContext.Session.SetString("employee_vehicle_flag", dt1.Rows[0]["vehicle_flag"].ToString());
                    }
                }



                }
            catch(Exception ex)
            {
                context.Result = new RedirectToActionResult("EmployeeLogin", "Home", new { Message="Server Side Issue" });
            }

        }
    }
    
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               