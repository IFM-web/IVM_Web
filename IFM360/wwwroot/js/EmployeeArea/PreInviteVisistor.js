
$(document).ready(() => {
    if ($("#typeofvisitor").val() != undefined)
        typeofvisitor();

    if ($("#Purposetovisit").val() != undefined)
        Purposeofvisitor();
    $("#txtPhone").val(sessionStorage.getItem("mob"));
});
function formatDate(date) {
    let Convertdate = new Date(date)
    return Convertdate.toISOString().split("T")[0];
}

const addNewVisitor = async () => {
 
    if ($("#EmailId").val() == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();
    }
    let val = await validation();
    if (val != '') {
        alert(val);
        return;
    }
    document.getElementById("loader").style.display = "flex";
    let EmailId = $("#EmailId").val();
    let VName = $("#txtVName").val();
    let Location = $("#txtLocation").val();
    let VEmail = $("#txtvemail").val();
    let VPhone = $("#txtphone").val() == undefined ? '' : $("#txtphone").val();
    let VCompany = $("#txtcompany").val();
    let typeofvisitor = $("#typeofvisitor").val();
    let Purposetovisit = $("#Purposetovisit").val();
    let Vhour = $("#txthour").val();
    let VMin = $("#txtmin").val();   
    
    let VDate = $("#txtDate").val();
   
    let Vtime = Vhour + ':' + VMin;
    
  
    try {

        const response = await fetch(
            `https://ifm360.in/ivmapi/api/EmployeeModule/SendPreInvitation?EmployeeEmailID=${EmailId}&v_Name=${VName}&v_Email=${VEmail}&v_Mobile=${VPhone}&Location=${Location}&Date=${VDate}&time=${Vtime}&v_Company=${VCompany}&v_Purpose=${Purposetovisit}&v_Type=${typeofvisitor}`);

        const result = await response.json();
        alert(result[0].Message);
        if (result[0].Message == "Pre invitation send sucessfully to visitor !!") {
            window.location.reload();
        }
        console.log(result);
    }
    catch (data) {
        document.getElementById("loader").style.display = "none";
        console.log(data);
    }

}


const onlynuber = (e) => {
    const regex = /^\d+$/;
    if (!regex.test(e.value)) {
        e.value = '';
    }

}

const typeofvisitor = async () => {
    let EmailId = $("#EmailId").val();

    const response = await fetch(`https://ifm360.in/ivmapi/api/EmployeeModule/GetTypeOfVisitor?EmployeeEmailID=${EmailId}`);

    const result = await response.json();

    if (result.length > 0) {
        const dropdown = document.getElementById("typeofvisitor");

        result.forEach(e => {
            const option = document.createElement("option");
            option.value = e.TypeOfVisitor;
            option.textContent = e.TypeOfVisitor;
            dropdown.appendChild(option);
        });
    }




}

const Purposeofvisitor = async () => {
    let EmailId = $("#EmailId").val();
    const response = await fetch(`https://ifm360.in/ivmapi/api/EmployeeModule/GetPurposeOfVisit?EmployeeEmailID=${EmailId}`);

    const result = await response.json();

    if (result.length > 0) {
        const dropdown = document.getElementById("Purposetovisit");

        result.forEach(e => {
            const option = document.createElement("option");
            option.value = e.PurposeOfVisitValue;
            option.textContent = e.PurposeOfVisit;
            dropdown.appendChild(option);
        });
    }




}

