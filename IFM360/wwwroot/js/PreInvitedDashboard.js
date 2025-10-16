$(document).ready(function () {
    PreInvitedDashboardVisitor();
});

function PreInvitedDashboardVisitor() {
    document.getElementById("loader").style.display = "flex";
    let EmailId = $("#EmailId").val();
    let Password = $("#Password").val();
    const tbody = document.getElementById("PrintDiv");
    tbody.innerHTML = "";

    fetch(`https://ifm360.in/ivmapi/api/VisitorDashboard/GetPreInvitedDashboard?emailID=${EmailId}&password=${Password}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("loader").style.display = "none";
            if (!data.length) {
                tbody.innerHTML = '<tr><td colspan="12" class="text-center">No History Found</td></tr>';
                return;
            }
            tbody.innerHTML = "";

            data.forEach((visitor, index) => {
                const row = document.createElement("tr");

                const rowcontent = `
                <td>${index + 1}</td>
                <td>${visitor.Invite_Code}</span></td>
                <td class="fw-semibold">${visitor.Visitor_Name}</td>
                <td>${visitor.Visitor_Phone}</td>
                <td>${visitor.Visitor_Company || '-'}</td>
                
               
                <td>${visitor.Meeting_Time || '--'}</td>
                <td>${visitor.Host_Name}</td>
                <td><span class="">${visitor.Host_Department }</span></td>
               
            `;

                row.innerHTML = rowcontent;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            document.getElementById("loader").style.display = "none";
            console.error("Error fetching data!",error)
        });
}