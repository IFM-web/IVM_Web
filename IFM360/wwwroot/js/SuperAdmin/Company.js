
$(document).ready(() => {
    if ($("#ComId").val() !="")
       GetCompany();
});

const GetCompany = () => {
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/GetCompanysingle",
        type: "Get",
        data: { Id: $("#ComId").val() },
        success: (resp) => {
            var result = JSON.parse(resp);
        
            $("#CompnayName").val(result[0].SubCompanyName)
            $("#CompnayAddress").val(result[0].SubCompanyAddress)
          
            $("#btnsave").text("Update Compnay  Login")
        },
        error: (error) => {
            console.log(error)
        }


    });
}


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
            Id: $("#ComId").val(),
            CName: CompnayName,
            CAddress: CompnayAddress,
        
        },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
           
         
            if (result[0].MessageID == 1) {
                alert(result[0].MessageString || result[0].message);
                window.location.href = localStorage.getItem("Url") + "/SuperAdmin/CompanyList/" + locationId;
            } else {

                alert(result[0].MessageString || result[0].message);
            }

        },
        error: (error) => {
            console.log(error)
        }


    });
}