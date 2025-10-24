$(document).ready(() => {
    const id = $("#EMpId").val();
    if (id != "")
        EmployeeList();
})

const EmployeeList = () => {
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/GetEmployeesingle",
        type: "Get",
        data: { Id: $("#EMpId").val() },
        success: (resp) => {
            var result = JSON.parse(resp);
            // console.log(result)
            $("#txtEName").val(result[0].employee_name)
            $("#txtEmail").val(result[0].employee_email)
            $("#txtMobile").val(result[0].employee_mobile)
            $("#txtdept").val(result[0].department_id)
            $("#btnsave").text("Update Employee")
        },
        error: (error) => {
            console.log(error)
        }


    });
}
function ClearData() {
    $("#txtEName").val('')
    $("#txtEmail").val('')
    $("#txtMobile").val('')
    $("#txtdept").val(0);
    $("#btnsave").text("Add New Employee")

}

const Insert = () => {

    let val = Validation();
    if (val != "") {
        alert(val);
        return;
    }

    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/InsertEmployee",
        type: "Post",
        data: {
            EmpId: $("#EMpId").val(),
            EName: $("#txtEName").val(),
            Email: $("#txtEmail").val(),
            Mobile: $("#txtMobile").val(),
            Dept: $("#txtdept").val(),
        },
        success: (resp) => {
            var result = JSON.parse(resp);
            alert(result[0].MessageString)
            window.location.href = localStorage.getItem("Url") + "/SuperAdmin/EmployeeList"

        },
        error: (error) => {
            console.log(error)
        }


    });
}




const onlynuber = (e) => {
    const regex = /^\d+$/;
    if (!regex.test(e.value)) {
        e.value = '';
    }

}

function Validation() {
    let msg = "";
    $(".mandatory").each(function () {
        if ($(this).val() == "" || $(this).val() == "0") {
            var name = $(this).attr("name");
            msg += name + " Required !!\n";
        }
    });
    if ($("#txtWhomeMeet").val() == "" && $("#employeeSearch").val() != "")
        msg += "Whom to Meet is invalid !!\n"
    return msg;
}