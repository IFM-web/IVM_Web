using System.Data;
using System.Data.SqlClient;
using System.Net.Mail;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Security.Cryptography;
using IFM360.Models;

namespace IFM360
{

    
    public class db_Utility
    {
        ClsUtility util = new ClsUtility(); 

        public readonly string strElect = DbConnect.ConnectionString;

		public string execQuery(string query)
        {
            using (SqlConnection sqcon = new SqlConnection(DbConnect.ConnectionString))
            {
                SqlTransaction SqlTran = null;
                DataTable dt = new DataTable();
                try
                {
                    if (sqcon.State == ConnectionState.Open)
                    { sqcon.Close(); }
                    sqcon.Open();
                    SqlTran = sqcon.BeginTransaction();
                    SqlCommand sqcmd = new SqlCommand(query, sqcon, SqlTran);
                    sqcmd.CommandTimeout = 0;

                    SqlDataAdapter SqlDa = new SqlDataAdapter(sqcmd);
                    SqlDa.Fill(dt);

                    SqlTran.Commit();
                    if (dt.Rows.Count > 0)
                    {
                        query = dt.Rows[0]["Message"].ToString();
                    }
                    else
                    {
                        query = "Successfull";
                    }

                }
                catch (Exception exce)
                {
                    query = "Transaction Rolleutilck. Due to " + exce.Message;
                    util.WriteLogFile("Errorlog", "input'" + query + "---Output--" + exce.Message + "'", "", "", "", "", "", "", "Fill");
                }
                finally
                {
                    sqcon.Close();
                }
            }
            return query;
        }
        public DataSet Fill(string sql)
        {
            DataSet ds = new DataSet();
            util.WriteLogFile("Apilog", "input'" + sql + "'", "", "", "", "", "", "", "Fill");
            using (SqlConnection sqcon = new SqlConnection(DbConnect.ConnectionString))
            {
                try
                {
                    SqlCommand sqcmd = new SqlCommand(sql, sqcon);
                    sqcmd.CommandTimeout = 0;
                    SqlDataAdapter SqlDa = new SqlDataAdapter(sqcmd);
                    SqlDa.Fill(ds);
                }
                catch (Exception exce)
                {
                    DataSet dset = new DataSet();
                    DataTable dt = new DataTable();
                    dt.Columns.Add("Data");
                    dt.Columns.Add("mail");
                    dt.Columns.Add("sms");
                    DataRow dr = dt.NewRow();

                    dr["Data"] = "{\"Message\":\"" + exce.Message + "\",\"Status\":\"error\",\"Data\":\"[]\"}";
                    dr["mail"] = "[]";
                    dr["sms"] = "[]";
                    dt.Rows.Add(dr);
                    dset.Tables.Add(dt);

                    util.WriteLogFile("Errorlog", "input'" + sql + "---Output--" + exce.Message + "'", "", "", "", "", "", "", "Fill");
                    return dset;

                }
            }
            return ds;
        }

        #region Encrypt

        public  string GetMD5(string pas)
        {
            using (var md5 = MD5.Create())
            {
                var inpbyte = Encoding.ASCII.GetBytes(pas);
                var hashbyte = md5.ComputeHash(inpbyte);
                return BitConverter.ToString(hashbyte).Replace("-", "").ToUpperInvariant();
            }
        }
        #endregion

