
$(document).ready(() => {
    let Masking_Flag = $("#Masking_Flag").val();
    typeofvisitor();
    Purposeofvisitor();
    let details = JSON.parse(sessionStorage.getItem("UserDetails"));
    $("#txtNameHeader").text(Masking_Flag == '1' ? masknameany(details.visitor_name) : details.visitor_name);
    $("#txtname1").val(masknameany(details.visitor_name));
    $("#txtname").val(details.visitor_name);
    $("#txtphone").text(details.visitor_phone);
    $("#txtphone1").text(Masking_Flag == '1' ? masknameany(details.visitor_phone) : details.visitor_phone);
    $("#phoneno").val(details.visitor_phone);
    $("#phoneno1").val(masknameany( details.visitor_phone));
    $("#txtLastVIsist").text(details.visitor_checkIn);
    $("#VisitorID").attr("src", "data:image/png;base64," + details.VisitorId);
    $("#VisitorPhoto").attr("src", "data:image/png;base64," +details.VisitorPhoto);
    $("#photoimage").val("data:image/png;base64," + details.VisitorId);
    $("#idimage").val("data:image/png;base64," +details.VisitorPhoto);
 
});

let video = null;
let stream = null;
let currentPreviewId = null;
let SetImageId = null;
let currentFacingMode = "environment";


const maskname = e => {
    const val = e.value;
    const real = $("#txtname").val() || "";  
    const updated = val.length > real.length
        ? real + val.slice(-1) 
        : real.slice(0, -1);   
    $("#txtname").val(updated);  
    e.value = updated.replace(/\S+/g, w =>
        w.length > 2 ? w[0] + "#".repeat(w.length - 2) + w.slice(-1) : w
    );
};


    //  console.log($("#txtname").val());


function openCameraModal(previewId, fileid) {
    currentPreviewId = previewId;
    SetImageId = fileid;
    document.getElementById(SetImageId).value = null;
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
    if (!$("#terms").is(":checked")) {

        alert("You must agree to the terms before submitting.");
        return;
    }
    if ($("#EmailId").val() == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();
    }
    document.getElementById("loader").style.display = "flex";
    let formData = new FormData();

    formData.append("VisitorMobile", $("#phoneno").val());
    formData.append("VisitorName", $("#txtname").val());
    formData.append("VisitorCompany", $("#txtcompany").val() == undefined ? '' : $("#txtcompany").val());
    formData.append("HostEmpID", $("#txtWhomeMeet").val() == undefined ? '' : $("#txtWhomeMeet").val());
    formData.append("HostName", $("#employeeSearch").val() == undefined ? '' : $("#employeeSearch").val());
    formData.append("VisitorCardNo", $("#txtCardNumber").val() == undefined ? '' : $("#txtCardNumber").val());
    formData.append("Remarks", $("#txtremark").val() == undefined ? '' : $("#txtremark").val());
    formData.append("PurposeOfVisit", $("#Purposetovisit").val());
    formData.append("VisitorIDImageBase64", $("#idimage").val() == undefined ? '' : $("#idimage").val().replace("data:image/png;base64,", ''));
    formData.append("VisitorPhotoImageBase64", $("#photoimage").val() == undefined ? '' : $("#photoimage").val().replace("data:image/png;base64,",''));
    formData.append("VisitorType", $("#typeofvisitor").val());
    formData.append("Temperature", $("#txttemperature").val());
    formData.append("LaptopSNo", $("#txtLaptopNumber").val() == undefined ? '' : $("#txtLaptopNumber").val());
    formData.append("VehicleNo", $("#Vechicle").val() == undefined ? '' : $("#Vechicle").val());
    formData.append("EmailId", $("#EmailId").val());
    formData.append("Password", $("#Password").val());

    const formObject = Object.fromEntries(formData.entries());
    const formJSON = JSON.stringify(formObject);
    sessionStorage.setItem("Userdata", formJSON);
    sessionStorage.setItem("mob", $("#phoneno").val());
    let result = await checkCardAvailability($("#EmailId").val(), $("#Password").val(), $("#txtCardNumber").val())
    if (result[0].status == "-1") {
        alert(result[0].message);
        document.getElementById("loader").style.display = "none";
        return;
    } 
    const respose = await fetch("https://ifm360.in/ivmapi/api/FirstTimeVisitor/AddNewVisitor", {
        method: "POST",
        body: formData,
       
    })
    try {
        let data = await respose.json();
   
    console.log(data)
    if (data[0].Message == "Visitor Registered Sucessfully !!") {

        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String((now.getHours() % 12) || 12).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

        sessionStorage.setItem("Issudate", formattedDate);
        document.getElementById("loader").style.display = "none";
        window.location.href = localStorage.getItem("Url") + "/Admin/PrintPass";
    }
        console.log(data);
    }
    catch {
        document.getElementById("loader").style.display = "none";
        alert("Error In Server Side ....")
    }


}


//const onlynuber = (e) => {
//    const regex = /^\d+$/;
//    if (!regex.test(e.value)) {
//        e.value = '';
//    }

//}

const typeofvisitor = async () => {
    let EmailId = $("#EmailId").val();
    let Password = $("#Password").val();
    const response = await fetch(`https://ifm360.in/ivmapi/api/RegisteredVisitor/GetTypeOfVisitor?emailID=${EmailId}&password=${Password}`);

    const result = await response.json();

    if (result.length > 0) {
        const dropdown = document.getElementById("typeofvisitor");
        if (dropdown != null) {

            result.forEach(e => {
                const option = document.createElement("option");
                option.value = e.TypeOfVisitor;
                option.textContent = e.TypeOfVisitor;
                dropdown.appendChild(option);
            });
        }
    }




}

const Purposeofvisitor = async () => {
    let EmailId = $("#EmailId").val();
    let Password = $("#Password").val();
    const response = await fetch(`https://ifm360.in/ivmapi/api/RegisteredVisitor/GetPurposeOfVisit?emailID=${EmailId}&password=${Password}`);

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

function EditDetails() {
    $("#detailcard").addClass("d-none");
    $("#phonefiled").removeClass("d-none");
    $("#Capture1").removeClass("d-none");
    $("#Capture2").removeClass("d-none");
    $("#namefield").removeClass("d-none");
    let details = JSON.parse(sessionStorage.getItem("UserDetails"));
    $("#txtname").val(details.visitor_name);
    $("#phoneno").val(details.visitor_phone);
}
