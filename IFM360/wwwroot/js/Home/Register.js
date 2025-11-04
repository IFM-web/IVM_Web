const SendOTP = () => {
    let message = "";
    const EmailId = $("#email").val();
    const mobile = $("#mobile").val();
    const fName = $("#fName").val();
    const lName = $("#lName").val();
    const cPassword = $("#cPassword").val();
    const password = $("#password").val();
    if (EmailId == "")
        message += "Email Required !!\n";
    if (mobile == "")
        message += "Mobile Required !!\n";
    if (fName == "")
        message += "First Name Required !!\n";
    if (lName == "")
        message += "Last Name Required !!\n";
    if (cPassword == "")
        message += "Confirm Password Required !!\n";
    if (password == "")
        message += "Password Required !!\n";



    if (message != "") {
        alert(message);
        return;
    } else {
        $.ajax({
            url: localStorage.getItem("Url") + "/Home/SendRegisterOTP",
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
            url: localStorage.getItem("Url") + "/Home/ReSendRegisterOTP",
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

function VarifyModal2() {
    const modal = new bootstrap.Modal(document.getElementById('VarifyModal1'));
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

function VarifyModalClose2() {
    const modalElement = document.getElementById('VarifyModal1');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
        
    }
}




const varifyopt = async () => {
    const EmailId = $("#email").val();
    const mobile = $("#mobile").val();
    let VisitorMobile = $("#txtphoneno").val();
    let opt = $("#otp1").val().trim() + $("#otp2").val().trim() + $("#otp3").val().trim() + $("#otp4").val().trim()

    if (opt.length != 4) {
        alert("Enter Four Digits OTP !!");
        return;
    }

    const response = await fetch(localStorage.getItem("Url") +`/Home/VerifyRegistrationOTP?EmailId=${EmailId}&&MobileNo=${mobile}&&otp=${opt.trim()}`);
    let data = await response.json();
    var data1 = JSON.parse(data);

    if (data1[0].MessageID == "1") {

        VarifyModalClose();
        VarifyModal2();

    } else {
        alert('something went wrong !!');
    }
   


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

function SaveReg() {
    const file = $('#uploadfile')[0].files[0];

    const validationMessage = Validation1();
    if (validationMessage !== "") {
        alert(validationMessage);
        return;
    }

    if (!file) {
        alert("Select a file!");
        return;
    }

    if (!file.type.startsWith('image/')) {
        alert("Only image files are allowed!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const base64String = e.target.result;

        const EmailId = $("#email").val();
        const mobile = $("#mobile").val();
        const Cstate = $("#Cstate").val();
        const Clocation = $("#Clocation").val();
        const Caddess = $("#Caddess").val();
        const Cname = $("#Cname").val();
        const fName = $("#fName").val();
        const lName = $("#lName").val();
        const fullName = fName + " " + lName;
        const cPassword = $("#cPassword").val();

        $.ajax({
            url: localStorage.getItem("Url") + "/Home/SaveRegister",
            type: "POST",
            data: {
                EmailId: EmailId,
                MobileNo: mobile,
                AName: fullName,
                APassword: cPassword,
                CName: Cname,
                Cstate: Cstate,
                CLocatoin: Clocation,
                CAddress: Caddess,
                Clogo: base64String
            },
            success: function (res) {
                const data = JSON.parse(res);
                if (data[0].MessageID === "1") {
                    alert("Created Successfully");
                  
                    $('#uploadfile').val('');
                    window.location.reload();
                } else {
                    alert(data[0].MessageString);
                }
            },
            error: function (err) {
                console.error(err);
                alert("Error during registration.");
            }
        });
    };

    reader.readAsDataURL(file); 
}
