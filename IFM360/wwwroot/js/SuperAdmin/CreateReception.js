
$(document).ready(() => {
    if ($("#HidId").val() != "")
        GetRecp();
});

const GetRecp = () => {
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/GetReceptionSingle",
        type: "Get",
        data: { Id: $("#HidId").val() },
        success: (resp) => {
            var result = JSON.parse(resp);

            var name = result[0].admin_name.split(" ");
            $("#RedEmailId").val(result[0].admin_email)
            $("#mobnumber").val(result[0].admin_mobile)
            $("#firstname").val(name[0])
            $("#lastname").val(name[1])
     

            $("#btnsave").text("Update Compnay  Login")
        },
        error: (error) => {
            console.log(error)
        }


    });
}



const AddReception = () => {
    let EmailId = $("#RedEmailId").val();
    let locationId = $("#locationId").val();
    let mobnumber = $("#mobnumber").val();
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let RecPassword = $("#RecPassword").val();
    let ConfirmPassword = $("#ConfirmPassword").val();

    var val = Validation();
    if (val != "") {
        alert(val);
        return;
    }

    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/AddReception",
        type: "Post",
        data: {
            locatinid: locationId,
            Id: $("#HidId").val(),
            Mobile: mobnumber,
            Name: firstname + " " + lastname,
            RecEmail: EmailId,
            RecPassword:ConfirmPassword
        },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);

            alert(result[0].message || result[0].MessageString);
            if (result[0].MessageID == 1) {
                window.location.href = localStorage.getItem("Url") + "/SuperAdmin/CreateReceptionList/" + locationId;
            }

        },
        error: (error) => {
            console.log(error)
        }


    });
}

var onlynuber = (e) => {
    const regex = /^\d+$/;
    if (!regex.test(e.value)) {
        e.value = '';
    }

}