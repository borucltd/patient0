$(document).ready(function () {

 // Slack variables
 let urlSlack = 'https://slack.com/api/chat.postMessage';
 let tokenSlack = 'xoxp-895731779237-915924899730-1035125937767-7b9c72aff0661c819e5867298d654e63';
 let channelSlack = 'nbmc_slacks';
 let messageSlack = 'Hey this is a test message.';
 let userSlack = localStorage.getItem('username');
 let imageTitleSlack = ".:: Random NASA image ::.";
 let imageSlackUrl="https://southaustralia.com/places-to-go/southaustralia.com/-/media/Consumer-images/Non-blog-page-images/Brand-team-updated-hero/Adelaide-Hills/Adelaide-HIlls-Landscape.jpg";

 // Slack API call
 $("#slackme").on("click", fslackme);
 
 // Functions
 function fslackme() {
 
    event.preventDefault();

    // pick up fresh data from DOM
    imageSlackUrl=$("#generated-image").attr('src');
    messageSlack="From " + userSlack +" "+  $("#messageSlack").val();
    
    // make a POST call to slack
    // this will be message and a photo
    $.ajax({
         url: urlSlack,
         type: 'POST',
         dataType: 'json', // returned data will be JSON
         data: {
             "token": tokenSlack,
             "channel": channelSlack,
             "text": messageSlack,
             "as_user": true,
             "username": userSlack,
             "attachments": JSON.stringify([{title: imageTitleSlack, image_url: imageSlackUrl}] ),
             },

         error: function(response){
             console.log("ERROR with SLACK API");
         },

         success: function(response) {
             console.log("Message was posted to SLACK");
         },

     });
 };


});
