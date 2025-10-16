
$(document).ready(() => {

    typeofvisitor();
    Purposeofvisitor();
    
    const userdata = JSON.parse(sessionStorage.getItem("Invitedata"))
 
    setTimeout(function () {
        $("#txtname").val(userdata.GuestName)
        $("#txtcompany").val(userdata.GuestCompany)
        $("#txtphone").val(userdata.GuestPhone)
        $("#typeofvisitor").val(userdata.GuestType)
        $("#Purposetovisit").val(userdata.GuestPurpose)
        $("#txtWhomeMeet").val(userdata.employeeId)
        $("#employeeSearch").val(userdata.HostName)
    } , 1000)

});


let video = null;
let stream = null;
let currentPreviewId = null;
let SetImageId = null;
let currentFacingMode = "environment";



function openCameraModal(previewId, fileid) {
    currentPreviewId = previewId;
    SetImageId = fileid;
    
    video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentFacingMode }
    })


        .then(s => {
            stream = s;
            video.srcObject = stream;
            const modal = new bootstrap.Modal(document.getElementById('cameraModal'));
            modal.show();
        })
        .catch(err => {
            alert('Could not access camera: ' + err.message);
        });
}


function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

function captureImage() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');
    document.getElementById(currentPreviewId).style.backgroundImage = `url(${imageData})`;

    document.getElementById(SetImageId).value = imageData;
    
    document.getElementById(currentPreviewId).style.backgroundSize = 'cover';
    document.getElementById(currentPreviewId).style.backgroundPosition = 'center';
    const elemnt = document.querySelector('#' + currentPreviewId);
    for (let i = elemnt.children.length - 1; i >= 0; i--) {

        elemnt.children[i].style.zIndex = -999;
    }
    stopCamera();
    const modal = bootstrap.Modal.getInstance(document.getElementById('cameraModal'));
    modal.hide();
}


function VarifyModal() {
    const modal = new bootstrap.Modal(document.getElementById('VarifyModal'));
    modal.show();
}

function VarifyModalClose() {
    const modalElement = document.getElementById('VarifyModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }
}


function switchCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    currentFacingMode = (currentFacingMode === "environment") ? "user" : "environment";

    navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentFacingMode }
    })
        .then(s => {
            stream = s;
            video.srcObject = stream;
        })
        .catch(err => {
            alert("Camera switch failed or only one camera available. Reverting.");

            currentFacingMode = (currentFacingMode === "environment") ? "user" : "environment";

            navigator.mediaDevices.getUserMedia({
                video: { facingMode: currentFacingMode }
            }).then(s => {
                stream = s;
                video.srcObject = stream;
            });
        });
}

SendOTP = async () => {
    VisitorMobile = $("#txtMobileNumber").val();
    EmailId = $("#EmailId").val()
    Password = $("#Password").val()
    if ($("#EmailId").val() == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();
    }
    if (VisitorMobile != "" && VisitorMobile != undefined) {

        const response = await fetch(`https://ifm360.in/ivmapi/api/FirstTimeVisitor/SendOTP?emailID=${EmailId}&password=${Password}&MobileNo=${VisitorMobile}`);

        const data = await response.json();
        if (data == "OTP Send Sucessfully !!") {
            VarifyModal();
        }
        console.log(data);

    }
    else {
        addNewVisitorfinaly();
    }


}


const varifyopt = async () => {
    let EmailId = $("#EmailId").val();
    let Password = $("#Password").val();
    let VisitorMobile = $("#txtMobileNumber").val();
    let opt = $("#otp1").val().trim() + $("#otp2").val().trim() + $("#otp3").val().trim() + $("#otp4").val().trim()
    if ($("#EmailId").val() == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();
    }
    const response = await fetch(`https://ifm360.in/ivmapi/api/FirstTimeVisitor/VerifyOTP?emailID=${EmailId}&password=${Password}&MobileNo=${VisitorMobile}&OTP=${opt.trim()}`);
    let data = await response.json();

    if (opt.length != 4) {
        alert("Enter Four Digits OTP !!");
        return;
    }

    if (data[0].status == "success") {
        alert(data[0].message)
        VarifyModalClose();
        addNewVisitorfinaly();
    }
    else {
        alert(data[0].message)
    }


    console.log(data);

}


