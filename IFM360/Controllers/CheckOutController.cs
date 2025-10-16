using Microsoft.AspNetCore.Mvc;
using IFM360.AuthFilter;
namespace IFM360.Controllers
{
    [AuthenticationFilter]
    public class CheckOutController : Controller
    {
        public IActionResult Index() => View();

        public IActionResult CheckOutByPhone()=>View();
       
        public IActionResult CheckOutByCard()=>View();
   
    }
}
