$(document).ready(() => {
    VisitorBlackList();
})

const VisitorBlackList = () => {
    $.ajax({
        url: localStorage.getItem("Url") + "/AdminArea/GetVisitorBlacklisting",
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
                <td>${result[i].Mobile}</td>     <td>         
                <button class="btn btn-danger" onclick="DeleteVisitorBlackList(${result[i].AutoId})">Delete</button></td>
             
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

const DeleteVisitorBlackList = (Id) => {
    let val = confirm("Are you sure you want to delete this record?");
    if (!val) {
        return;
    }
    $.ajax({
        url: localStorage.getItem("Url") + "/AdminArea/DeleteVisitorBlacklisted",
        type: "Post",
        data: { Id: Id },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            alert(result[0].MessageString);
            VisitorBlackList();
        },
        error: (error) => {
            console.log(error)
        }


    });
}

const AddVisitorBlackList = () => {
    let MobileNo = $("#txtMobileno").val();
    if (MobileNo == "") {
        alert("Visitor Mobile No. Required !!")
        return;
    }
    if (MobileNo.length != 10) {
        alert("Visitor Mobile No. 10 Digits !!")
        return;
    }
    $.ajax({
        url: localStorage.getItem("Url") + "/AdminArea/InsertVisitorBlacklisted",
        type: "Post",
        data: { MobileNo: MobileNo },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            $("#txtMobileno").val('')
            alert(result[0].MessageString);
            VisitorBlackList();

        },
        error: (error) => {
            console.log(error)
        }


    });
}