const addNewVisitorfinaly = async () => {
    let val = await validation();
    if (val != '') {
        alert(val);
        return;
    }
    let check = $("#terms").val();
    if (check != undefined) {
        if (!$("#terms").is(":checked")) {

            alert("You must agree to the terms before submitting.");
            return;
        }
    }
    if ($("#EmailId").val() == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();
    }
    document.getElementById("loader").style.display = "flex";
    let formData = new FormData();
    const phoneno = $("#txtphone").val();
    const EmailId = $("#EmailId").val();
    const Passowrd = $("#Password").val();
    const CardNO = $("#txtCardNumber").val();
    formData.append("VisitorMobile", phoneno);
    formData.append("VisitorName", $("#txtname").val());
    formData.append("VisitorCompany", $("#txtcompany").val());
    formData.append("HostEmpID", $("#txtWhomeMeet").val());
    formData.append("HostName", $("#employeeSearch").val());
    formData.append("VisitorCardNo", $("#txtCardNumber").val() == undefined ? '' : $("#txtCardNumber").val());
    formData.append("Remarks", $("#txtremark").val());
    formData.append("PurposeOfVisit", $("#Purposetovisit").val());
    formData.append("VisitorIDImageBase64", $("#IdImage").val() == undefined ? '' : $("#IdImage").val().replace("data:image/png;base64,", ""));
    formData.append("VisitorPhotoImageBase64", $("#PhotoImage").val() == undefined ? '' : $("#PhotoImage").val().replace("data:image/png;base64,", ""));
    formData.append("VisitorType", $("#typeofvisitor").val());
    formData.append("Temperature", $("#txttemperature").val());
    formData.append("LaptopSNo", $("#txtLaptopNumber").val() == undefined ? '' : $("#txtLaptopNumber").val());
    formData.append("VehicleNo", $("#Vechicle").val());
    formData.append("EmailId", $("#EmailId").val());
    formData.append("Password", $("#Password").val());

    const formObject = Object.fromEntries(formData.entries());
    const formJSON = JSON.stringify(formObject);
    sessionStorage.setItem("Userdata", formJSON);

    

    let result = await checkCardAvailability(EmailId, Passowrd, CardNO)
    if (result[0].status == "-1") {
        alert(result[0].message);
        document.getElementById("loader").style.display = "none";
        return;
    } 

    const respose = await fetch("https://ifm360.in/ivmapi/api/InvitedVisitor/AddNewVisitor", {
        method: "POST",
        body: formData,
    })
    if (!respose.ok) {
        alert("Error For fetching/Server Site Records !!")
        document.getElementById("loader").style.display = "none";
        return;
    }
    let data = await respose.json();
    if (data[0].Message == "Visitor Registered Sucessfully !!") {

        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String((now.getHours() % 12) || 12).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

        sessionStorage.setItem("Issudate", formattedDate);
        sessionStorage.setItem("mob", $("#txtphone").val());
        document.getElementById("loader").style.display = "none";
        window.location.href = localStorage.getItem("Url") + "/Admin/PrintPass";
    }
    document.getElementById("loader").style.display = "none";
    console.log(data);


}


const onlynuber = (e) => {
    const regex = /^\d+$/;
    if (!regex.test(e.value)) {
        e.value = '';
    }

}

const typeofvisitor = async () => {
    let EmailId = $("#EmailId").val();
    let Password = $("#Password").val();
    const response = await fetch(`https://ifm360.in/ivmapi/api/FirstTimeVisitor/GetTypeOfVisitor?emailID=${EmailId}&password=${Password}`);

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
    let Password = $("#Password").val();
    const response = await fetch(`https://ifm360.in/ivmapi/api/FirstTimeVisitor/GetPurposeOfVisit?emailID=${EmailId}&password=${Password}`);

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

