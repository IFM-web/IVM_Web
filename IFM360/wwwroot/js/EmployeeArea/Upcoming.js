document.addEventListener("DOMContentLoaded", function () {
    UpcomingDetails();
});



const UpcomingDetails = async () => {
    document.getElementById("loader").style.display = "flex";
    let Todate = new Date().toISOString().split("T")[0];
    let EmailId = $("#EmailId").val();
    let Password = $("#Password").val();
    await fetch(`https://ifm360.in/ivmapi/api/EmployeeModule/UpcomingVisitorList?EmployeeEmailID=${EmailId}&fromDate=${Todate}&toDate=${Todate}`).then(response => response.json())
        .then(data => {
            document.getElementById("loader").style.display = "none";
        let tr = "";
        let i = 1;

        for (var e of data) {
            tr += `
             <tr>
                        <td>${i++}</td>
                        <td>
                        ${e.VisitorId==''?'':
                            `<img src="data:image/png;base64,${e.VisitorId}" class="rounded-circle" width="50" height="50" alt="visitor" onclick="showImageModal('data:image/png;base64,${e.VisitorId}')">`}
                        </td>
                        <td class="fw-semibold text-uppercase">${e.visitor_name}</td>
                        <td>${e.visitor_phone == 'null' ? '' : e.visitor_phone}</td>
                        <td class="text-uppercase">${e.visitor_company}</td>
                        <td><span class="">${e.TypeOfVisitor}</span></td>
                        <td><span class="">${e.Temperature == 'null' ? '' : e.Temperature = 'undefined' ? '' : e.Temperature}</span></td>
                        <td>${e.visitor_checkIn}</td>
                        <td><span class="badge ${e.visitor_status == "Accepted" ? 'bg-success' : e.visitor_status == "Wait" ? 'bg-warning':'bg-danger'}">${e.visitor_status}</span></td>
                        <td><span class="badge ${e.is_from_reception == 0 ? 'bg-success' : 'bg-danger'} ">${e.is_from_reception == 0 ? 'Yes' :'No'}</span></td>
                        <td>
                            <button class="btn btn-success btn-sm px-3" onclick="Accept('${e.visitor_id}')" >Accept</button>
                        </td>
                        <td>
                            <button class="btn btn-danger btn-sm px-3" onclick="Reject('${e.visitor_id}')"  >Reject</button>
                        </td>
                    </tr>

            `;
            
        }
        document.getElementById("content").innerHTML = "";
        document.getElementById("content").innerHTML+=tr;
    })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("loader").style.display = "none";

        });
}


const Accept = async (Id) => {
    await fetch(`https://ifm360.in/ivmapi/api/EmployeeModule/AcceptVisitor?visitorID=${Id}`).then(response => response.json())
        .then(data => {
            alert(data[0].Message);
            UpcomingDetails();
        }).catch(data => {
            console.log(data);
        });
}

const Reject = async (Id) => {
    await fetch(`https://ifm360.in/ivmapi/api/EmployeeModule/RejectVisitor?visitorID=${Id}`).then(response => response.json())
        .then(data => {
            alert(data[0].Message);
            UpcomingDetails();
        }).catch(data => {
            console.log(data);
        });
}


function showImageModal(imageUrl) {
    document.getElementById('modalImage').src = imageUrl;
    var modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
}

setInterval(UpcomingDetails, 10000)