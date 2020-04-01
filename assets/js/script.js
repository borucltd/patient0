
$(document).ready(function () {

var api_key = "2Xe0Yym5p1wnVlIvGnsLtH8aU4gfdgp12b1d75nR";


//Use Moment.js to get the correct formatting for the ajax query.

$("#button-generate").on("click", generateImage);

//Function to return a random date.
function randomDate(start,end){

	return new Date(start.getTime() + Math.random()*(end.getTime() - start.getTime()));

}

//cursor change while ajax is being called
$(document).ajaxStart(function() {
    $(document.body).css({'cursor' : 'wait'});
}).ajaxStop(function() {
    $(document.body).css({'cursor' : 'default'});
});


//ajax call to retrieve URL for pic of the day. temporarily using var picture
function generateImage() {
    $.ajax({
        url:    newURL(),
        method: "GET"
    })
        .then(function(response){
            picture = $("#generated-image")
            var result=response.url;
            console.log(result);
            picture.attr("src",result);
    
        });
}


function newURL() {
    var date = moment(randomDate(new Date(2012,0,1),new Date())).format("YYYY-MM-DD");
    var queryURL = "https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=" + api_key;
    return queryURL
}
});
