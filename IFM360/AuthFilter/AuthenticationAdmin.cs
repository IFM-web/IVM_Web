using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Data;
using IFM360.Models;
namespace IFM360.AuthFilter
{

    public class AuthenticationAdmin : ActionFilterAttribute
    {

        db_Utility _db = new db_Utility();

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            try {
                var Emailid = context.HttpContext.Session.GetString("EmailId");
                var Password = _db.GetMD5(context.HttpContext.Session.GetString("Password"));

                if (string.IsNullOrEmpty(Emailid))
                {
                    var controller = (Controller)context.Controller;
                    context.Result = new RedirectToActionResult("Login", "Home", null);

                }
                else
                {
                    var ds = _db.Fill($"udp_GetAppSettingAdmin '{Emailid}','{Password}'");

                   
                    var res = ds.Tables[0].Rows[0] != null ? ds.Tables[0].Rows[0].ToString() : "";
                    if (res != "fail")
                    {
                        var dt1 = ds.Tables[0];
                     
                        context.HttpContext.Session.SetString("isCardAllowed", dt1.Rows[0]["isCardAllowed"].ToString());
                        context.HttpContext.Session.SetString("isCompanyAllowed", dt1.Rows[0]["isCompanyAllowed"].ToString());                  
                        context.HttpContext.Session.SetString("purpose_flag", dt1.Rows[0]["purpose_flag"].ToString());
                        context.HttpContext.Session.SetString("whom_to_meet_flag", dt1.Rows[0]["whom_to_meet_flag"].ToString());
                        context.HttpContext.Session.SetString("name_flag", dt1.Rows[0]["name_flag"].ToString());
                        context.HttpContext.Session.SetString("mobile_no_flag", dt1.Rows[0]["mobile_no_flag"].ToString());                      
                        context.HttpContext.Session.SetString("Type_Of_Visitor_Flag", dt1.Rows[0]["Type_Of_Visitor_Flag"].ToString());
                        context.HttpContext.Session.SetString("Temperature", dt1.Rows[0]["Temperature"].ToString());
                        context.HttpContext.Session.SetString("laptop_Flag", dt1.Rows[0]["laptop_Flag"].ToString());
                        context.HttpContext.Session.SetString("Vehicle_Flag", dt1.Rows[0]["Vehicle_Flag"].ToString());
                        context.HttpContext.Session.SetString("company_id", dt1.Rows[0]["company_id"].ToString());
                        context.HttpContext.Session.SetString("Masking_Flag", dt1.Rows[0]["Masking_Flag"].ToString());
                    }
                }



                }
            catch(Exception ex)
            {
                context.Result = new RedirectToActionResult("Login", "Home", new { Message="Server Side Issue" });
            }

        }
    }
    
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               