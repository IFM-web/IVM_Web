
if (window.location.hostname == "localhost") {
    localStorage.setItem("Url", "");
} else {
    localStorage.setItem("Url", "/IVMCore");
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('d-none');
}

async function checkCardAvailability(EmailId, Password, CardNo) {
    try {
        const response = await fetch(
            `https://ifm360.in/ivmapi/api/InvitedVisitor/CheckCardAvailability?emailID=${EmailId}&password=${Password}&cardNo=${CardNo}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Card Availability Response:", data);

        return data;
    } catch (error) {
        console.error("Error checking card availability:", error);
        return null;
    }
}


async function validation() {
    let msg = "";
    $(".mandatory").each(function () {
        if ($(this).val() == "" || $(this).val() == "0") {
            var name = $(this).attr("name");
            msg += name + " Required !!\n";
        }
    });
    if ($("#txtWhomeMeet").val() == "" && $("#employeeSearch").val() != "")
        msg +="Whom to Meet is invalid !!\n"
    return msg;
}


function Validation() {
    let msg = "";
    $(".mandatory").each(function () {
        if ($(this).val() == "" || $(this).val() == "0") {
            var name = $(this).attr("name");
            msg += name + " Required !!\n";
        }
    });
    if ($("#txtWhomeMeet").val() == "" && $("#employeeSearch").val() != "")
        msg += "Whom to Meet is invalid !!\n"
    return msg;
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


$('#filterInput2').on('keyup', function () {
    let filter = $(this).val().toUpperCase();


    $('#data-table tbody tr').each(function (index) {
        if (index === -1) return;

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
