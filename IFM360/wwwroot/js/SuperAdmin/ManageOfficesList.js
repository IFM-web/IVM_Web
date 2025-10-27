$(document).ready(() => {
    offocelist();
})

const offocelist = () => {
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/GetManageOffices",
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
                <td class="d-none">${result[i].location_id}</td>
                <td>${result[i].location_name}</td>
                <td>${result[i].address}</td>
                <td>${result[i].state_city}</td>
                <td>${result[i].IsSharedSpace}</td>
                <td>${result[i].TotalAdmin || 0}</td>
                <td>${result[i].totalReception || 0}</td>
                <td>${result[i].creationdate}</td>
                <td><a href="${localStorage.getItem("Url")}/SuperAdmin/CreateAdminList/${result[i].location_id}"  class="btn btn-success">Click Here</a></td>
                <td><a href="${localStorage.getItem("Url")}/SuperAdmin/CreateReceptionList/${result[i].location_id}"  class="btn btn-success">Click Here</a></td>
                <td><a href="${localStorage.getItem("Url")}/SuperAdmin/CompanyList?Id=${result[i].location_id}"  class="btn btn-success">Click Here</a></td>         
          
                <td> <button class="btn btn-success" onclick="Edit('${result[i].location_id}','${result[i].department_name}')">Edit</button>
                <button class="btn btn-danger" onclick="DeleteOffice(${result[i].location_id})">Delete</button></td>
             
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


const DeleteOffice = (Id) => {

    let val = confirm("Are you sure you want to delete this record?");
    if (!val) {
        return;
    }
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/DeleteOffice",
        type: "Post",
        data: { Id: Id },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            alert(result[0].MessageString);
            offocelist();
        },
        error: (error) => {
            console.log(error)
        }


    });
}

const Edit = (id) => {
    window.location.href = localStorage.getItem("Url")+'/SuperAdmin/ManageOffices/' + id;
}