using Newtonsoft.Json;
using System.Data;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;

namespace IFM360.Models
{
    public class CommanClass
    {

        public async Task<DataTable> Fill(string ApiUrl)
        {
            DataTable dt =new DataTable();
            try
            {
                using (var httpClient = new HttpClient())
                {
                    HttpResponseMessage response = await httpClient.GetAsync(ApiUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();

                        dt = JsonConvert.DeserializeObject<DataTable>(apiResponse);

                    }
                    return dt;
                }
               
            }
            catch(Exception ex)
            {
                DataRow dr = dt.NewRow();

               
                dr["Status"] = "Error";
                dr["Message"] =ex.Message;

                dt.Rows.Add(dr);
             

                return dt;

            }
        }


        public async Task<DataTable> PostFill<T>(string ApiUrl, T data)
        {
            DataTable dt = new DataTable();
            try
            {
                var JonnObj = JsonConvert.SerializeObject(data);

                using (var httpClient = new HttpClient())
                {
                    var content = new StringContent(JonnObj, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await httpClient.PostAsync(ApiUrl, content);

                    if (response.IsSuccessStatusCode)
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();

                        dt = JsonConvert.DeserializeObject<DataTable>(apiResponse);

                    }
                    return dt;
                }

            }
            catch (Exception ex)
            {
                DataRow dr = dt.NewRow();


                dr["Status"] = "Error";
                dr["Message"] = ex.Message;

                dt.Rows.Add(dr);


                return dt;

            }
        }




        public  DataTable Filldb(string ApiUrl)

        {
            DataTable dt = new DataTable();
            try
            {


                using (var httpClient = new HttpClient())
                {
                    HttpResponseMessage response =  httpClient.GetAsync(ApiUrl).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        string apiResponse =  response.Content.ReadAsStringAsync().Result;

                        dt = JsonConvert.DeserializeObject<DataTable>(apiResponse);

                    }
                    return dt;
                }

            }
            catch (Exception ex)
            {
                DataRow dr = dt.NewRow();


                dr["Status"] = "Error";
                dr["Message"] = ex.Message;

                dt.Rows.Add(dr);


                return dt;

            }
        }


    }

}
