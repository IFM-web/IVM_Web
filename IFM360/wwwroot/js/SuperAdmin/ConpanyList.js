$(document).ready(() => {
    GetCompanylist();
})

const GetCompanylist = () => {
    var id = $("#locationId").val();
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/GetCompanylist",
        type: "Get",
        data: { Id: id },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            let tr = "";
            $("#content").empty();
            for (let i in result) {
                var obj = result[i];
                tr += `<tr>
                <td>${Number(i) + 1}</td>
             
                <td>${result[i].SubCompanyName}</td>
                <td>${result[i].SubCompanyAddress}</td>
         
                <td>${result[i].Creationdate}</td>        
                <td> <a class="btn btn-success" href="${localStorage.getItem("Url")}/SuperAdmin/Company?Id=${id}&&ComId=${result[i].SubCompanyId}" >Edit</a>
                <button class="btn btn-danger" onclick="DeleteCompany(${result[i].SubCompanyId})">Delete</button></td>
             
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

const DeleteCompany = (Id) => {

    let val = confirm("Are you sure you want to delete this record?");
    if (!val) {
        return;
    }
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/DeleteCompany",
        type: "Get",
        data: { Id: Id },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            alert(result[0].MessageString);
            GetCompanylist();
        },
        error: (error) => {
            console.log(error)
        }


    });
}

const Edit = (LocationId, e) => {

    console.log(e.SubCompanyId);
}