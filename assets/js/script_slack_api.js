
$(document).ready(function () {

    // Slack variables
    const urlSlack = 'https://slack.com/api/chat.postMessage';
    //const tokenSlack = 'SECRET';
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
    };
   
   });
   