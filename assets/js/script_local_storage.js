$(document).ready(function () {
  

// check local storage
let lsUsername = localStorage.getItem('username');

if (lsUsername === null ) {
    console.log("Local storage not initiated.");

} else {
    // update DOM to welcome user with his name
    $("#login").text("Hi " + lsUsername);
    $("#username").val("not you? type in your name...");
}

$("#signin").on("click", function() {

    // set local storage
    localStorage.setItem('username',$("#username").val());

})

});