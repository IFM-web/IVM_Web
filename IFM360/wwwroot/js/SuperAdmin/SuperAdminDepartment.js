$(document).ready(() => {
    DepartmentList();
})

const DepartmentList = () => {
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/GetDepartmentList",
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
                <td class="d-none">${result[i].department_id}</td>
                <td>${result[i].department_name}</td>
                <td> <button class="btn btn-success" onclick="Edit('${result[i].department_id}','${result[i].department_name}')">Edit</button>
                <button class="btn btn-danger" onclick="DeleteDepartment(${result[i].department_id})">Delete</button></td>
             
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

const AddDepartment = () => {
    let deptname = $("#txtDepartment").val();
   
    if (deptname == "") {
        alert("Department Name Required !!")
        return;
    }
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/InsertDepartment",
        type: "Post",
        data: { DeptName: deptname,Id:$("#HidId").val()},
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            alert(result[0].MessageString);
            clear();
            DepartmentList();
        },
        error: (error) => {
            console.log(error)
        }


    });
}

const DeleteDepartment = (Id) => {
    clear();
    let val = confirm("Are you sure you want to delete this record?");
    if (!val) {
        return;
    }
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/DeleteDepartment",
        type: "Post",
        data: { Id: Id },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            alert(result[0].MessageString);
            DepartmentList();
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