const AddCompnay = () => {
    let CompnayName = $("#CompnayName").val();
    let CompnayAddress = $("#CompnayAddress").val();
    let locationId = $("#locationId").val();
   

    var val = Validation();
    if (val != "") {
        alert(val);
        return;
    }

    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/AddCompany",
        type: "Post",
        data: {
            locatinid: locationId,
            Id: $("#HidId").val(),
            CName: CompnayName,
            CAddress: CompnayAddress,
        
        },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);

            alert(result[0].message);
            if (result[0].MessageID == 1) {
                window.location.href = localStorage.getItem("Url") + "/SuperAdmin/CompanyList/" + locationId;
            }

        },
        error: (error) => {
            console.log(error)
        }


    });
}