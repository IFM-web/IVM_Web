using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.Data;
using IFM360.Models;
namespace IFM360.AuthFilter
{

    public class AuthenticationFilter : ActionFilterAttribute
    {
        CommanClass comman = new CommanClass();
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            try {
                var Emailid = context.HttpContext.Session.GetString("EmailId");
                var Password = context.HttpContext.Session.GetString("Password");

                if (string.IsNullOrEmpty(Emailid))
                {
                    var controller = (Controller)context.Controller;
                    context.Result = new RedirectToActionResult("Login", "Home", null);

                }
                else
                {

                    string apiUrl = $"https://ifm360.in/ivmapi/api/FirstTimeVisitor/AppSetupflags" +
                                 $"?emailID={Uri.EscapeDataString(Emailid)}&password={Uri.EscapeDataString(Password)}";
                    DataTable dt = comman.Filldb(apiUrl);

                    context.HttpContext.Session.SetString("SessionID", dt.Rows[0]["SessionID"].ToString());
                    context.HttpContext.Session.SetString("visitor_photo_flag", dt.Rows[0]["visitor_photo_flag"].ToString());
                    context.HttpContext.Session.SetString("visitor_id_flag", dt.Rows[0]["visitor_id_flag"].ToString());
                    context.HttpContext.Session.SetString("additional_details_flag", dt.Rows[0]["additional_details_flag"].ToString());
                    context.HttpContext.Session.SetString("card_number_flag", dt.Rows[0]["card_number_flag"].ToString());
                    context.HttpContext.Session.SetString("company_name_flag", dt.Rows[0]["company_name_flag"].ToString());
                    context.HttpContext.Session.SetString("disclaimer_flag", dt.Rows[0]["disclaimer_flag"].ToString());
                    context.HttpContext.Session.SetString("purpose_flag", dt.Rows[0]["purpose_flag"].ToString());
                    context.HttpContext.Session.SetString("whom_to_meet_flag", dt.Rows[0]["whom_to_meet_flag"].ToString());
                    context.HttpContext.Session.SetString("name_flag", dt.Rows[0]["name_flag"].ToString());
                    context.HttpContext.Session.SetString("mobile_no_flag", dt.Rows[0]["mobile_no_flag"].ToString());
                    context.HttpContext.Session.SetString("otp_verification_flag", dt.Rows[0]["otp_verification_flag"].ToString());
                    context.HttpContext.Session.SetString("type_of_visitor_flag", dt.Rows[0]["type_of_visitor_flag"].ToString());
                    context.HttpContext.Session.SetString("temperature_flag", dt.Rows[0]["temperature_flag"].ToString());
                    context.HttpContext.Session.SetString("vehicle_flag", dt.Rows[0]["vehicle_flag"].ToString());
                    context.HttpContext.Session.SetString("laptop_flag", dt.Rows[0]["laptop_flag"].ToString());

                }


            
            }
            catch(Exception ex)
            {
                context.Result = new RedirectToActionResult("Login", "Home", new { Message="Server Side Issue" });
            }

        }
    }
    
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               