function PrintPass() {
    const content = document.getElementById('visitorCard').innerHTML;

    const printWindow = window.open();

    printWindow.document.write(`<html>
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
    </html>`);

    printWindow.document.close();

    printWindow.focus();

    // Delay print to allow styles to load
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500); // Wait 0.5 sec to ensure styles are applied
}