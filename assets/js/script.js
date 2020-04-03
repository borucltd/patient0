

$(document).ready(function () {
    //testing
    imgToCanvas();

//cursor change while ajax is being called
$(document).ajaxStart(function() {
    $(document.body).css({'cursor' : 'wait'});
}).ajaxStop(function() {
    $(document.body).css({'cursor' : 'default'});
     

});

    var api_key = "2Xe0Yym5p1wnVlIvGnsLtH8aU4gfdgp12b1d75nR";


    //Use Moment.js to get the correct formatting for the ajax query.
    $("#button-generate").on("click", function() {
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
                picture = $("#generated-image");
                var result = response.url;
                picture.attr("src", result);
                imgToCanvas();
                

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
        var heightRatio = 1.39
        var textVal = $("#text-to-image").val();
        var words = textVal.split(' ')
        var line = [];

        c = $('canvas')[0];
        var ctx = c.getContext("2d");
        ctx.fillRect(0, 0, document.getElementById("generated-image").width, document.getElementById("generated-image").height);
        var img1 = new Image ();
        img1.src = document.getElementById("generated-image").src;
        ctx.textBaseline = "top";
        ctx.drawImage(img1, 0, 0);
        lengthOfText = (ctx.measureText(textVal)).width;
        lengthOfCanvas = (ctx.canvas.width);
        var maxWidth = (ctx.canvas.width)*0.8;

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = ctx.measureText(testLine); 
            var testWidth = metrics.width;
            console.log(testWidth)    
            if(testWidth > maxWidth && n > 0) {
                ctx.fillText(line, ctx.canvas.width/2, ctx.canvas.height/heightRatio);
                console.log("it's past 80%")
                line = words[n] + ' ';
                heightRatio -= 0.12
            } else {
                line = testLine
            }
        }
        ctx.fillText(line, ctx.canvas.width/2, ctx.canvas.height/heightRatio);
        ctx.textAlign = "center";
        
    }

});

