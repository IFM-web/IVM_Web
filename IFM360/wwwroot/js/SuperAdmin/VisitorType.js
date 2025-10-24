$(document).ready(() => {
    GetVisitorType();
})

const GetVisitorType = () => {
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
                <td><button onclick="DeleteType('${result[i].AutoId}')" class="btn btn-danger">Delete</button></td>
            
             
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
            GetVisitorType();
        },
        error: (error) => {
            console.log(error)
        }


    });
}

const DeleteType = (Id) => {

    let val = confirm("Are you sure you want to delete this record?");
    if (!val) {
        return;
    }
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/DeleteVisitorType",
        type: "Get",
        data: { Id: Id },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            alert(result[0].MessageString);
            GetVisitorType();
        },
        error: (error) => {
            console.log(error)
        }


    });
}

