$(document).ready(() => {
    VisitorType();
})

const VisitorType = () => {
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/GetManageVisitorType",
        type: "Get",
        data: {},
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            let tr = "";
            $("#content").empty();
            for (let i in result) {
                tr += `<tr>
                <td>${Number(i)+1}</td>           
                <td>${result[i].TypeOfVisitor}</td>
            
             
             </tr>
                `
            }
            $("#content").append(tr);
        },
        error: (error) => {
            console.log(error)
        }


    });
}

const AddVisitorType = () => {
    let VisitorType = $("#VisitorType").val();
   
    if (VisitorType == "") {
        alert("Visitor Type Required !!")
        return;
    }
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/AddVisitorType",
        type: "Post",
        data: { Name: VisitorType,Id:$("#HidId").val()},
        success: (resp) => {
            var result = JSON.parse(resp);        
            alert(result[0].MessageString);
            $("#VisitorType").val('')
            VisitorType();
        },
        error: (error) => {
            console.log(error)
        }


    });
}

//const DeleteDepartment = (Id) => {
//    clear();
//    let val = confirm("Are you sure you want to delete this record?");
//    if (!val) {
//        return;
//    }
//    $.ajax({
//        url: localStorage.getItem("Url") + "/SuperAdmin/DeleteDepartment",
//        type: "Post",
//        data: { Id: Id },
//        success: (resp) => {
//            var result = JSON.parse(resp);
//            console.log(result);
//            alert(result[0].MessageString);
//            DepartmentList();
//        },
//        error: (error) => {
//            console.log(error)
//        }


//    });
//}

//const Edit = (Id,Name) => {
//    $("#HidId").val(Id);
//    $("#txtDepartment").val(Name)
//    $("#btnname").text('Update Department')
//}


//const clear = () => {
//    $("#HidId").val(0);
//    $("#txtDepartment").val('')
//    $("#btnname").text('Add New Department')
//}