const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
var randomNumber
var randomChosenColor
var gameStarted = false
let level = 0

function nextSequence() {
    userClickedPattern = []
    randomNumber = Math.floor(Math.random() * 4)
    randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $("#level-title").text("Level " + ++level)
    playSequence()
}

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id")
    playSound(userChosenColor)
    animatePress(userChosenColor)
    if (gameStarted == true) {
        userClickedPattern.push(userChosenColor)
        checkAnswer(userClickedPattern.length - 1)
    }
})

function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColor).removeClass('pressed');
      }, 100)
}

$(document).on("keydown", function(e) {
    if (gameStarted == false && e.key == " ") {
        gameStarted = true
        nextSequence()
    }
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(() => {
                nextSequence()
            }, 1000)
        }
    } else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(() => {
            $("body").removeClass('game-over')
        }, 200);
        $("#level-title").text("Game Over, Press Space to Restart")
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    gameStarted = false
}

function playSequence() {
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(() => {
            $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i])
          }, i * 500)
    }
}