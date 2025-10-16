$(document).ready(() => {
    DashboardList();
})

const DashboardList = async () => {
    document.getElementById("loader").style.display = "flex";
    let EmailId = $("#EmailId").val();
    let Password = $("#Password").val();
    if (EmailId == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();
    }
    try {
        const response = await fetch(localStorage.getItem("Url")+`/AdminArea/GetAppSettingAdmin`);
        const data1 = await response.json();
        const data = JSON.parse(data1);
        console.log(data);
        const response2 = await fetch(localStorage.getItem("Url")+`/AdminArea/GetAdminDashboard`);
        const data22 = await response2.json();
        const data2 = JSON.parse(data22);
        console.log(data2)
        const flgs = data[0];
        document.getElementById("loader").style.display = "none";
        const newArr = data2.map((e, i) => ({


            SrNo: i + 1,
            ...(flgs.name_flag == 1 && { ["Visitor Name"]: e.Name }),

            ...(flgs.mobile_no_flag == 1 && { ["Visitor Phone"]: e.Phone }),
            ...(flgs.isCompanyAllowed == 1 && {
                ["Visitor Company"]: e.Company
            }),
            ...(flgs.purpose_flag == 1 && { ["Purpose Of Visit"]: e.Purpose }),
            ...(flgs.Type_Of_Visitor_Flag == 1 && { ["Type Of Visitor"]: e.TypeOfVisitor }),
            ["Host Name"]: e.HostName,
            ["Host Phone"]: e.HostPhone,

            ...(flgs.isCardAllowed == 1 && { ["Card No"]: e.CardNo, }),
            ...(flgs.temperature_flag == 1 && { Temperature: e.Temperature })
            ,
            ["Check In Time"]: e.CheckIn,

            ...(flgs.Vehicle_Flag == 1 && { ["Vehicle No"]: e.VehicleNo }),
            Invited: e.Invited == 0 ? 'Yes' : 'No',
            Status: e.Status,





            ...(flgs.laptop_Flag == 1 && { ["Laptop Serial No"]: e.LaptopSerialNo }),
            ["Additional Details"]: e.Remarks,
           
            
            Action: `<div style="white-space: nowrap; margin:0px; display:flex; text-align:left;" ><button class="btn btn-danger" style="margin-right:10px;" onclick=checkOut(${e.id})>Check Out</button> ${e.Status == 'Accepted' ? `<a style="white-space: nowrap;" class="btn btn-success" href="${localStorage.getItem("Url")}/AdminArea/PrintPass?Id=${e.id}">Print Pass</a>` : ''}</div>`
        }))
        //console.log(newArr)

        CreateTableFromArray2(newArr, "PrintDiv")
    }
    catch (data) {
        document.getElementById("loader").style.display = "none";
    }
}




