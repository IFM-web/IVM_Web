$(document).ready(() => {
    $('#startDate').val(new Date(Date.now()).toISOString().split('T')[0])
    $('#endDate').val(new Date(Date.now()).toISOString().split('T')[0])
    //GetDataist();
})



const GetAllData = async () => {
 
    document.getElementById("loader").style.display = "flex";

 
    try {
        const response = await fetch(localStorage.getItem("Url") + `/SuperAdmin/GetAppSettingAdmin`);
        const data1 = await response.json();
        const data = JSON.parse(data1);
        console.log(data);
        const response2 = await fetch(localStorage.getItem("Url") + `/SuperAdmin/GetAllVisitorDataAdmin`);
        const data22 = await response2.json();
        const data2 = JSON.parse(data22);
      
        console.log(data2)
        const flgs = data[0];
        document.getElementById("loader").style.display = "none";
        const newArr = data2.map((e, i) => ({


            SrNo: i + 1,
            //["Visitor ID"]: `<img width="50px"  height="50px" src="data:image/png;base64,${e.VisitorId}">`,
            //["Picture"]: `<img width="50px" height="50px" src="data:image/png;base64,${e.VisitorPhoto}">`,

            ...(flgs.name_flag == 1 && { ["Guest Name"]: e.visitor_name }),

            ...(flgs.mobile_no_flag == 1 && { ["Guest Phone"]: e.visitor_phone }),
            ...(flgs.isCompanyAllowed == 1 && {
                ["Guest Company"]: e.visitor_company
            }),
        //    ...(flgs.purpose_flag == 1 && { ["Purpose Of Visit"]: e.Purpose }),
            ...(flgs.Type_Of_Visitor_Flag == 1 && { ["Type Of Visitor"]: e.TypeOfVisitor }),
            ["Host Name"]: e.WhomToMeetName,
            ["Host Phone"]: e.Mobile,

            ...(flgs.isCardAllowed == 1 && { ["Card No"]: e.card_id, }),
            ...(flgs.Temperature == 1 && { Temperature: e.Temperature == 'undefined' ? '' : e.Temperature == undefined ? '' : e.Temperature })
            ,
            ["Check In Time"]: e.visitor_checkIn,
            ["Check Out Time"]: e.visitor_checkOut,

            ...(flgs.Vehicle_Flag == 1 && { ["Vehicle No"]: e.VehicleNo }),
            Invited: e.Invited == 0 ? 'Yes' : 'No',
            Status: e.Status,

            Remark: e.Remarks,



            ...(flgs.laptop_flag == 1 && { ["Laptop Serial No"]: e.LaptopSerialNo }),



        }))
        //console.log(newArr)

        CreateTableFromArrayHid(newArr, "HidDivAlldata")
        getexcel();
    }
    catch (data) {
        document.getElementById("loader").style.display = "none";
    }
}

const getexcel=()=>{
    const table = document.getElementById("data-tableHid");

    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    XLSX.writeFile(workbook, "All Visitor Data.xlsx");
}

const ExcelDownload =()=>{
    const table = document.getElementById("data-table");

    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    XLSX.writeFile(workbook, "Visitor Data.xlsx");
}


