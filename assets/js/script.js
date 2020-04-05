

$(document).ready(function () {
    var numLines = 0;

//cursor change while ajax is being called
$(document).ajaxStart(function() {
    $('body').addClass('wait'); 
}).ajaxStop(function() {
    $('body').removeClass('wait'); 
});

    var api_key = "2Xe0Yym5p1wnVlIvGnsLtH8aU4gfdgp12b1d75nR";


    //Use Moment.js to get the correct formatting for the ajax query.
    $("#button-generate").on("click", function() {
        
        $('#NASA')[0].style.display = "block";
        $('#NASA').animate({"padding-top":"350px"});
        $('#scroll-text').animate({"padding-left":"0%"},2000);
        generateImage();
        
    });

    $("#text-to-image").on("change keyup paste", function(){
        addTextToCanvas();
        // c = $('canvas')[0]
        // var ctx = c.getContext("2d");
        // var img1 = new Image ();
        // img1.src = document.getElementById("generated-image").src
        // ctx.drawImage(img1, 0, 0);
        // ctx.fillText($("#text-to-image").val(), 10, 50);
    })

    //Function to return a random date.
    function randomDate(start, end) {

        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    }

    //ajax call to retrieve URL for pic of the day. temporarily using var picture

    function generateImage() {
        $.ajax({
                url: newURL(),
                method: "GET"
            })
            .then(function (response) {

                var result = response.url; 
                console.log(result);
    //Validate the result as a Nasa picture .jpg or not. If it's a gif/vimeo/youtube link then re-run query

                if (result.includes("apod.nasa.gov/apod/image") && result.includes("jpg") == true){
                    picture = $("#generated-image");                
                    picture.attr("src", result);
                    imgToCanvas();           
                }

                else {
                    console.log("This is not an image");
                    generateImage()
                }            
            });  
    }

    function newURL() {
        var date = moment(randomDate(new Date(2012, 0, 1), new Date())).format("YYYY-MM-DD");
        var queryURL = "https://api.nasa.gov/planetary/apod?date=" + date + "&api_key=" + api_key;
        return queryURL;
    }

    function imgToCanvas() {
        //Creating canvas and replacing with image starts here
        var c = document.createElement("canvas");
        ctx = c.getContext('2d');
        var img1 = new Image ();
        //Testing
        img1.src = document.getElementById("generated-image").src
        img1.onload = function () {
            c.width = img1.width;
            c.height = img1.height;
            ctx.drawImage(img1, 0, 0);
            $('#canvas-manipulation').children().last().remove();
            $('#canvas-manipulation').append(c);
            canvasSettings();
            $('#NASA').css("display" , "none");
            $('#NASA').css("padding-top","0px");
            $('#scroll-text').css("padding-left","70%");

        };
        
    }

    function canvasSettings() {
        var c = $('canvas')[0];
        var ctx = c.getContext("2d");
        ctx.font = "5em Arial";
        ctx.fillStyle = "white";
        //console.log(ctx)

    }

    function addTextToCanvas() {
        var lengthOfText
        var lengthOfCanvas
        var lineOffset = 0;
        var textVal = $("#text-to-image").val();
        var words = textVal.split(' ')
        var line = [];
        

        c = $('canvas')[0];
        var ctx = c.getContext("2d");
        //ctx.fillRect(0, 0, document.getElementById("generated-image").width, document.getElementById("generated-image").height);
        var img1 = new Image ();
        img1.src = document.getElementById("generated-image").src;
        img1.onload = function() {
            ctx.textBaseline = "top";
        ctx.drawImage(img1, 0, 0);
        lengthOfText = (ctx.measureText(textVal)).width;
        lengthOfCanvas = (ctx.canvas.width);
        var maxWidth = (ctx.canvas.width)*0.90;

        var yOffset = (numLines+1)*85;
        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = ctx.measureText(testLine); 
            var testWidth = metrics.width;
            console.log(ctx.canvas.height)   
            if(testWidth > maxWidth && n > 0) {
                ctx.fillText(line, ctx.canvas.width/2, (ctx.canvas.height) - 20 - yOffset + lineOffset);
                console.log("it's past 80%")
                line = words[n] + ' ';
                lineOffset += 85;
            } else {
                line = testLine
            }
        }
        numLines = lineOffset/85;
        ctx.fillText(line, ctx.canvas.width/2, (ctx.canvas.height) - 20 - yOffset + lineOffset);
        ctx.textAlign = "center";
        
        }
        
    }

});

    