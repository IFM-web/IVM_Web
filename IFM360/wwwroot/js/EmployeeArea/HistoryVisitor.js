document.addEventListener("DOMContentLoaded", function () {
    UpcomingDetails();
});

const UpcomingDetails = async () => {
    let Todate = new Date().toISOString().split("T")[0];
  
    await fetch(`https://ifm360.in/ivmapi/api/EmployeeModule/VisitorHistory?EmployeeEmailID=nadeemali.bsd%40gmail.com&fromDate=08-21-2025&toDate=08-25-2025`).then(response => response.json())
        .then(data => {
            console.log(data);

        let tr = "";
        for (var e of data) {
            tr += `
             <tr>
                        <td>1</td>
                        <td>
                            <img src="data:image/png;base64,${e.VisitorId}" class="rounded-circle" width="50" height="50" alt="visitor">
                        </td>
                        <td>
                            <img src="data:image/png;base64,${e.VisitorPhoto}" class="rounded-circle" width="50" height="50" alt="visitor">
                        </td>
                        <td class="fw-semibold text-uppercase">${e.visitor_name}</td>
                        <td>${e.visitor_phone}</td>
                        <td class="text-uppercase">${e.visitor_company}</td>
                        <td class="text-uppercase">${e.card_id}</td>
                        <td><span class="badge bg-info">${e.TypeOfVisitor}</span></td>
                        <td><span class="badge bg-warning text-dark">${e.Temperature}°</span></td>
                        <td>${e.visitor_checkIn}</td>
                        <td>${e.visitor_checkOut}</td>
                        <td><span class="badge bg-secondary">${e.visitor_status}</span></td>
                        <td><span class="badge ${e.is_from_reception == 1 ? 'bg-success' : 'bg-danger'} ">${e.is_from_reception == 1 ? 'Yes' :'No'}</span></td>
                        
                    </tr>

            `;
            
        }
        document.getElementById("content").innerHTML+=tr;
    })
    .catch(error => console.error("Error:", error));
}