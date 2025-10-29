window.onload = function () {
    history.pushState(null, "", location.href);

    window.onpopstate = function () {
        // Example: redirect to home instead of actual back
        window.location.href = "/Admin/Index";
    };
};

    function PrintPass() {
        const content = document.getElementById('visitorCard').innerHTML;

    const printWindow = window.open();

    printWindow.document.write(`
    <html>
        <head>
            <title>Print Visitor Card</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" integrity="sha384-..." crossorigin="anonymous">
              <style>
              .col-7{
                  padding:0 12px;
              }
              </style>
        </head>
        <body>
            ${content}
        </body>
    </html>
    `);

    printWindow.document.close();

    printWindow.focus();

        // Delay print to allow styles to load
        setTimeout(() => {
        printWindow.print();
    printWindow.close();
        }, 500); // Wait 0.5 sec to ensure styles are applied
    }




let data = JSON.parse(sessionStorage.getItem("Userdata"));
console.log(data);


$("#txtname").text(data.VisitorName);
$("#txtname1").text(masknameany(data.VisitorName));
$("#txtcompany").text(data.VisitorCompany);
$("#txtphone").text(sessionStorage.getItem("mob") == undefined ? data.Phone : sessionStorage.getItem("mob"));
$("#txtphone1").text(sessionStorage.getItem("mob") == undefined ? masknameany(data.Phone) : masknameany(sessionStorage.getItem("mob")));
$("#txtmeet").text(data.HostName);
//$("#txttemp").text(data.Temperature);
$("#txtlaptop").text(data.LaptopSNo);
$("#txtVehicle").text(data.VehicleNo);
$("#txtremarks").text(data.Remarks == "undefined" ? ' ' : data.Remarks);
$("#txtdate").text(data.Issudate == undefined ? sessionStorage.getItem("Issudate") : data.Issudate);
$("#photo").attr("src","data:image/png;base64,"+ data.VisitorPhotoImageBase64);