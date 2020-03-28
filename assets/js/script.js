
var api_key = "2Xe0Yym5p1wnVlIvGnsLtH8aU4gfdgp12b1d75nR";
var date = "2018-10-12";

var queryURL = "https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=" + api_key;



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