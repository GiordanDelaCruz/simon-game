/** OVERVIEW: This program replicates the game fucntionality for Simon in JavaScript.
  *           The game itself is runned through HTML, CSS, & JavaScript.
  *
  *  Note: This is a just a coding exercise/challenge for "The Complete 2020 Web Development
  *        Bootcamp Course" on Udemy by Angela Yu.
  */

/*************************************************************************************************/
/*                                    Instance Variables                                         */
/*************************************************************************************************/
var audio = document.createElement('audio');
var buttonColors = ["red", "blue", "green", "yellow"];
var userColoredSequence = [];
var gameSequence = [];
var userChosenColor;
var randColorToChoose;
var randNum;
var level = 0;
var checkStartCounter = 0;
var gameOverCheck = false;


// Event Listener for pressing any key on the keyboard
$(document).on("keypress", function (e) {
    if( checkStartCounter == 0){
        nextSequence();
        checkStartCounter++;
    }
});

// Event Listener for clicking any button
$(".btn").on("click", function () {
    userChosenColor = $(this).attr("id");
    addUserChosenColorSequence(userChosenColor);
    playAnimation(userChosenColor);
    playAudioSound(userChosenColor);
    checkSolution(userColoredSequence.length - 1);    // Passing on the last index of the user array
});


/*************************************************************************************************/
/*                                         Methods                                               */
/*************************************************************************************************/

/** This function will set & play the appropriate audio source for the particular
 *  button which was randomly selected my the computer or clicked by the user.
 *
 * @param     colorOfButton          The particular button
 */
function playAudioSound(colorOfButton){

      audio.setAttribute('src', 'sounds/' + colorOfButton + '.mp3');
      audio.play();
}

/** This function will provides animation for the button which was randomly
 *  selected my the computer or clicked by the user.
 *
 * @param     colorOfButton        The particular button 
 */
function playAnimation(colorOfButton){

    $("#" + colorOfButton).addClass("pressed");

    setTimeout(function() {
      $("#" + colorOfButton).removeClass("pressed");
    }, 100);
}

/** This function generate the next sequence of colors to be presssd. Additionally,
 *  it also animates the next random color that was chosen.
 */
function nextSequence(){

    randNum = Math.floor( Math.random() * 4 );
    randColorToChoose = buttonColors[randNum];
    gameSequence.push(randColorToChoose);
    playAnimation(randColorToChoose);
    playAudioSound(randColorToChoose);
    level++;
    $("#level-title").html("Level " + level);
}

/** This function will add the color the user chose to the
 *  userColoredSequence[] array.
 *
 * @param     color         The color the user chose
 */
function addUserChosenColorSequence(color) {
    userColoredSequence.push(color);
}

/** This function will check if the user has entered the correct game sequence
 *  of colors. Additionally, if the user entered say n, where n represents the
 *  length of the game sequence, then it will move on to the next level.
 *
 *  If the user gets any answer for the color sequence wrong, then move on to
 *  the Game Over phase.
 *
 * @param     uCSIndex        The last index of the userColoredSequence[] array
 */
function checkSolution(uCSIndex){

    // Check if the user got the correct answer of the gameSequence[] array
    if( userChosenColor == gameSequence[uCSIndex] ){

        // Move on to the next sequence of the game if the user finishes the sequence
        if( uCSIndex + 1 == gameSequence.length ){
            setTimeout(function() {
                nextSequence();
                userColoredSequence = [];
            }, 1000);
        }

    }else{
        gameOver();
    }
}

/** This function will clear the game data, play a sound, as well as display a
 *  Game Over message to the user.
 */
 function gameOver(){

   // Set a delay so that the Game Over sound does not interrupt the button sound handler
   setTimeout(function() {
     $("#level-title").html("Game Over, Press Any Key to Restart");

     // Make the bacground flicker to the color red
     $("body").addClass("game-over");

     setTimeout(function() {
         playAudioSound("wrong");
         $("body").removeClass("game-over");

     }, 200);
   }, 250);

   // Clearing the game, user, & event handler data
   userColoredSequence = [];
   gameSequence = [];
   level = 0;
   checkStartCounter = 0;
 }