function CreateTableFromArray2(arrItems, divid) {

    let col = [];

    if (arrItems.length > 0) {

        $("#ExportExcelFile").removeClass('d-none');

    }

    // 1. Extract all unique keys

    for (let i = 0; i < arrItems.length; i++) {

        for (let key in arrItems[i]) {

            if (col.indexOf(key) === -1) {

                col.push(key);

            }

        }

    }

    // 2. Detect which columns are completely null or empty (for hiding)

    let hiddenColumns = ['Edit', 'Delete', 'Action'].filter(colName => {

        return arrItems.every(item => !item[colName] || item[colName].toString().trim() === '');

    });

    // 3. Create table

    let table = document.createElement("table");

    table.setAttribute('id', 'data-table');

    table.setAttribute('class', 'table table-bordered-hover');

    // 4. Table header

    let tr = table.insertRow(-1);

    for (let i = 0; i < col.length; i++) {

        let th = document.createElement('th');

        th.innerHTML = col[i];

        let shouldHide = col[i].includes("Hid_") || hiddenColumns.includes(col[i]);

        th.setAttribute('style',

            'font:18px Calibri;' +

            'border-collapse: collapse; font-weight:bold;' +

            ' background-color: #1E3A5F;  color:white;' +

            'padding: 2px 3px; text-align: center;' +

            'display:' + (shouldHide ? 'none' : '') + ';'

        );

        tr.appendChild(th);

    }

    // 5. Table body rows

    for (let z = 0; z < arrItems.length; z++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {

            let tabCell = tr.insertCell(-1);

            let shouldHide = col[j].includes("Hid_") || hiddenColumns.includes(col[j]);

            let cellValue = arrItems[z][col[j]];

            let baseBgColor = z % 2 === 0 ? "#ffffff" : "#f2f2f2"; // alternate row colors

            let cellStyle =

                'font:18px Calibri;' +

                'border-collapse: collapse; ' +

                'padding: 2px 3px; text-align: center;' +

                'display:' + (shouldHide ? 'none' : '') + ';' +

                'background-color: ' + baseBgColor + ';';

            if (col[j] === "Check In Time") {

                cellStyle += " min-width: 180px;";

            }

            // Special styling for Invited and Status

            if (col[j] === "Invited") {

                if (cellValue === "Yes") {

                    cellValue = `<span class="badge bg-success">Yes</span>`;

                } else if (cellValue === "No") {

                    cellValue = `<span class="badge bg-danger">No</span>`;

                }

            }

            if (col[j] === "Status") {

                if (cellValue.toLowerCase() === "accepted") {

                    cellValue = `<span class="badge bg-success">Accepted</span>`;

                } else if (cellValue.toLowerCase() === "rejected") {

                    cellValue = `<span class="badge bg-danger">Rejected</span>`;

                } else if (cellValue.toLowerCase() === "wait") {

                    cellValue = `<span class="badge bg-warning text-dark">Wait</span>`;

                }

            }

            tabCell.innerHTML = cellValue;

            tabCell.setAttribute('style', cellStyle);

        }

    }

    let container = document.getElementById(divid);

    container.innerHTML = '';

    container.appendChild(table);

}


const checkOut = async (visitorid) => {
    const response = await fetch(localStorage.getItem("Url") + `/AdminArea/Checkout?Id=${visitorid}`);
    const data1 = await response.json();
    var data = JSON.parse(data1);
    if (data[0].status == 'success') {
        DashboardList();
        alert(data[0].message)
    }
}

const Printpass = async (visitorid) => {
    const response = await fetch(`https://ifm360.in/ivmapi/api/VisitorDashboard/GetPassDetails?VisitorID=${visitorid}`);
    const data = await response.json();
    // console.log(data);
    if (data[0].MessageID == '1') {
        // console.log(data)
        var dataobj = {
            VisitorName: data[0].visitor_name,
            VisitorCompany: data[0].visitor_company,
            Phone: data[0].visitor_phone,
            HostName: data[0].WhomToMeetName,
            LaptopSNo: data[0].LaptopSerialNo,
            VehicleNo: data[0].VehicleNo,
            Remarks: data[0].visitor_devices_list,
            VisitorPhotoImageBase64: data[0].VisitorPhoto,
            Issudate: data[0].visitor_checkIn


        };
        let formJSON = JSON.stringify(dataobj);
        sessionStorage.removeItem("Userdata");
        sessionStorage.removeItem("mob");
        sessionStorage.setItem("Userdata", formJSON);
        window.location.href = localStorage.getItem("Url") + "/Admin/PrintPass"
    }
}


$('#filterInput').on('keyup', function () {
    let filter = $(this).val().toUpperCase();


    $('#data-table tbody tr').each(function (index) {
        if (index === 0) return;

        let row = $(this);
        let match = false;

        // Check each cell in the row
        row.find('td').each(function () {
            if ($(this).text().toUpperCase().indexOf(filter) > -1) {
                match = true;
                return false;
            }
            else {
                row.add('<tr><td>Not Found</td></tr>')
            }
        });


        row.toggle(match);
    });
});

function Refresh() {
    DashboardList();
}
//setInterval(DashboardList, 10000)