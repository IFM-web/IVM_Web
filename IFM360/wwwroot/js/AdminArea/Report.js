$(document).ready(() => {
    $('#startDate').val(new Date(Date.now()).toISOString().split('T')[0])
    $('#endDate').val(new Date(Date.now()).toISOString().split('T')[0])
   // GetAllData();
})



const GetAllData = async () => {
 
    document.getElementById("loader").style.display = "flex";

 
    try {
        const response = await fetch(localStorage.getItem("Url") + `/AdminArea/GetAppSettingAdmin`);
        const data1 = await response.json();
        const data = JSON.parse(data1);
        console.log(data);
        const response2 = await fetch(localStorage.getItem("Url") + `/AdminArea/GetAllVisitorDataAdmin`);
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
            ...(flgs.Temperature == 1 && { Temperature: e.Temperature })
            ,
            ["Check In Time"]: e.visitor_checkIn,
            ["Check Out Time"]: e.visitor_checkOut,

            ...(flgs.Vehicle_Flag == 1 && { ["Vehicle No"]: e.VehicleNo }),
            Invited: e.Invited == 0 ? 'Yes' : 'No',
            Status: e.Status,





            ...(flgs.laptop_flag == 1 && { ["Laptop Serial No"]: e.LaptopSerialNo }),



        }))
        //console.log(newArr)

        CreateTableFromArray2(newArr, "HidDivAlldata")
        getexcel();
    }
    catch (data) {
        document.getElementById("loader").style.display = "none";
    }
}

const getexcel=()=>{
    const table = document.getElementById("data-table");

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
        const response = await fetch(localStorage.getItem("Url") + `/AdminArea/GetAppSettingAdmin`);
        const data1 = await response.json();
        const data = JSON.parse(data1);
        console.log(data);
        const response2 = await fetch(localStorage.getItem("Url") + `/AdminArea/GetDateRangeVisitorListAdmin?Sdate=${startDate}&&Edate=${endDate}`);
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
            ...(flgs.Temperature == 1 && { Temperature: e.Temperature })
            ,
            ["Check In Time"]: e.visitor_checkIn,
            ["Check Out Time"]: e.visitor_checkOut,

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
        const response = await fetch(localStorage.getItem("Url") + `/AdminArea/GetAppSettingAdmin`);
        const data1 = await response.json();
        const data = JSON.parse(data1);
        console.log(data);
        const response2 = await fetch(localStorage.getItem("Url") + `/AdminArea/GetReportDetailsAdmin?Sdate=${startDate}&&Edate=${endDate}&&Flag=${Flag}`);
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
            ...(flgs.Temperature == 1 && { Temperature: e.Temperature })
            ,
            ["Check In Time"]: e.visitor_checkIn,
            ["Check Out Time"]: e.visitor_checkOut,

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
