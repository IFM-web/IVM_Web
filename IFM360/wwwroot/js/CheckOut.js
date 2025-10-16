
const SearchPhone = async () => {
    const EmailId = $("#EmailId").val();
    const Password = $("#Password").val();
    const PhoneNo = $("#txtphoneno").val();
    if (PhoneNo == "") {
        alert("Please Enter Phone Number");
        return;
    }
    if (EmailId == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();

    }
    fetch(`https://ifm360.in/ivmapi/api/Checkout/SearchVisitorByPhoneNo?emailID=${EmailId}&password=${Password}&mobileNo=${PhoneNo}`)
        .then(response => response.json())   
        .then(data => {
            //console.log(data);
            if (data[0].status == "fail") {
                alert(data[0].message)
            }
            else if (data[0].status == "success") {
                $(".ShowSection").addClass("d-none");
                showdetails(data[0], "mobileNo", PhoneNo)
                
            }
        })
        .catch(error => console.error("Error:", error));


}




const SearchCard = async () => {
    const EmailId = $("#EmailId").val();
    const Password = $("#Password").val();
    const CardNo = $("#txtCardNo").val();
    if (CardNo == "") {
        alert("Please Enter Card Number");
        return;
    }
    if (EmailId == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();

    }
    fetch(`https://ifm360.in/ivmapi/api/Checkout/SearchVisitorByCardNo?emailID=${EmailId}&password=${Password}&cardNo=${CardNo}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (data[0].status == "fail") {
                alert(data[0].message)
            }
            else if (data[0].status == "success") {
                $(".ShowSection").addClass("d-none");
                showdetails(data[0], "cardNo", CardNo)
            
              
            }
        })
        .catch(error => console.error("Error:", error));


}



function showdetails(data, type, phone) {
  
    console.log(data);
    let details = ` <div class="card shadow-sm border-1 rounded-3 p-3 mb-4 text-center" id="detailcard">
        <div class="row align-items-center">
            <div class="col-md-3">
                <img src="data:image/png;base64,${data.VisitorPhoto}" class="img-fluid rounded-3 border" id="VisitorPhoto" alt="Visitor Photo">
                    <small class="text-muted d-block mt-1">Visitor Photo</small>
            </div>
            <div class="col-md-3">
                <img src="data:image/png;base64,${data.VisitorId}" class="img-fluid rounded-3 border" id="VisitorID" alt="Visitor ID">
                    <small class="text-muted d-block mt-1">Visitor ID</small>
            </div>
            <div class="col-md-6 text-md-start text-center">
                <h5 class="fw-bold mb-1 text-uppercase">${data.visitor_name}</h5>
                <p class="mb-0 text-muted">Mobile Number: ${data.visitor_phone}</p>
                <p class="mb-2"><small>Last Visit: ${data.visitor_checkIn}</small></p>
               

            </div>
            <div class="d-flex justify-content-end">
             <button class="btn mx-2" style="background-color: #1E3A5F;  color: white;" onclick="Notme()">Not me</button>
             <button class="btn" style="background-color: #1E3A5F;  color: white;" onclick="CheckOut('${type}','${phone}')">Check Out</button>
             <div>
        </div>
    </div>`;
    $("#checkDetails").append(details);
}

function Notme() {
    $("#checkDetails").empty();
    $(".ShowSection").removeClass("d-none");

}

const CheckOut = async (type, CardNo) => {
    const EmailId = $("#EmailId").val();
    const Password = $("#Password").val();
    let typeName;

    if (type == "cardNo") {
        typeName = "CheckOutByCardNo"
    }
    else {
        typeName = "CheckOutByPhoneNo";
    }

    fetch(`https://ifm360.in/ivmapi/api/Checkout/${typeName}?emailID=${EmailId}&password=${Password}&${type}=${CardNo}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data[0].status == "fail") {
                alert(data[0].message)
            }
            else if (data[0].status == "success") {
                alert(data[0].message)
                window.location.href = localStorage.getItem("Url") +'/Admin/Index'
            }
        })
        .catch(error => console.error("Error:", error));
}