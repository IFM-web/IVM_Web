document.addEventListener("DOMContentLoaded", function () {
    let Todate = new Date().toISOString().split("T")[0];
    $('#txttodate').val(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    //$("#txttodate").val(Todate);
    $("#txtfromdate").val(Todate);
    PreInviteHistory();
});



const PreInviteHistory = async () => {
    document.getElementById("loader").style.display = "flex";
    let EmailId = $("#EmailId").val();
    let todate = $("#txttodate").val();
    let fromdate = $("#txtfromdate").val();
    await fetch(localStorage.getItem("Url") + `/SuperAdmin/GetPreInviteVisitor?Sdate=${fromdate}&Edate=${todate}`).then(response => response.json())
        .then(data => {
            document.getElementById("loader").style.display = "none";
            let tr = "";
            let i = 1;
            var data = JSON.parse(data);
            console.log(data)
            if (data.length == 0) {
                alert("Data Not Found !!");
                return;
            }
            for (var e of data) {
                tr += `
             <tr>
                        <td>${i++}</td>
                        
                        <td class="">${e.InvitationID}</td>
                        <td class="fw-semibold text-uppercase">${e.GuestName}</td>
                        <td>${e.visitor_phone == 'null' ? '' : e.GuestPhone}</td>
                        <td>${e.GuestEmail}</td>
                        <td class="text-uppercase">${e.Address}</td>
                        <td><span class="">${e.Date}</span></td>
                        <td><span class="">${e.Time}</span></td>
            
                        
                        
                    </tr>

            `;

            }
            document.getElementById("content").innerHTML = "";
            document.getElementById("content").innerHTML += tr;
        })
        .catch(error => {
            document.getElementById("loader").style.display = "none";
            console.error("Error:", error)
        });
}