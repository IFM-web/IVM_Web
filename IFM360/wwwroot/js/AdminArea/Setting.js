

$(document).ready(() => {
    listOfFlags();
})

const listOfFlags = () => {
    $.ajax({
        url: "/AdminArea/GetAppSettingBranchFlags",
        type: "Get",
        data: {},
        success: (res) => {
           var res = JSON.parse(res);            
            console.log(res);
            $("#VmobileNo").prop("checked", res[0].mobile_no_flag);         
            $("#VmobileVerify").prop("checked", res[0].otp_verification_flag);
            $("#VName").prop("checked", res[0].name_flag);
            $("#VCompany").prop("checked", res[0].company_required);
            $("#WhomToMeet").prop("checked", res[0].whom_to_meet_flag);
            $("#VCarNo").prop("checked", res[0].isCardAllowed);
            $("#VDeciveDetails").prop("checked", res[0].visitor_device_list_flag);
            $("#VPurposeofVisit").prop("checked", res[0].purpose_flag);
            $("#VType").prop("checked", res[0].Type_Of_Visitor_Flag);
            $("#VPhoto").prop("checked", res[0].visitor_photo);
            $("#VTemperature").prop("checked", res[0].Temperature);
            $("#DisclaimerBox").prop("checked", res[0].disclaimer_flag);
            $("#LaptopNo").prop("checked", res[0].laptop_Flag);
            $("#VehicleNo").prop("checked", res[0].Vehicle_Flag);

        },
        error: (err) => {
            console.log(err);
        }
    })
}


const ChangePassword = () => {

    let  Password = $("#NewPassword").val();
    let ConfirmPassword = $("#ConfirmPassword").val();
    const message = document.getElementById("message");
    let val = Validation();
    if (val != "") {
        alert(val);
        return;
    }
    if (Password != ConfirmPassword) {
        alert("Password And Confirm Password Not Match !!");
        return;
    }
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!regex.test(ConfirmPassword)) {
        message.innerHTML = `
      <ul style="color: red; list-style-type: none; padding: 0;">
        <li>• At least 1 capital letter (A-Z)</li>
        <li>• At least 1 number (0-9)</li>
        <li>• At least 1 special character (e.g. @, #, $, %, &, etc.)</li>
        <li>• Minimum 8 characters long</li>
      </ul>
    `;
        return;
    } else {
        message.innerHTML = `<span style="color: green;">✅ Password is valid</span>`;
        return;
    }
       
    
    $.ajax({
        url: "/AdminArea/ChangePassword",
        type: "post",
        data: {
            oldPassword: $("#CurrentPassword").val(),
            NewPassword: ConfirmPassword,       
        },
        success: (res) => {
            var res = JSON.parse(res);
            if (res[0].MessageId == 1) {
                $("#CurrentPassword").val('')
                $("#NewPassword").val('');
                $("#ConfirmPassword").val('');
            }
            alert(res[0].MessageString);  

        },
        error: (err) => {
            console.log(err);
        }
    })
}

const UpdateFlags = (Flag, val) => {
    let value = val.checked == true ? 1 : 0; 
    $.ajax({
        url: "/AdminArea/UpdateFlags",
        type: "post",
        data: {
            Flag: Flag,
            Value: value,
       
        },
        success: (res) => {
            var res = JSON.parse(res);

        },
        error: (err) => {
            console.log(err);
        }
    })
}

 function Validation() {
    let msg = "";
    $(".mandatory").each(function () {
        if ($(this).val() == "" || $(this).val() == "0") {
            var name = $(this).attr("name");
            msg += name + " Required !!\n";
        }
    });
    
    return msg;
}
