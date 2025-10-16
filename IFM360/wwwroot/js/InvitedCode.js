const Getdata = async () => {
    const EmailId = $("#EmailId").val();
    const Password = $("#Password").val();
    const VisitorMobile = $("#txtphoneno").val();
    if ($("#EmailId").val() == "") {
        alert("Session Expired, Please Login Again !!");
        window.location.reload();
    }
    if (VisitorMobile !== '') {
        const response = await fetch(`https://ifm360.in/ivmapi/api/InvitedVisitor/GetVisitorDetailsthruInviteCode?emailID=${EmailId}&password=${Password}&inviteCode=${VisitorMobile}`);
        const data = await response.json();
        if (data[0].MessageID == "1") {
            console.log(data);
            sessionStorage.setItem("Invitedata", JSON.stringify(data[0]));
            window.location.href = localStorage.getItem("Url") + "/Admin/InvitedVisitor"
      

        }
        else {
            alert(data[0].MessageString);
        };
    } else {
        alert("Enter Invited Code")
    }

}