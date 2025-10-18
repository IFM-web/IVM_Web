$(document).ready(() => {
    ManageNotification();
})

const ManageNotification = () => {
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/GetManageNotifications",
        type: "Get",
        data: { },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            let tr = "";
            $("#content").empty();
            for (let i in result) {
                var obj = result[i];
                tr += `<tr>
                <td>${Number(i) + 1}</td>
             
                <td>${result[i].Notification}</td>
                     
                <td> <button class="btn btn-success" onclick="Edit('${result[i].AutoID}','${result[i].Notification}')">Edit</button>
                <button class="btn btn-danger" onclick="DeleteNotification(${result[i].AutoID})">Delete</button></td>
             
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

const DeleteNotification = (Id) => {

    let val = confirm("Are you sure you want to delete this record?");
    if (!val) {
        return;
    }
    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/DeleteNotifications",
        type: "Get",
        data: { Id: Id },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);
            alert(result[0].MessageString);
            ManageNotification();
            clear();
        },
        error: (error) => {
            console.log(error)
        }


    });
}


const addNotification = () => {
    let Notifications = $("#txtNotifications").val();
 
   

    var val = Validation();
    if (val != "") {
        alert(val);
        return;
    }

    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/addNotifications",
        type: "Post",
        data: {
            Notifications: Notifications,
            Id: $("#HidId").val()
          
        },
        success: (resp) => {
            var result = JSON.parse(resp);
            console.log(result);

            alert(result[0].MessageString);
            clear()
            ManageNotification();

        },
        error: (error) => {
            console.log(error)
        }


    });
}


const Edit = (Id, Name) => {
    $("#HidId").val(Id);
    $("#txtNotifications").val(Name)
    $("#btnname").text('Update Notification')
}


const clear = () => {
    $("#HidId").val(0);
    $("#txtNotifications").val('')
    $("#btnname").text('Submit Notification')
}