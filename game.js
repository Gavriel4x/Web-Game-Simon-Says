
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var started = false;

function nextSequence(){
    
    level++;
    $("#level-title").text("Level " + level);
        
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    setTimeout(() => {
        $("." + randomChosenColour).fadeOut(100).fadeIn(100);
        playSound(buttonColours[randomNumber]);
            
    }, 1000);

    gamePattern.push(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}


//Keypress handler
$(document).keypress(function(){

  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

var userClickedPattern = [];
//User Clicks and handler
$(".btn").on("click", function() {

    if(started){
        var userChosenColour = $(this).attr("id");
        
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        if(!checkAnswer(userClickedPattern.length-1)){
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();

            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);

            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
            return;
        }

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    }
});

function checkAnswer(currentLevel){
    return (gamePattern[currentLevel] === userClickedPattern[currentLevel]);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}