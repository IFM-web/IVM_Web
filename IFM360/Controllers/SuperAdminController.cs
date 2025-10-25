using IFM360.AuthFilter;
using IFM360.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using Newtonsoft.Json;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
namespace IFM360.Controllers
{
    [AuthenticationAdmin]
    public class SuperAdminController : Controller
    {
        db_Utility _db = new db_Utility();
        private readonly string Emailid;
        private readonly string Password;
        public SuperAdminController(IHttpContextAccessor httpContextAccessor)
        {
            Emailid = httpContextAccessor.HttpContext.Session.GetString("EmailId");
            Password = _db.GetMD5(httpContextAccessor.HttpContext.Session.GetString("Password"));
        }
        public IActionResult Home()
        {

            return View();
        }

        public JsonResult GetAdminDashboard()
        {
            var ds = _db.Fill($"udp_GetAdminDashboard '{Emailid}','{Password}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
        [HttpPost]
        public JsonResult addOffice(string Id,string OfficeName,string State,string Address, string IsShared)
        {
            if (Id == "0")
            {
                var ds = _db.Fill($"exec udp_Createbranch @BranchEmail='{Emailid}',@BranchPassword='{Password}',@BName='{OfficeName}',@BState='{State}',@BAddress='{Address}',@IsShared='{IsShared}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }
            else
            {
                var ds = _db.Fill($"exec udp_UpdateOffice @BranchEmail='{Emailid}',@BranchPassword='{Password}',@OfficeName='{OfficeName}',@OfficeState='{State}',@OfficeAddress='{Address}',@OfficeShared='{IsShared}',@OfficeId='{Id}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));

            }
        }
        [HttpPost]
        public JsonResult DeleteOffice(string Id)
        {
            var ds = _db.Fill($"exec udp_DeleteOffice @BranchEmail='{Emailid}',@BranchPassword='{Password}',@OfficeId='{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
            
        public IActionResult ManageOffices(string? id)
        {
            if (id != "0")
            {
                var ds = _db.Fill($"exec [udp_GetSingleLocation] @Id='{id}'");
                var row = ds.Tables[0].Rows[0];
                ViewBag.location_id= row["location_id"];
                ViewBag.location_name = row["location_name"].ToString();
                ViewBag.address= row["address"].ToString();
                ViewBag.state_city = row["state_city"].ToString();
                ViewBag.IsSharedSpace =Convert.ToBoolean(row["IsSharedSpace"]);
                return View();
            }
            ViewBag.location_id = "0";
            ViewBag.location_name = "";
            ViewBag.address = "";
            ViewBag.state_city = "";
            ViewBag.IsSharedSpace = false;
            return View();
        }


        public IActionResult Company(string Id)
        {
            ViewBag.locationId = Id;
           
            return View();
        }
        public IActionResult CompanyList(string Id)
        {
            ViewBag.locationId = Id;
            return View();
        }

        public JsonResult GetCompanylist(string Id)
        {
            var ds = _db.Fill($"exec udp_GetCompanyLogins '{Emailid}','{Password}',@LocationID='{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        public JsonResult GetCompanysingle(string Id)
        {
            var ds = _db.Fill($"exec udp_GetSingleCompanyLogins @Id='{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        public JsonResult AddCompany(string Id, int locatinid, string CName, string CAddress)
        {
            if (Id == null)
            {
                var ds = _db.Fill($"exec udp_AddCompany  @BranchEmail='{Emailid}',@BranchPassword='{Password}',@CName='{CName}',@CAddress='{CAddress}',@LocationAutoID='{locatinid}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }
            else
            {
                var ds = _db.Fill($"exec udp_UpdateCompany  @BranchEmail='{Emailid}',@BranchPassword='{Password}',@CmpName='{CName}',@CmpAddress='{CAddress}',@CmpAutoID='{locatinid}',@CmpId='{Id}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }
        }

        public JsonResult DeleteCompany(string Id)
        {
            var ds = _db.Fill($"exec udp_DeleteCompany '{Emailid}','{Password}',@CmpId='{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }


        public IActionResult CreateAdmin(string Id, string? branch_id)
        {
            ViewBag.locationId = Id;
            if (branch_id != null)
            {
                var ds = _db.Fill($"exec udp_GetSingleAdmin @BranchId='{branch_id}'");
                var row = ds.Tables[0].Rows[0];
                ViewBag.admin_email = row["admin_email"].ToString();
                ViewBag.admin_mobile = row["admin_mobile"].ToString();
                ViewBag.admin_password = row["admin_password"].ToString();
                ViewBag.branch_id = row["branch_id"].ToString();

                string fullName = row["admin_name"].ToString();               
                string[] nameParts = fullName.Split(' ');
                string firstName = "";
                string lastName = "";
                if (nameParts.Length > 0)
                    firstName = nameParts[0];
                if (nameParts.Length > 1)
                    lastName = string.Join(" ", nameParts.Skip(1));
                ViewBag.FirstName = firstName;
                ViewBag.LastName = lastName;
                return View();
            }
            ViewBag.admin_email = "";
            ViewBag.admin_mobile = "";
            ViewBag.admin_password = "";
            ViewBag.FirstName = "";
            ViewBag.LastName = "";
            ViewBag.branch_id ="0";
            return View();
        }
       public JsonResult GetAdminlist(string Id)
        {
            var ds = _db.Fill($"exec udp_GetAdminLogins '{Emailid}','{Password}',@LocationID='{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
       public JsonResult DeleteAdmin(string Id)
        {
            var ds = _db.Fill($"exec udp_DeleteAdmin '{Emailid}','{Password}',@BranchId='{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }



        [HttpPost]
       public JsonResult AddAdmin(string Id, int locatinid, string Mobile,string AdminName,string AdminEmail,string AdminPassword)
        {
            if (Id == "0")
            {
                string no = Mobile;
                string[] numberArray = new string[no.Length];
                int counter = 0;

                for (int i = 0; i < no.Length; i++)
                {
                    numberArray[i] = no.Substring(counter, 1);
                    counter++;
                }
                string DefaultOTP;
                DefaultOTP = Convert.ToString(numberArray[0]) + Convert.ToString(numberArray[1]) + Convert.ToString(numberArray[8]) + Convert.ToString(numberArray[9]);
            
                var ds = _db.Fill($"exec udp_AddAdmin  @BranchEmail='{Emailid}',@BranchPassword='{Password}',@AName='{AdminName}',@AEmail='{AdminEmail}',@AMobile='{Mobile}',@APwd='{_db.GetMD5(AdminPassword)}',@DefaultOTP='{DefaultOTP}',@LocationAutoID='{locatinid}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }
            else
            {
                var ds = _db.Fill($"exec udp_UpdateAdmin  @BranchEmail='{Emailid}',@BranchPassword='{Password}',@AdminName='{AdminName}',@AdminEmail='{AdminEmail}',@AdminMobile='{Mobile}',@AdminId='{Id}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }

            
        }

    
        public IActionResult CreateAdminList(string Id) {
            ViewBag.locationId = Id;
          return View();
        }

        public IActionResult CreateReception(string Id,string? RecpId) {
            ViewBag.locationId = Id;
            ViewBag.RecpId = RecpId;
            return View(); }
        public IActionResult CreateReceptionList(string Id) {
            ViewBag.locationId = Id;


            return View(); 
        }

        public JsonResult GetReceptionlist(string Id)
        {
            var ds = _db.Fill($"exec udp_GetReceptionLogins '{Emailid}','{Password}',@LocationID='{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        public JsonResult GetReceptionSingle(string Id)
        {
            var ds = _db.Fill($"exec udp_GetSingleReceptionLogins @Id='{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        public JsonResult DeleteReception(string Id)
        {
            var ds = _db.Fill($"exec udp_DeleteRecption '{Emailid}','{Password}',@BranchId='{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        public JsonResult AddReception(string Id, int locatinid, string Mobile, string Name, string RecEmail, string RecPassword)
        {
         
            
            if(Id is null)
            {
                string no = Mobile;
                string[] numberArray = new string[no.Length];
                int counter = 0;
                for (int i = 0; i < no.Length; i++)
                {
                    numberArray[i] = no.Substring(counter, 1);
                    counter++;
                }
                string DefaultOTP;
                DefaultOTP = Convert.ToString(numberArray[0]) + Convert.ToString(numberArray[1]) + Convert.ToString(numberArray[8]) + Convert.ToString(numberArray[9]);
                var ds = _db.Fill($"exec udp_AddReception  @BranchEmail='{Emailid}',@BranchPassword='{Password}',@AName='{Name}',@AEmail='{RecEmail}',@AMobile='{Mobile}',@APwd='{_db.GetMD5(RecPassword)}',@DefaultOTP='{DefaultOTP}',@LocationAutoID='{locatinid}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }
            else
            {
                var ds = _db.Fill($"exec udp_UpdateReception  @BranchEmail='{Emailid}',@BranchPassword='{Password}',@RecpName='{Name}',@RecpEmail='{RecEmail}',@RecpMobile='{Mobile}',@RecpId='{Id}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }
          
        }

        public IActionResult ManageOfficesList()
        {
            var ds = _db.Fill($"exec udp_GetLoginCounter '{Emailid}','{Password}'");
            ViewBag.Total = ds.Tables[0].Rows[0]["Total"];
            return View();
        }

        public JsonResult GetManageOffices()
        {
            var ds = _db.Fill($"exec udp_GetLocations '{Emailid}','{Password}'");
         return  Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

      

        public IActionResult ManageVisitorType()
        {
            return View();
        }

        public JsonResult GetManageVisitorType()
        {
            var ds = _db.Fill($"exec udp_GetVisitorTypeSA '{Emailid}','{Password}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
        [HttpPost]
        public JsonResult AddVisitorType(int Id, string Name)
        {
            var ds = _db.Fill($"exec udp_InsertVisitorType '{Emailid}','{Password}','{Name}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
        public IActionResult ManageNotifications()
        {
            return View();
        }


        public JsonResult GetManageNotifications()
        {
            var ds = _db.Fill($"exec udp_GetNotificationsSA '{Emailid}','{Password}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }


        public JsonResult DeleteNotifications(string Id)
        {
            var ds = _db.Fill($"exec udp_DeleteNotification '{Emailid}','{Password}',@AutoID='{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        [HttpPost]
        public JsonResult addNotifications(string Id,string Notifications)
        {
            if (Id == "0")
            {
                var ds = _db.Fill($"exec udp_InsertNotification @BranchEmail='{Emailid}',@BranchPassword='{Password}',@Notification='{Notifications}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }
            else
            {
                var ds = _db.Fill($"exec udp_UpdateNotification @BranchEmail='{Emailid}',@BranchPassword='{Password}',@Notification='{Notifications}',@AutoID='{Id}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }
          
        }

        public IActionResult PrintPass(string Id)
        {

            var ds = _db.Fill($"exec [udp_GetDetailsForPass] '{Id}'");

            var dt = ds.Tables[0];
            ViewBag.visitor_name = dt.Rows[0]["visitor_name"];
            ViewBag.visitor_phone = dt.Rows[0]["visitor_phone"];
            ViewBag.visitor_company = dt.Rows[0]["visitor_company"];
            ViewBag.WhomToMeetName = dt.Rows[0]["WhomToMeetName"];
            ViewBag.Temperature = dt.Rows[0]["Temperature"];
            ViewBag.visitor_devices_list = dt.Rows[0]["visitor_devices_list"];
            ViewBag.visitor_checkIn = dt.Rows[0]["visitor_checkIn"];
            ViewBag.VisitorPhoto = dt.Rows[0]["VisitorPhoto"];
            ViewBag.company_name = dt.Rows[0]["company_name"];
            ViewBag.purposeOfVisit = dt.Rows[0]["purposeOfVisit"];
            ViewBag.cardID = dt.Rows[0]["cardID"];
            ViewBag.VehicleNo = dt.Rows[0]["VehicleNo"];
            ViewBag.LaptopSerialNo = dt.Rows[0]["LaptopSerialNo"];


            return View();
        }


        public JsonResult GetAppSettingAdmin()
        {
            var ds = _db.Fill($"udp_GetAppSettingAdmin '{Emailid}','{Password}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        public JsonResult GetAppSettingBranchFlags()
        {
            var ds = _db.Fill($"udp_BranchLogin '{Emailid}','{Password}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
        [HttpPost]
        public JsonResult UpdateFlags(int Flag, int Value)
        {
            var ds = _db.Fill($"udp_UpdateFlags @BranchEmail='{Emailid}',@BranchPassword='{Password}',@Flag='{Flag}',@Value='{Value}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
        public IActionResult Department()
        {

            return View();
        }
        public IActionResult Employee(string? Id)
        {
            ViewBag.Department = _db.PopulateDropDown($"exec udp_Department  @BranchEmail='{Emailid}',@BranchPassword='{Password}'");
            ViewBag.Id = Id;
            return View();
        }
        [HttpPost]
        public JsonResult InsertEmployee(string EmpId, string EName, string Email, string Mobile, int Dept)
        {
            if (EmpId == null)
            {
                var ds = _db.Fill($"exec udp_InsertEmployeeAdmin @BranchEmail='{Emailid}',@BranchPassword='{Password}',@Ename='{EName}',@Eemail='{Email}',@Emobile='{Mobile}',@Edepartment='{Dept}',@Epassword=''");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }
            else
            {
                var ds = _db.Fill($"exec udp_UpdateEmployeeAdmin @BranchEmail='{Emailid}',@BranchPassword='{Password}',@EmpId ='{EmpId}',@EmpName='{EName}',@EmpEmail='{Email}',@EmpMobile='{Mobile}',@EmpDept='{Dept}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }

        }
        [HttpPost]
        public JsonResult DeleteEmployee(string Id)
        {
            var ds = _db.Fill($"exec udp_DeleteEmployee @BranchEmail='{Emailid}',@BranchPassword='{Password}',@EmpId='{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }

        public IActionResult EmployeeList()
        {

            return View();
        }
      
        public IActionResult EmployeeBulkUpload()
        {
            ViewBag.office = _db.PopulateDropDown(@$"exec udp_GetOffices '{Emailid}','{Password}'");
            return View();
        }
        public JsonResult GetEmployeeList()
        {
            var ds = _db.Fill($"udp_GetEmployeeListSA '{Emailid}','{Password}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
        public JsonResult GetEmployeesingle(string Id)
        {
            var ds = _db.Fill($"udp_GetSingleEmployee '{Id}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        public JsonResult GetDepartmentList()
        {
            var ds = _db.Fill($"exec udp_GetDepartmentListSA @BranchEmail='{Emailid}',@BranchPassword='{Password}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }
        [HttpPost]
        public JsonResult InsertDepartment(string DeptName, string Id)
        {
            if (Id == "0")
            {
                var ds = _db.Fill($"exec [udp_InsertDepartment] @BranchEmail='{Emailid}',@BranchPassword='{Password}',@Department='{DeptName.Trim()}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }
            else
            {
                var ds = _db.Fill($"exec udp_UpdateDepartment @BranchEmail='{Emailid}',@BranchPassword='{Password}',@Department='{Id.Trim()}',@DepartmentName='{DeptName.Trim()}'");
                return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            }

        }
        [HttpDelete]
        public JsonResult DeleteDepartment(string Id)
        {
            var ds = _db.Fill($"exec [udp_DeleteDepartment] @BranchEmail='{Emailid}',@BranchPassword='{Password}',@Department='{Id.Trim()}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }
        public IActionResult AdminVisitorHistory()
        {
            return View();
        }

        public JsonResult GetVisitorHistoryList(string Sdate, string Edate)
        {
            var ds = _db.Fill($"exec udp_GetVisitorHistory @BranchEmail='{Emailid}',@BranchPassword='{Password}',@FromDate='{Sdate}',@ToDate='{Edate}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }
        #region PreInvite Visitor
        public IActionResult PreInviteVisitor()
        {
            return View();
        }
        public JsonResult GetPreInviteVisitor(string Sdate, string Edate)
        {
            var ds = _db.Fill($"exec udp_GetPreInviteV2VisitorsAdmin @BranchEmail='{Emailid}',@BranchPassword='{Password}',@FromDate='{Sdate}',@ToDate='{Edate}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }

        #endregion

        #region Visitor Blacklisting
        public IActionResult VisitorBlacklisting()
        {
            return View();
        }
        public JsonResult GetVisitorBlacklisting()
        {
            var ds = _db.Fill($"exec udp_GetVisitorBlacklisted @BranchEmail='{Emailid}',@BranchPassword='{Password}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }
        [HttpPost]
        public JsonResult DeleteVisitorBlacklisted(string Id)
        {
            var ds = _db.Fill($"exec udp_DeleteVisitorBlacklisting @BranchEmail='{Emailid}',@BranchPassword='{Password}',@AutoID='{Id.Trim()}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }

        [HttpPost]
        public JsonResult InsertVisitorBlacklisted(string MobileNo)
        {
            var ds = _db.Fill($"exec udp_InsertVisitorBlacklist @BranchEmail='{Emailid}',@BranchPassword='{Password}',@VisitorMobile='{MobileNo.Trim()}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }
        #endregion


        #region Report
        public IActionResult Report()
        {
            var ds = _db.Fill($"udp_GetReportValues '{Emailid}','{Password}'");
            ViewBag.CheckIn = ds.Tables[0].Rows[0]["CheckIN"];
            ViewBag.CheckOut = ds.Tables[0].Rows[0]["CheckOut"];
            ViewBag.Accepted = ds.Tables[0].Rows[0]["Accepted"];
            ViewBag.Rejected = ds.Tables[0].Rows[0]["Rejected"];
            ViewBag.Waiting = ds.Tables[0].Rows[0]["Waiting"];
            ViewBag.Invited = ds.Tables[0].Rows[0]["Invited"];
            return View();
        }

        public JsonResult GetAllVisitorDataAdmin()
        {
            var ds = _db.Fill($"udp_GetAllVisitorData '{Emailid}','{Password}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        public JsonResult GetDateRangeVisitorListAdmin(string Sdate, string Edate)
        {
            var ds = _db.Fill($"udp_GetDateRangeVisitorList @BranchEmail='{Emailid}',@BranchPassword='{Password}',@FromDate='{Sdate}',@ToDate='{Edate}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        public JsonResult GetReportDetailsAdmin(string Sdate, string Edate, int Flag)
        {
            var ds = _db.Fill($"udp_GetReportDetails @BranchEmail='{Emailid}',@BranchPassword='{Password}',@FromDate='{Sdate}',@ToDate='{Edate}',@Flag='{Flag}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
        #endregion
        public JsonResult Checkout(string Id)
        {
            var ds = _db.Fill($"exec [udp_CheckOutDashboard] @BranchEmail='{Emailid}',@BranchPassword='{Password}',@Visitorid='{Id.Trim()}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
        public IActionResult Setting()
        {
            return View();
        }

        [HttpPost]
        public JsonResult ChangePassword(string oldPassword, string NewPassword)
        {

            var ds = _db.Fill($"udp_ChangePassword @BranchEmail='{Emailid}',@BranchPassword='{Password}',@CPwd='{_db.GetMD5(oldPassword)}',@NPwd='{_db.GetMD5(NewPassword)}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }


        [HttpPost]
        public ActionResult ImportExcel()
        {
            try
            {
                string sqlQuery = string.Empty;
                IFormFile file = Request.Form.Files[0];
                string Office = Request.Form["office"].ToString();
                string folderName = "wwwroot";
                string extension = Path.GetExtension(file.FileName);
                string filename = Path.GetFileNameWithoutExtension(file.FileName);
                string status = string.Empty;
                string Div = "";

                DataTable dt = new DataTable();
                DataSet ds = new DataSet();

                string webRootPath = filename + extension;
                string newPath = Path.Combine(folderName);

                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file != null)
                {
                    string sFileExtension = Path.GetExtension(file.FileName).ToLower();
                    ISheet sheet;
                    string fullPath = Path.Combine(newPath, file.FileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {

                        file.CopyTo(stream);

                        stream.Position = 0;
                        if (sFileExtension == ".xls")
                        {
                            HSSFWorkbook hssfwb = new HSSFWorkbook(stream);
                            sheet = hssfwb.GetSheetAt(0);
                        }
                        else
                        {
                            XSSFWorkbook hssfwb = new XSSFWorkbook(stream);

                            sheet = hssfwb.GetSheetAt(0);
                        }
                        IRow headerRow = sheet.GetRow(0);
                        int cellCount = headerRow.LastCellNum;

                        for (int j = 0; j < cellCount; j++)
                        {
                            NPOI.SS.UserModel.ICell cell = headerRow.GetCell(j);
                            if (cell == null || string.IsNullOrWhiteSpace(cell.ToString())) continue;
                            dt.Columns.Add(cell.ToString().Trim());
                            // dt.Columns.Add("RC" + col.ToString());
                        }
                        for (int rw = (sheet.FirstRowNum + 1); rw <= sheet.LastRowNum; rw++)
                        {
                            DataRow dr = dt.NewRow();
                            IRow row = sheet.GetRow(rw);
                            if (row == null) continue;
                            if (row.Cells.All(d => d.CellType == CellType.Blank)) continue;
                            for (int col = row.FirstCellNum; col < cellCount; col++)
                            {
                                if (row.GetCell(col) != null)

                                    //dr[col.ToString()] = dr[row.GetCell(col).ToString()];
                                    dr[col] = row.GetCell(col).ToString().Trim();
                            }
                            dt.Rows.Add(dr);
                        }


                        using (SqlConnection conn = new SqlConnection(DbConnect.ConnectionString))
                        using (SqlCommand cmd = new SqlCommand("udp_BulkEmployeeUploadSA", conn))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;

                            // Parameters

                            SqlParameter tvpParam = cmd.Parameters.AddWithValue("@EmployeeData", dt);
                            tvpParam.SqlDbType = SqlDbType.Structured;

                            //string[] excludedTypes = { "SocietyUpload", "Cluster", "EmpSocietyMapping" };



                            cmd.Parameters.AddWithValue("@BranchEmail", Emailid);
                            cmd.Parameters.AddWithValue("@BranchPassword", Password);
                            cmd.Parameters.AddWithValue("@Office", Office);
                            filename = file.FileName;
                            if (System.IO.File.Exists(fullPath))
                            {
                                System.IO.File.Delete(fullPath);
                            }

                            DataTable result = new DataTable();
                            using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                            {
                                da.Fill(result);

                            }

                            return Json(JsonConvert.SerializeObject(result));

                        }




                    }

                }
                return Json(JsonConvert.SerializeObject(status));
            }
            catch (ExternalException ex)
            {

                return Json(JsonConvert.SerializeObject(new[] { new { Meassge = (ex.Message) } }));
            }

        }


    }
}
