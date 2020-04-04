
$(document).ready(function () {
  
    // read from local storage
    let lsFirstName = localStorage.getItem('firstName');
    let lsEmailAddress = localStorage.getItem('emailAddress');

    // check if variables are null (local storage not initiated)
    if (lsFirstName == null && lsEmailAddress == null ) {

        console.log("Local storage not initiated.");
                    
    } else {
       
        // local storage is initiated so we can display 
        $("#login").text("Hi " + lsFirstName + " (" + lsEmailAddress + ")");
        $("#firstName").val("not you? change it ...");
        $("#emailAddress").val("wrong e-mail? change it ...");

    }
    
    $("#signin").on("click", function() {
   
        // check if credentials are not empty
        if ( $("#firstName").val() === "" ) {
            localStorage.removeItem('firstName');
        } else {
            // we only update this when there is a new user
            if ($("#firstName").val() !== "not you? change it ..." ) {
                localStorage.setItem('firstName',$("#firstName").val());
            }
        }

        if ( $("#emailAddress").val() === "" ) {
            localStorage.removeItem('emailAddress');
        } else {
            // we only update this when there is a new email
            if ($("#emailAddress").val() !== "wrong e-mail? change it ...") {
                localStorage.setItem('emailAddress',$("#emailAddress").val());
            } 
        }

        // Here I would add OAUTH to SLACK
    
    })
});