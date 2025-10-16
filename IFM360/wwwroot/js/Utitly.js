 function CreateTableFromArray2(arrItems, divid) {

    let col = [];

 

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

            
            

            tabCell.innerHTML = cellValue;

            tabCell.setAttribute('style', cellStyle);

        }

    }

    let container = document.getElementById(divid);

    container.innerHTML = '';

    container.appendChild(table);

}