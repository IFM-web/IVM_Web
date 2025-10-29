using Microsoft.AspNetCore.Mvc;
using IFM360.AuthFilter;
namespace IFM360.Controllers
{
    [AuthenticationFilter]
    public class CheckOutController : Controller
    {
        public IActionResult Index() => View();

        public IActionResult CheckOutByPhone() {


            ViewBag.Masking_Flag = HttpContext.Session.GetString("Masking_Flag");

            return View(); }
       
        public IActionResult CheckOutByCard()
        {


            ViewBag.Masking_Flag = HttpContext.Session.GetString("Masking_Flag");

            return View();
        }

    }
}
