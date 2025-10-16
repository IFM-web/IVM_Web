

document.addEventListener("DOMContentLoaded", () => {
/*    $('#startDate').val(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])*/
    $('#startDate').val(new Date(Date.now()).toISOString().split('T')[0])
    $('#endDate').val(new Date(Date.now()).toISOString().split('T')[0])
    visitorList()

})
async function visitorList() {
    document.getElementById("loader").style.display = "flex";
    const startDate = $('#startDate').val()

    const endDate = $('#endDate').val();
    let EmailId = $("#EmailId").val();
    const tbody = document.getElementById("visitorHistory-body");
    const loader = document.getElementById("loader");

    //loader.style.display = "block";
    tbody.innerHTML = "";

    await fetch(`https://ifm360.in/ivmapi/api/EmployeeModule/VisitorHistory?EmployeeEmailID=${EmailId}&fromDate=${startDate}&toDate=${endDate}`)
        .then(Response => {
            if (!Response.ok) {
                throw new error('Network response not ok');
            }
            return Response.json();
        })
        .then(data => {
            document.getElementById("loader").style.display = "none";
            if (!data.length) {
                tbody.innerHTML = '<tr><td colspan="12" class="text-center">No History Found</td></tr>';
                return;
            }

            console.log("data from api:", data);
            tbody.innerHTML = "";

            data.forEach((visitor, index) => {
                const row = document.createElement("tr");

               
                let employee_visitor_id_flag = document.getElementById("employee_visitor_id_flag")?.value;
                let employee_visitor_photo_flag = document.getElementById("employee_visitor_photo_flag")?.value;
                let employee_name_flag = document.getElementById("employee_name_flag")?.value;
                let employee_mobile_no_flag = document.getElementById("employee_mobile_no_flag")?.value;
                let employee_company_name_flag = document.getElementById("employee_company_name_flag")?.value;
                let employee_card_number_flag = document.getElementById("employee_card_number_flag")?.value;
                let employee_temperature_flag = document.getElementById("employee_temperature_flag")?.value;
                let employee_additional_details_flag = document.getElementById("employee_additional_details_flag")?.value;
                let employee_type_of_visitor_flag = document.getElementById("employee_type_of_visitor_flag")?.value;

                let rowcontent = `<td>${index + 1}</td>`;
                if (employee_visitor_id_flag == "1") {
                    if (visitor.VisitorId !== "") {
                        rowcontent += `<td>
                        <img src="data:image/png;base64,${visitor.VisitorId}" onclick="showImageModal('data:image/png;base64,${visitor.VisitorId}')"
                             class="rounded-circle" width="50" height="50" alt="visitor">
                    </td>`;
                    } else {
                        rowcontent += '<td></td>';
                    }
                }
                if (employee_visitor_photo_flag == "1") {
                    if (visitor.VisitorPhoto !== "") {
                        rowcontent += ` <td>
                        <img src="data:image/png;base64,${visitor.VisitorPhoto}" onclick="showImageModal('data:image/png;base64,${visitor.VisitorPhoto}')"
                             class="rounded-circle" width="50" height="50" alt="visitor">
                    </td>`;
                    }
                    else {
                         rowcontent += '<td></td>';
                    }
                }
                if (employee_name_flag == "1") {
                    rowcontent += ` <td class="fw-semibold">${visitor.visitor_name}</td>`;
                }
                if (employee_mobile_no_flag == "1") {
                    rowcontent += ` <td>${visitor.visitor_phone}</td>`;
                }
                if (employee_company_name_flag == "1") {
                    rowcontent += ` <td>${visitor.visitor_company || '-'}</td>`;
                }
                if (employee_card_number_flag == "1") {
                    rowcontent += ` <td><span class="">${visitor.card_id || 'N/A'}</span></td>`;
                }
                if (employee_temperature_flag == "1") {
                    rowcontent += ` <td><span class="">${visitor.Temperature || '--'}°</span></td>`;
                }
                if (employee_additional_details_flag == "1") {
                    rowcontent += ` <td>${visitor.visitor_checkIn}</td>`;
                }
                if (employee_additional_details_flag == "1") {
                    rowcontent += ` <td>${visitor.visitor_checkOut}</td>`;
                }
                if (employee_type_of_visitor_flag == "1") {
                    rowcontent += `<td><span class="">${visitor.TypeOfVisitor || 'Wait'}</span></td>`;
                }
                if (employee_additional_details_flag == "1") {

                    rowcontent += ` <td><span class="badge ${visitor.is_from_reception == '1' ? 'bg-danger' : 'bg-success'}">${visitor.is_from_reception == '1' ? 'No' : 'Yes'}</span></td>`;

                }

                if (employee_additional_details_flag == "1") {

                    rowcontent += `<td><span class="badge ${visitor.visitor_status === "Wait" ? 'bg-warning' : 'bg-success'}">${visitor.visitor_status || 'Wait'}</span></td>`;

                }

                row.innerHTML = rowcontent;
                                   
                tbody.appendChild(row);
            });

        })
        .catch(error => {
            document.getElementById("loader").style.display = "none";
            console.error('there is problem with fetch operation:', error);
        });

}


function formatDate(dateString) {
    if (!dateString) return '--';

    // Fix missing space before AM/PM (e.g., "11:23PM" => "11:23 PM")
    const fixedString = dateString.replace(/(\d{2}:\d{2})(AM|PM)/, "$1 $2");

    const date = new Date(fixedString);

    if (isNaN(date.getTime())) return '--'; // still invalid

    return (
        date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }) +
        "<br>" +
        date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    );
}


function showImageModal(imageUrl) {
    document.getElementById('modalImage').src = imageUrl;
    var modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
}