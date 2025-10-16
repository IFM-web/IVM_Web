const SendOTP = async () => {
    const EmailId = $("#EmailId").val();
    const Password = $("#Password").val();
    const VisitorMobile = $("#txtphoneno").val();
    if (VisitorMobile.length == 10) {
        if ($("#EmailId").val() == "") {
            alert("Session Expired, Please Login Again !!");
            window.location.reload();
        }
        const resp = await fetch(`https://ifm360.in/ivmapi/api/RegisteredVisitor/GetVisitorDetailsOnTheBasisOfMobile?emailID=${EmailId}&password=${Password}&mobileNo=${VisitorMobile}`);

        const result = await resp.json();
        console.log(result);

        if (result[0].message == "First Time Visitor" && result[0].status == "fail") {
            alert(result[0].message);
            window.location.href = localStorage.getItem("Url") + "/Admin/Index";
        }
        if (result[0].message == "visitor data get successfully!" && result[0].status == "success") {
            sessionStorage.setItem("UserDetails", JSON.stringify(result[0]));
            if ($("#otp_varify").val() == "1") {

                const response = await fetch(`https://ifm360.in/ivmapi/api/FirstTimeVisitor/SendOTP?emailID=${EmailId}&password=${Password}&MobileNo=${VisitorMobile}`);
                const data = await response.json();
                if (data == "OTP Send Sucessfully !!") {
                    console.log(data);

                    VarifyModal();

                }
                else {
                    alert(data);
                }

                return;
            }
            else {
                window.location.href = localStorage.getItem("Url") + "/Admin/RepeatVisitor";
            }
           
        }

        if (result[0].message == "Mobile Number not checkout earlier !" && result[0].status == "FailNotCheckOut") {
            alert(result[0].message);
            window.location.href = localStorage.getItem("Url") + "/Admin/Index";
        }

     

    } else {
        alert("Mobile Number Must be 10 Digits");
    }

}



function VarifyModal() {
    const modal = new bootstrap.Modal(document.getElementById('VarifyModal'));
    modal.show();

}

function VarifyModalClose() {
    const modalElement = document.getElementById('VarifyModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
        $('#otp1').val('');
        $('#otp2').val('');
        $('#otp3').val('');
        $('#otp4').val('');
    }
}


const varifyopt = async () => {
    let EmailId = $("#EmailId").val();
    let Password = $("#Password").val();
    let VisitorMobile = $("#txtphoneno").val();
    let opt = $("#otp1").val().trim() + $("#otp2").val().trim() + $("#otp3").val().trim() + $("#otp4").val().trim()
    if ($("#EmailId").val() == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();
    }
    const response = await fetch(`https://ifm360.in/ivmapi/api/FirstTimeVisitor/VerifyOTP?emailID=${EmailId}&password=${Password}&MobileNo=${VisitorMobile}&OTP=${opt.trim()}`);
    let data = await response.json();

    if (opt.length != 4) {
        alert("Enter Four Digits OTP !!");
        return;
    }

    if (data[0].status == "success") {

        VarifyModalClose();
        sessionStorage.setItem("mob", VisitorMobile);
        window.location.href = localStorage.getItem("Url") + "/Admin/RepeatVisitor";

    }
    else {
        alert(data[0].message)
    }


    console.log(data);

}


async function Resend() {
    $('#otp1').val('');
    $('#otp2').val('');
    $('#otp3').val('');
    $('#otp4').val('');
    const EmailId = $("#EmailId").val();
    const Password = $("#Password").val();
    const VisitorMobile = $("#txtphoneno").val();
    if ($("#EmailId").val() == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();
    }
    const response = await fetch(`https://ifm360.in/ivmapi/api/FirstTimeVisitor/ReSendOTP?emailID=${EmailId}&password=${Password}&MobileNo=${VisitorMobile}`);
    const data = await response.json();
    console.log(data);
    alert(data);

}