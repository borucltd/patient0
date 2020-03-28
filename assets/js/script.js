
$(document).ready(function () {

var api_key = "2Xe0Yym5p1wnVlIvGnsLtH8aU4gfdgp12b1d75nR";
var date = randomDate();
var queryURL = "https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=" + api_key;

// Slack webhook start channel nbmc_slacks
var url = "https://hooks.slack.com/services/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";
// Slack webhook end

//Function to return a random date in the correct format starting from the year 2000.
function randomDate(){
    var dateString;
    var year = 2000 + (Math.floor(Math.random()*20));
    var month = (Math.floor(Math.random()*12));
    if (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
        var day = (Math.floor(Math.random()*31));
    }
    else if( month == 4 || month == 6 || month == 9 || month == 11 ) {
        var day = ((Math.floor(Math.random()*30))+1);
    }
    else {
        var day = ((Math.floor(Math.random()*28))+1); 
    }   
    dateString = year.toString().concat("-").concat(month.toString().padStart(2,"0")).concat("-").concat(day.toString().padStart(2,"0"));
    return dateString
}

console.log(date);



//ajax call to retrieve URL for pic of the day. temporarily using var picture
$.ajax({
    url:    queryURL,
    method: "GET"
})
    .then(function(response){
        picture = $("div")
        var result=response.url;
        console.log(result);
        picture.attr("src",result);

    });

// Slack webhook send to channel nbmc_slacks start
var messageSlack = "Someone opened our page on " + date;
$.ajax({
    data: 'payload=' + JSON.stringify({
        "text": messageSlack
    }),
    dataType: 'json',
    processData: false,
    type: 'POST',
    url: url
});
// Slack webhook send to channel nbmc_slacks end

});
