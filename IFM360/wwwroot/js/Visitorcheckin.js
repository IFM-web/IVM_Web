
$(document).ready(() => {
    if ($("#typeofvisitor").val() != undefined) 
        typeofvisitor();
    
    if ($("#Purposetovisit").val() != undefined)  
        Purposeofvisitor();
    let PHone = sessionStorage.getItem("mob")
    $("#txtPhonehid").val(masknameany(PHone));
    $("#txtPhone").val(PHone);
});


let video = null;
let stream = null;
let currentPreviewId = null;
let SetImageId = null;
let currentFacingMode = "environment"; 



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
    $('#otp1').val('');
    $('#otp2').val('');
    $('#otp3').val('');
    $('#otp4').val('');
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

//const masknameany = e => {
//   return  value = e.replace(/\S+/g, w =>
//        w.length > 2
//            ? w[0] + "#".repeat(w.length - 2) + w[w.length - 1]
//            : w
//    );
  //  console.log($("#txtname").val());
   
//};


const addNewVisitorfinaly = async () => {
    if ($("#EmailId").val() == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();
    }
    let val = await validation();
    if (val != '') {
        alert(val);
        return;
    }
    var chekbox = $("#terms").val();
    if (chekbox != undefined) {
        if (!$("#terms").is(":checked")) {

            alert("You must agree to the terms before submitting.");
            return;
        }
    }
    document.getElementById("loader").style.display = "flex";
    let formData = new FormData();

    formData.append("VisitorMobile", sessionStorage.getItem("mob"));
    formData.append("VisitorName", $("#txtname").val() == undefined ? '' : $("#txtname").val().toUpperCase());
    formData.append("VisitorCompany", $("#txtcompany").val() == undefined ? '' : $("#txtcompany").val());
    formData.append("HostEmpID", $("#txtWhomeMeet").val() == undefined ? '' : $("#txtWhomeMeet").val());
    formData.append("HostName", $("#employeeSearch").val() == undefined ? '' : $("#employeeSearch").val());
    formData.append("VisitorCardNo", $("#txtCardNumber").val() == undefined ? '' : $("#txtCardNumber").val());
    formData.append("Remarks", $("#txtremark").val() == undefined ? '' : $("#txtremark").val());
    formData.append("PurposeOfVisit", $("#Purposetovisit").val() == undefined? '': $("#Purposetovisit").val());
    formData.append("VisitorIDImageBase64", $("#IdImage").val() == undefined ? '' : $("#IdImage").val().replace("data:image/png;base64,", ""));
    formData.append("VisitorPhotoImageBase64", $("#PhotoImage").val() == undefined ? '' : $("#PhotoImage").val().replace("data:image/png;base64,", ""));
    formData.append("VisitorType", $("#typeofvisitor").val() == undefined ? '' : $("#typeofvisitor").val());
    formData.append("Temperature", $("#txttemperature").val() == undefined ? '' : $("#txttemperature").val());
    formData.append("LaptopSNo", $("#txtLaptopNumber").val() == undefined ? '' : $("#txtLaptopNumber").val());
    formData.append("VehicleNo", $("#Vechicle").val() == undefined ? '' : $("#Vechicle").val());
    formData.append("EmailId", $("#EmailId").val() == undefined ? '' : $("#EmailId").val());
    formData.append("Password", $("#Password").val());

    const formObject = Object.fromEntries(formData.entries());
    const formJSON = JSON.stringify(formObject);
    sessionStorage.setItem("Userdata", formJSON);
    if ($("#txtCardNumber").val() != undefined) {
        let result = await checkCardAvailability($("#EmailId").val(), $("#Password").val(), $("#txtCardNumber").val())
        if (result[0].status == "-1") {
            alert(result[0].message);
            document.getElementById("loader").style.display = "none";
            return;
        }
    }
    const respose= await fetch("https://ifm360.in/ivmapi/api/FirstTimeVisitor/AddNewVisitor", {
        method: "POST",
        body: formData, 
    })
    let data = await respose.json();
    if (data[0].Message == "Visitor Registered Sucessfully !!") {

        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String((now.getHours() % 12) || 12).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

        sessionStorage.setItem("Issudate", formattedDate);
        document.getElementById("loader").style.display = "none";
        window.location.href = localStorage.getItem("Url") + "/Admin/PrintPass";
    }
    console.log(data);
 

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

