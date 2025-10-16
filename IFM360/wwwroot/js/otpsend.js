const SendOTP= async ()=> {
    const EmailId = $("#EmailId").val();
    const Password = $("#Password").val();
    const VisitorMobile = $("#txtphoneno").val();
    const otp_verification_flag = $("#otp_verification_flag").val();
   
    if (VisitorMobile.length == 10) {
        if ($("#EmailId").val() == "") {
            alert("Session Expired, Please Login Again !!");
            window.location.reload();
        }
        if (otp_verification_flag == '0') {
            const response = await fetch(`https://ifm360.in/ivmapi/api/FirstTimeVisitor/VisitorCheckoutStatus?emailID=${EmailId}&password=${Password}&MobileNo=${VisitorMobile}`);
            const data = await response.json();
            if (data[0].status == "Fail") {
                alert(data[0].message);
                return;
            }
            else {
                sessionStorage.setItem("mob", VisitorMobile);
                window.location.href = localStorage.getItem("Url") + "/Admin/VisitorCheckin";

            }
        }
        else {

            const response = await fetch(`https://ifm360.in/ivmapi/api/FirstTimeVisitor/SendOTP?emailID=${EmailId}&password=${Password}&MobileNo=${VisitorMobile}`);
            const data = await response.json();
            if (data == "OTP Send Sucessfully !!") {
                console.log(data);

                VarifyModal();

            }
            else {
                alert(data);
            }
        }            ;
    } else {
        alert("Mobile Number Must be 10 Digits")
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
        window.location.href = localStorage.getItem("Url")+"/Admin/VisitorCheckin";
      
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