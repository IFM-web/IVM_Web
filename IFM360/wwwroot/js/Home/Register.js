const SendOTP =  () => {
    const EmailId = $("#email").val();
    const mobile = $("#mobile").val();
    const fName = $("#fName").val();
    const lName = $("#lName").val();
    const cPassword = $("#cPassword").val();
    const password = $("#password").val();

    var Vali = Validation1();
    if (Vali != "") {
        alert(Vali);
        return;
    } else {
        $.ajax({
            url: "/Home/SendRegisterOTP",
            data: { EmailId: EmailId, MobileNo: mobile },
            type: "Post",
            success: (res) => {
                var data = JSON.parse(res);
                if (data[0].status == "Fail") {
                    alert(data[0].message);
                    return;
                }
                else {
            
                    VarifyModal();

                }
            },
            error: () => { }

        })
        
        
    }
 

}
const ReSendOTP =  () => {
    const EmailId = $("#email").val();
    const mobile = $("#mobile").val();

        $.ajax({
            url: "/Home/ReSendRegisterOTP",
            data: { EmailId: EmailId, MobileNo: mobile },
            type: "Post",
            success: (res) => {
                var data = JSON.parse(res);
                
                alert(data[0].MessageID==1?"Resend OTP Successfully !!":"Something went wrong !!");
            
            },
            error: () => { }

        })
        
        
     

}


function Validation1() {
    let msg = "";
    $(".mandatory").each(function () {
        if ($(this).val() == "" || $(this).val() == "0") {
            var name = $(this).attr("name");
            msg += name + " Required !!\n";
        }
    });

    return msg;
}

var onlynuber = (e) => {
    const regex = /^\d+$/;
    if (!regex.test(e.value)) {
        e.value = '';
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

//$("#txtphoneno1").on('input', function () {

//    const val = this.value.replace(/\D/g, "");


//    this.value = maskname(val);
//});


const varifyopt = async () => {
    let EmailId = $("#EmailId").val();
    let Password = $("#Password").val();
    let VisitorMobile = $("#txtphoneno").val();
    let opt = $("#otp1").val().trim() + $("#otp2").val().trim() + $("#otp3").val().trim() + $("#otp4").val().trim()
  
    const response = await fetch(`https://ifm360.in/ivmapi/api/FirstTimeVisitor/VerifyOTP?emailID=${EmailId}&password=${Password}&MobileNo=${VisitorMobile}&OTP=${opt.trim()}`);
    let data = await response.json();

    if (opt.length != 4) {
        alert("Enter Four Digits OTP !!");
        return;
    }

    if (data[0].status == "success") {

        VarifyModalClose();
        sessionStorage.setItem("mob", VisitorMobile);
        window.location.href = localStorage.getItem("Url") + "/Admin/VisitorCheckin";

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