        public string FixQuotes(string strValue)
        {
            string strRestrict = "";
            strRestrict = strValue.Replace("'", "");
            string[] badstuffs = { ";", "--", "xp_", "*", "<", ">", "[", "]", "(", ")", "select", "union", "drop", "insert", "delete", "update" };
            if (strRestrict != "")
            {
                for (int i = 0; i < badstuffs.Length; i++)
                {
                    strRestrict = strRestrict.Replace(badstuffs[i], "").Trim();
                }
            }
            else
            {
                strRestrict = "";
            }
            return strRestrict;
        }
       
        
        public List<SelectListItem> PopulateDropDown(string Query, string select = "")
        {
            DataTable dt = new DataTable();
            List<SelectListItem> ddl = new List<SelectListItem>();
            try
            {

                using (SqlConnection con = new SqlConnection(DbConnect.ConnectionString))
                using (SqlCommand cmd = new SqlCommand(Query, con))
                {
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        da.Fill(dt);
                }
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        ddl.Add(new SelectListItem { Text = dt.Rows[i][1].ToString(), Value = dt.Rows[i][0].ToString() });
                    }
                }
                if (select != "")
                {
                    var selddl = ddl.ToList().Where(x => x.Value == select).First();
                    selddl.Selected = true;
                }

            }
            catch (Exception ex)
            {
                util.WriteLogFile("Errorlog", "input'" + Query + "---Output--" + ex.Message + "'", "", "", "", "", "", "", "Fill");
            }
            return ddl;
        }

        
    }

    public class ClsUtility
    {


     

        public void WriteLogFile(string LogPath, string Query, string Button, string Page, string IP, string BrowserName, string BrowerVersion, string javascript, string function)
        {
            try
            {

                if (!string.IsNullOrEmpty(Query))
                {
                    string path = Path.Combine("wwwroot/LOG/" + LogPath + "/" + System.DateTime.UtcNow.ToString("dd-MM-yyyy") + ".txt");

                    if (!File.Exists(path))
                    {
                        File.Create(path).Dispose();

                        using (System.IO.FileStream file = new FileStream(path, FileMode.Append, FileAccess.Write))
                        {

                            StreamWriter streamWriter = new StreamWriter(file);

                            streamWriter.WriteLine((((((((System.DateTime.Now + " - ") + Query + " - ") + Button + " - ") + Page + " - ") + IP + " - ") + BrowserName + " - ") + BrowerVersion + " - ") + javascript + function);

                            streamWriter.Close();

                        }
                    }
                    else
                    {
                        using (System.IO.FileStream file = new FileStream(path, FileMode.Append, FileAccess.Write))
                        {

                            StreamWriter streamWriter = new StreamWriter(file);

                            streamWriter.WriteLine((((((((System.DateTime.Now + " - ") + Query + " - ") + Button + " - ") + Page + " - ") + IP + " - ") + BrowserName + " - ") + BrowerVersion + " - ") + javascript + function);

                            streamWriter.Close();

                        }
                    }

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        public string SendMailViaIIS_html(string from, string to, string cc, string bcc, string subject, string attach, string _body, IConfiguration iConfig, string MAIL_PASSWORD, string Host, string attachPath = "")
        {
            //create the mail message
            string functionReturnValue = null;
            string _from = from, _to = to, _cc = cc, _bcc = bcc, _subject = subject; //MAIL_PASSWORD = "15M7Y1998@$";
            try
            {
                System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
                //set the addresses
                if (_from.Trim().Length == 0)
                {
                    _from = "akash@bsdinfotech.com";
                    //_from = """Support Team"" support@indiastat.com"
                }
                mail.From = new System.Net.Mail.MailAddress(_from);

                if (_to.Trim().Length > 0)
                {
                    mail.To.Add(new System.Net.Mail.MailAddress(_to));
                }
                if (_cc.Trim().Length > 0)
                {
                    mail.CC.Add(new System.Net.Mail.MailAddress(_cc));
                }
                if (bcc.Trim().Length > 0 & bcc.Trim() != "none")
                {
                    mail.Bcc.Add(new System.Net.Mail.MailAddress(_bcc));
                }
                else if (bcc.Trim().Length == 0 & bcc.Trim() != "none")
                {
                    //mail.Bcc.Add(New system.net.mail.mailaddress("support@indiastat.com"))
                    //mail.Bcc.Add(New system.net.mail.mailaddress("diplnd07@gmail.com"))
                }

                if (!string.IsNullOrEmpty(attachPath))
                {
                    System.Net.Mail.Attachment attachment = new System.Net.Mail.Attachment(attachPath);
                    //create the attachment
                    mail.Attachments.Add(attachment);
                    //add the attachment
                }
                mail.Subject = _subject;
                mail.Body = _body;
                mail.IsBodyHtml = true;
                System.Net.Mail.SmtpClient SmtpClient = new System.Net.Mail.SmtpClient();
                //SmtpClient.Host = iConfig.GetSection("ISSMTPSERVER").Value;
                //SmtpClient.Port = Convert.ToInt32(iConfig.GetSection("ISSMTPPORT").Value);
                SmtpClient.Host = Host;//"mail.bsdinfotech.com";
                SmtpClient.Credentials = new NetworkCredential(_from, MAIL_PASSWORD);
                SmtpClient.Port = 25;
                SmtpClient.Send(mail);
                functionReturnValue = "Sent";
                mail.Dispose();
                SmtpClient = null;
            }
            catch (System.FormatException ex)
            {
                functionReturnValue = ex.Message;
            }
            catch (SmtpException ex)
            {
                functionReturnValue = ex.Message;
            }
            catch (System.Exception ex)
            {
                functionReturnValue = ex.Message;
            }
            return functionReturnValue;
        }



        public void SMSAPInewwithmsg(string msg)
        {

            // WriteLogFile(msg, "", "", "", "", "", "");

            HttpWebRequest myReq = (HttpWebRequest)WebRequest.Create(msg);


            //   HttpWebRequest myReq = (HttpWebRequest)WebRequest.Create("http://149.20.191.19/VSServices/SendSms.ashx?login=AjayKumar&pass=AjayKumar854D&text="+msg+"&from=ACKAFO&to=91"+mobno+"");

            HttpWebResponse myResp = (HttpWebResponse)myReq.GetResponse();
            System.IO.StreamReader respStreamReader = new System.IO.StreamReader(myResp.GetResponseStream());
            string responseString = respStreamReader.ReadToEnd();
            respStreamReader.Close();
            myResp.Close();
        }


    }

    public class EncryptionHelper
    {

        private static readonly string base64Key = "3Tm5W1cKj/8ZQ6d0hJHf89b+OQmLpNcHrs5eHspZpE8=";
        private static readonly byte[] Key = Convert.FromBase64String(base64Key);
        private static readonly byte[] IV = Encoding.UTF8.GetBytes("1234567890123456");
        public static string Encrypt(string plainText)
        {
            using (Aes aes = Aes.Create())
            {
                aes.KeySize = 256;
                aes.Key = Key;
                aes.IV = IV;

                using (var encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
                using (var ms = new MemoryStream())
                {
                    using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                    using (var writer = new StreamWriter(cs))
                    {
                        writer.Write(plainText);
                    }
                    return Convert.ToBase64String(ms.ToArray());
                }
            }
        }

        public static string Decrypt(string encryptedText)
        {
            using (Aes aes = Aes.Create())
            {
                aes.KeySize = 256;
                aes.Key = Key;
                aes.IV = IV;

                using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
                using (var ms = new MemoryStream(Convert.FromBase64String(encryptedText)))
                using (var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                using (var reader = new StreamReader(cs))
                {
                    return reader.ReadToEnd();
                }
            }
        }

    }

   
}

