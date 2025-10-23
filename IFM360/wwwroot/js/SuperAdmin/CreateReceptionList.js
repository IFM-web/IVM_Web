$(document).ready(() => {
    offocelist();
})

const offocelist = () => {
    let id = $("#locationId").val();
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/GetReceptionlist",
        type: "Get",
        data: { Id: id},
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            let tr = "";
            $("#content").empty();
            for (let i in result) {
                tr += `<tr>
                <td>${Number(i) + 1}</td>
             
                <td>${result[i].admin_name}</td>
                <td>${result[i].admin_email}</td>
                <td>${result[i].admin_mobile}</td>
                <td>${result[i].created_date}</td>        
                <td> <a class="btn btn-success" href="/SuperAdmin/CreateReception?Id=${id}&&RecpId=${result[i].branch_id}"  >Edit</a>
                <button class="btn btn-danger" onclick="DeleteAdmin(${result[i].branch_id})">Delete</button></td>
             
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

const DeleteAdmin = (Id) => {

    let val = confirm("Are you sure you want to delete this record?");
    if (!val) {
        return;
    }
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/DeleteReception",
        type: "Get",
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