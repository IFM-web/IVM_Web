using Humanizer;
using IFM360.AuthFilter;
using IFM360.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using Newtonsoft.Json;
using NPOI.HSSF.UserModel;
using NPOI.SS.Formula.Functions;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.InteropServices;
using System.Text;
namespace IFM360.Controllers
{
    [AuthenticationAdmin]
    public class AdminAreaController : Controller
    {
        db_Utility _db = new db_Utility();
        private readonly string Emailid;
        private readonly string Password;
        public AdminAreaController(IHttpContextAccessor httpContextAccessor)
        {
            Emailid =httpContextAccessor.HttpContext.Session.GetString("EmailId");
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


        public IActionResult PrintPass(string Id) {

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


          return  View();
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
        public JsonResult UpdateFlags(int Flag,int Value)
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
        public JsonResult InsertEmployee(string EmpId,string EName,string Email,string Mobile,int Dept)
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
            return View();
        }
        public JsonResult GetEmployeeList()
        {
            var ds = _db.Fill($"udp_GetEmployeeListAdmin '{Emailid}','{Password}'");
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
        public JsonResult InsertDepartment(string DeptName,string Id)
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
        [HttpPost]
        public JsonResult DeleteDepartment(string Id)
        {
            var ds = _db.Fill($"exec [udp_DeleteDepartment] @BranchEmail='{Emailid}',@BranchPassword='{Password}',@Department='{Id.Trim()}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
            
        }
        public IActionResult AdminVisitorHistory()
        {
            return View();
        }

        public JsonResult GetVisitorHistoryList(string Sdate,string Edate)
        {
            var ds = _db.Fill($"exec udp_GetVisitorHistoryAdmin @BranchEmail='{Emailid}',@BranchPassword='{Password}',@FromDate='{Sdate}',@ToDate='{Edate}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }
        #region PreInvite Visitor
        public IActionResult PreInviteVisitor()
        {
            return View();
        }
        public JsonResult GetPreInviteVisitor(string Sdate, string Edate)
        {
            var ds = _db.Fill($"exec udp_GetPreInviteVisitorsAdmin @BranchEmail='{Emailid}',@BranchPassword='{Password}',@FromDate='{Sdate}',@ToDate='{Edate}'");
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
            var ds = _db.Fill($"udp_GetReportValuesAdmin '{Emailid}','{Password}'");
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
            var ds = _db.Fill($"udp_GetAllVisitorDataAdmin '{Emailid}','{Password}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        public JsonResult GetDateRangeVisitorListAdmin(string Sdate,string Edate)
        {
            var ds = _db.Fill($"udp_GetDateRangeVisitorListAdmin @BranchEmail='{Emailid}',@BranchPassword='{Password}',@FromDate='{Sdate}',@ToDate='{Edate}'");
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }

        public JsonResult GetReportDetailsAdmin(string Sdate,string Edate,int Flag)
        {
            var ds = _db.Fill($"udp_GetReportDetailsAdmin @BranchEmail='{Emailid}',@BranchPassword='{Password}',@FromDate='{Sdate}',@ToDate='{Edate}',@Flag='{Flag}'");
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
        public JsonResult ChangePassword(string oldPassword,string  NewPassword)
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
                string Type = Request.Form["Type"].ToString();
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
                            cmd.Parameters.AddWithValue("@Office", HttpContext.Session.GetString("locationid") );
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
            catch (ExternalException ex)           {

                               return Json(JsonConvert.SerializeObject(new[] { new { Meassge = (ex.Message) } }));
            }

        }


    }
}
