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

            alert(result[0].message);
            if (result[0].MessageID == 1) {
                window.location.href = localStorage.getItem("Url") + "/SuperAdmin/CreateReceptionList/" + locationId;
            }

        },
        error: (error) => {
            console.log(error)
        }


    });
}