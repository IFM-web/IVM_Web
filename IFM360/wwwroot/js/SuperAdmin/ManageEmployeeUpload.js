$("#btnexcelsave").on("click", function (e) {
    e.preventDefault();

    var office = $("#office").val();
    var fileInput = $("#excelFile")[0];
    var file = fileInput.files[0];



    if (office =="0") {
        alert("Please Select Office.");
        return;
    }
    if (!file) {
        alert("Please Select A Excel File.");
        return;
    }

    var allowedExtensions = /(\.xlsx|\.xls)$/i;
    if (!allowedExtensions.exec(file.name)) {
        alert("Please upload only .xlsx or .xls files.");
        fileInput.value = ""; // clear file input
        return;
    }

    var formData = new FormData();
    formData.append("file", file);
    formData.append("office", office);

    $.ajax({
        url: localStorage.getItem("Url") + "/SuperAdmin/ImportExcel",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            var resp = JSON.parse(response);
            alert("Data Upload Successfully !!")
            $("#list").empty();
            if (resp.length > 0) {
                $("#list").prepend(`<div>
             <span class="mt-4">Below is the list of Employee's whose data is not uploaded due to Department Mismatch-</span>       
             <button class="" id="ExcelBtn" onclick="Downloadexcel()" style="    height: max-content;">Export Un-Uploaded Data To Excel</button>
             <div>
            `)
                CreateTableFromArray2(resp, "FormatDiv");
            }
            $("#excelFile").val('')
            console.log(resp)


        },
        error: function (xhr) {
            alert("Something went wrong !!!")

            console.error(xhr);
        }
    });
});

function Downloadexcel() {
    const table = document.getElementById("data-table");
 
   

    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    XLSX.writeFile(workbook, "Employee Un-Uplodated Data.xlsx");
}


