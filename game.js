var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0; 



if(!started) {
    $('#start').text("Start");
    $("#start").show();
}

$("#start").click(function() {
        nextSequence();
        started = true;
        $('#start').hide();     

})





$('.btn').on("click",function() {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    // console.log(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern);
})

function checkAnswer(currLevel) {
    if(userClickedPattern[currLevel] === gamePattern[currLevel] ) {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSequence();
            },1000);

        }
    }

    else {
        console.log("failed");
        playSound('wrong');

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over! Press the button to restart");
        $('#start').text("Restart");
        $('#start').show();
        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var choosenColor = buttonColors[randomNumber];
    gamePattern.push(choosenColor);

    animatePress(choosenColor);
    playSound(choosenColor);


    $('h1').text("Level " + level);
    level++;

    return randomNumber;
}


function startOver() {
     gamePattern = [];
     userClickedPattern = [];
     started = false;
     level = 0; 
}


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currColor) {
    $('#' + currColor).addClass("pressed");
    setTimeout(function(){
        $('#' + currColor).removeClass("pressed");
    }, 150);
}

