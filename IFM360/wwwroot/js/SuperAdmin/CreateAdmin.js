const addAdmin = () => {
    let AdminEmailId = $("#AdminEmailId").val();
    let locationId = $("#locationId").val();
    let adminmobnumber = $("#adminmobnumber").val();
    let adminfirstname = $("#adminfirstname").val();
    let adminlastname = $("#adminlastname").val();
    let adminPassword = $("#adminPassword").val();
    let ConfirmPassword = $("#ConfirmPassword").val();

    var val = Validation();
    if (val != "") {
        alert(val);
        return;
    }

    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/AddAdmin",
        type: "Post",
        data: {
            locatinid: locationId,
            Id: $("#HidId").val(),
            Mobile: adminmobnumber,
            AdminName: adminfirstname + " " + adminlastname,
            AdminEmail: AdminEmailId,
            AdminPassword:ConfirmPassword
        },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);

            alert(result[0].message);
            if (result[0].MessageID == 1) {
                window.location.href = localStorage.getItem("Url") + "/SuperAdmin/CreateAdminList/" + locationId;
            }

        },
        error: (error) => {
            console.log(error)
        }


    });
}