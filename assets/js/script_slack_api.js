
$(document).ready(function () {

    // Slack variables
    const urlSlack = 'https://slack.com/api/chat.postMessage';
    const tokenSlack = 'xoxb-895731779237-1034747577094-WFJIJrDlvt9artMrueSyozrV';
    const channelSlack = 'nbmc_slacks';
    let messageSlack = 'Hey this is a test message.';
    let userSlack = localStorage.getItem('firstName');
    let emailSlack = localStorage.getItem('emailAddress');
    let imageTitleSlack = ".:: Random NASA image ::.";
    let imageSlackUrl="https://southaustralia.com/places-to-go/southaustralia.com/-/media/Consumer-images/Non-blog-page-images/Brand-team-updated-hero/Adelaide-Hills/Adelaide-HIlls-Landscape.jpg";
   
   
    // Check if user and email are defined
    if ( userSlack == null  ) {
       userSlack = "anonymous";
    }
     if ( emailSlack == null ){
       emailSlack = "anonymous@anonymous";
    }
    
    // Slack API call
    $("#slackme").on("click", fslackme);
    
    // Functions
    function fslackme() {
   
    
       event.preventDefault();

       // if there is no image, then we can't send anything

       if ( $('#generated-image').attr('src') === "" ) {
        
        // info modal
        $('#slackmodal')[0].style.display = "block";
        $('#slackmodalmessage').text("Pleae generate the image first.. [click me]");
        $('#slackmodal').animate({"padding-top":"350px"});
        $('#slackmodal').animate({"padding-left":"0%"},2000);
       
       } else {     
        
        // info modal
        $('#slackmodal')[0].style.display = "block";
        $('#slackmodalmessage').text("Sending to slack...");
        $('#slackmodal').animate({"padding-top":"350px"});
        $('#slackmodal').animate({"padding-left":"0%"},2000);
       
       // pick up fresh data from DOM
       imageSlackUrl=$("#generated-image").attr('src');
       //imageSlackUrl = "file:///./assets/img/space-background.jpg";
       if ( $("#messageSlack").val() == null) {
           messageSlack="From " + userSlack +"(" + emailSlack + ")";
       } else {
           messageSlack="From " + userSlack +"(" + emailSlack + ")" + $("#messageSlack").val();
       }  
   
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
        $('#slackmodal')[0].style.display = "none";
    }
    };

    // when modal is clicked, hide it
    $('#slackmodalmessage').on("click", function() {

        event.preventDefault();
        $('#slackmodal')[0].style.display = "none";

    })
   
   });
   