const GetDataist = async () => {
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();
    document.getElementById("loader").style.display = "flex";


    try {
        const response = await fetch(localStorage.getItem("Url") + `/SuperAdmin/GetAppSettingAdmin`);
        const data1 = await response.json();
        const data = JSON.parse(data1);
        console.log(data);
        const response2 = await fetch(localStorage.getItem("Url") + `/SuperAdmin/GetDateRangeVisitorListAdmin?Sdate=${startDate}&&Edate=${endDate}`);
        const data22 = await response2.json();
        const data2 = JSON.parse(data22);
        if (data2.length == 0) {
            document.getElementById("loader").style.display = "none";
            alert("Data Not Found !!");
  
            return;
        }
        console.log(data2)
        const flgs = data[0];
        document.getElementById("loader").style.display = "none";
        const newArr = data2.map((e, i) => ({


            SrNo: i + 1,
            //["Visitor ID"]: `<img width="50px"  height="50px" src="data:image/png;base64,${e.VisitorId}">`,
            //["Picture"]: `<img width="50px" height="50px" src="data:image/png;base64,${e.VisitorPhoto}">`,

            ...(flgs.name_flag == 1 && { ["Guest Name"]: e.visitor_name }),

            ...(flgs.mobile_no_flag == 1 && { ["Guest Phone"]: e.visitor_phone }),
            ...(flgs.isCompanyAllowed == 1 && {
                ["Guest Company"]: e.visitor_company
            }),
            //    ...(flgs.purpose_flag == 1 && { ["Purpose Of Visit"]: e.Purpose }),
            ...(flgs.Type_Of_Visitor_Flag == 1 && { ["Type Of Visitor"]: e.TypeOfVisitor }),
            ["Host Name"]: e.WhomToMeetName,
            ["Host Phone"]: e.Mobile,

            ...(flgs.isCardAllowed == 1 && { ["Card No"]: e.card_id, }),
            ...(flgs.Temperature == 1 && { Temperature: e.Temperature == 'undefined' ? '' : e.Temperature == undefined ? '' : e.Temperature }),
            
            ["Check In Time"]: e.visitor_checkIn,
            ["Check Out Time"]: e.visitor_checkOut,
            Remark: e.Remarks,
            ...(flgs.Vehicle_Flag == 1 && { ["Vehicle No"]: e.VehicleNo }),
            Invited: e.Invited == 0 ? 'Yes' : 'No',
            //Status: e.Status,





            ...(flgs.laptop_flag == 1 && { ["Laptop Serial No"]: e.LaptopSerialNo }),
            Office: e.Office,



        }))
        //console.log(newArr)

        CreateTableFromArray2(newArr, "PrintDiv")
       
    }
    catch (data) {
        document.getElementById("loader").style.display = "none";
    }
}


const GetDataistStatus = async (Flag) => {
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();
    document.getElementById("loader").style.display = "flex";


    try {
        const response = await fetch(localStorage.getItem("Url") + `/SuperAdmin/GetAppSettingAdmin`);
        const data1 = await response.json();
        const data = JSON.parse(data1);
        console.log(data);
        const response2 = await fetch(localStorage.getItem("Url") + `/SuperAdmin/GetReportDetailsAdmin?Sdate=${startDate}&&Edate=${endDate}&&Flag=${Flag}`);
        const data22 = await response2.json();
        const data2 = JSON.parse(data22);
        $("#PrintDiv").empty();
        if (data2.length == 0) {
            document.getElementById("loader").style.display = "none";
            alert("Data Not Found !!");
  
            return;
        }
        console.log(data2)
        const flgs = data[0];
        document.getElementById("loader").style.display = "none";
        const newArr = data2.map((e, i) => ({


            SrNo: i + 1,
            //["Visitor ID"]: `<img width="50px"  height="50px" src="data:image/png;base64,${e.VisitorId}">`,
            //["Picture"]: `<img width="50px" height="50px" src="data:image/png;base64,${e.VisitorPhoto}">`,

            ...(flgs.name_flag == 1 && { ["Guest Name"]: e.visitor_name }),

            ...(flgs.mobile_no_flag == 1 && { ["Guest Phone"]: e.visitor_phone }),
            ...(flgs.isCompanyAllowed == 1 && {
                ["Guest Company"]: e.visitor_company
            }),
            //    ...(flgs.purpose_flag == 1 && { ["Purpose Of Visit"]: e.Purpose }),
            ...(flgs.Type_Of_Visitor_Flag == 1 && { ["Type Of Visitor"]: e.TypeOfVisitor }),
            ["Host Name"]: e.WhomToMeetName,
            ["Host Phone"]: e.Mobile,

            ...(flgs.isCardAllowed == 1 && { ["Card No"]: e.card_id, }),
            ...(flgs.Temperature == 1 && { Temperature: e.Temperature == 'undefined' ? '' : e.Temperature }),
            
            ["Check In Time"]: e.visitor_checkIn,
            ["Check Out Time"]: e.visitor_checkOut,

            ...(flgs.Vehicle_Flag == 1 && { ["Vehicle No"]: e.VehicleNo }),
            Invited: e.Invited == 0 ? 'Yes' : 'No',
            //Status: e.Status,



            Remark: e.Remarks,

            ...(flgs.laptop_flag == 1 && { ["Laptop Serial No"]: e.LaptopSerialNo }),
            Office: e.Office,



        }))
        //console.log(newArr)

        CreateTableFromArray2(newArr, "PrintDiv")
       
    }
    catch (data) {
        document.getElementById("loader").style.display = "none";
    }
}


function CreateTableFromArrayHid(arrItems, divid) {

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

    table.setAttribute('id', 'data-tableHid');

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