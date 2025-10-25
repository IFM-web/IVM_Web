
const addOffice = () => {
    let officeName = $("#txtofficename").val();
    let Address = $("#txtofficeAddress").val();
    let State = $("#txtofficState").val();
    let isSpace = $("#isSpace").val();

    var val = Validation();
    if (val != "") {
        alert(val);
        return;
    }
 
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/addOffice",
        type: "Post",
        data: {
            OfficeName: officeName,
            Id: $("#HidId").val(),
            State:State,
            Address: Address,
            IsShared: isSpace
        },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);

            alert(result[0].message || result[0].MessageString);
            if (result[0].MessageID == 1) {
                window.location.href = localStorage.getItem("Url") + "/SuperAdmin/ManageOfficesList";
            }
         
        },
        error: (error) => {
            console.log(error)
        }


    });
}



const Edit = (Id,Name) => {
    $("#HidId").val(Id);
    $("#txtDepartment").val(Name)
    $("#btnname").text('Update Department')
}


const clear = () => {
    $("#HidId").val(0);
    $("#txtDepartment").val('')
    $("#btnname").text('Add New Department')
}