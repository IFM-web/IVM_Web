
$(document).ready(() => {
    EmployeeList();
});

const EmployeeList = () => {
    $.ajax({
        url: localStorage.getItem("Url") + "/AdminArea/GetEmployeeList",
        type: "Get",
        data: {},
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            let tr = "";
            $("#content").empty();
            for (let i in result) {
                tr += `<tr>
                <td>${Number(i) + 1}</td>
                <td>${result[i].employee_name}</td>
                <td>${result[i].employee_email}</td>
                <td>${result[i].employee_mobile}</td>
                <td>${result[i].Department}</td>
                <td> <a class="btn btn-success" href="${localStorage.getItem("Url")}/AdminArea/Employee/${result[i].employee_id}")">Edit</a>
                <button class="btn btn-danger" onclick="Delete(${result[i].employee_id})">Delete</button></td>
             
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

const Delete = (Id) => {

    let a = confirm("Are you sure you want to delete this record?");
    if (!a)
        return;
    
    $.ajax({
        url: localStorage.getItem("Url") + "/AdminArea/DeleteEmployee",
        type: "post",
        data: {
            Id:Id
        },
        success: (resp) => {
            var result = JSON.parse(resp);
            alert(result[0].MessageString)
            EmployeeList();
        },
        error: (error) => {
            console.log(error)
        }
    });
}


function Downloadexcel() {
    const table = document.getElementById("data-table");
    var talbe2 = table.cloneNode(true);
    for (let row of talbe2.rows) {
        if (row.cells.length > 0) {
            row.deleteCell(-1); 
       }
    }

    const workbook = XLSX.utils.table_to_book(talbe2, { sheet: "Sheet1" });

    XLSX.writeFile(workbook, "Employee Data.xlsx");
}
