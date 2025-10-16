const SendMail = async () => {
    let EmailId = document.getElementById("email").value;
    if (EmailId == "") {
        alert("EmailId Can Not Be Blank !!");
        return;
    }
    await fetch(`https://ifm360.in/ivmapi/api/EmployeeModule/SendOTPonEmail?EmployeeEmailID=${EmailId}`).then(response => response.json())
        .then(data => {
         
            document.querySelector("#divsendOtp").style.display = "none";
            document.querySelectorAll("#DivOTP, #DivPIN,#divChangePIn").forEach(el => {
                el.style.display = "block";
                });

            alert(data);
        }).catch(e => {
          
            console.log(e);
        });
}

const ChangePin = async () => {
    let EmailId = document.getElementById("email").value;
    let OTP = document.getElementById("OTP").value;
    let Pin = document.getElementById("NewPin").value;
    if (EmailId == "") {
        alert("EmailId Can not be Black !!")
        return 
    }
    if (OTP == "") {
        alert("OTP Can not be Black !!")
        return
    }
    if (Pin == "") {
        alert("PIN Can not be Black !!")
        return
    }
    await fetch(`https://ifm360.in/ivmapi/api/EmployeeModule/GeneratePIN?EmployeeEmailID=${EmailId}&OTP=${OTP}&PIN=${Pin}`).then(response => response.json())
        .then(data => {
    
            if (data[0].MessageID == "1") {
            document.querySelectorAll("#DivOTP, #DivPIN,#divChangePIn").forEach(el => {
                el.style.display = "none";
           
            });
            document.querySelector("#divsendOtp").style.display = "block";}
            alert("PIN Created Succssfully !!");
            document.getElementById("email").value = "";
           
        }).catch(e => {
               
            console.log(e);
        });
}