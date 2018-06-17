//GLOBAL VARIABLES
var activeGame = false;
var alphaNumeric = ["1","2","3","4","5","6","7","8","9","0","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var wordBank = [
    "Hodor",
    "Bran",
    "Jon",
    "Eddard",
    "Cersei",
    "Tyrion",
    "Arya",
    "Sansa",
    "Robb",
    "Jamie",
    "Tywin",
    "Joffrey",
    "Melisandre",
    "Ramsay",
    "Rickon",
    "Ygritte",
    "Varys",
    "Jorah",
    "Stannis",
    "Tormund",
    "Catelyn",
    "Tommen",
    "Daeneryis",
    "Theon"
];

var winCount = 0;
var lossCount = 0;

var gameActive = false;
var userLost = false;
var userWon = false;

var lives = 5;
var guessWord;
var hiddenWord = "_";
var remainingWord;
var guessed = [];
var charRemaining = 0;

var correct = [];
var incorrect = [];
var misses = 0;

var startText = "When you play the game of thrones, you win or you die.";
var startGame = $(".start");
var startMessage = "Night gathers, and now my watch begins";
var rightMessage = [
]
var wrongMessage = [
]


// Array of messages that are randomly selected when game is lost
var loseMessage = [
    "You know nothing Jon Snow",
    "The Lannisters send their regards",
    "Everyone is mine to torment.",
    "The night is dark and full of terrors.",
    "If you think this has a happy ending, you haven't been paying attention.",
];

//Array of messages that are randomly selected when the game is won
var winMessage = [
    "That's what I do, I drink and I know things",
    "What do we say to the God of death?",
    "Chaos isn't a pit. Chaos is a ladder."
    ]

//grabs value of random index inside an array
function randomWord(array){
    return array[Math.floor(Math.random()*array.length)];
}
 
//grabs random index inside an array
function randomIndex(array){
    return Math.floor(Math.random()*array.length);
}

//controls the everything that happens on a keypress
document.onkeypress = function(event){
//first part of if statement : starts new game if gameActive = false
//handles reseting of global variables and printing wins, losses, message and main image to page
    if (gameActive === false){ 
        guessWord = randomWord(wordBank).toUpperCase();
        remainingWord = guessWord;
        hiddenWord = "_";
        guessed = [];
        correct = [];
        incorrect = [];
        lives = 5;
        $(".start").css("opacity" , "0");
        $(".hidden-word").css("padding" , "1rem");
        $(".message").text(startMessage);
        $(".lives").text(lives);
        $(".lives").css("opacity", "1");
        $(".lives, .hidden-word, .message").css("color" , "rgba(255," + lives*55 + "," + lives*55 + ",1" );
        $(".guessed-letters").empty();
        document.querySelector(".img-wrap img").setAttribute("src" , "assets/images/" + lives + "_lives.jpg")
        var charCount = guessWord.length;

//builds a string of underscores that matches length of the guessWord
        for(var i = 1; i < charCount; i++){
            hiddenWord = hiddenWord + "_";
            document.querySelector(".hidden-word").innerHTML = hiddenWord;
        }

        gameActive = true;
        charRemaining = charCount;
        userLost = false;
        userWon = false;
     
//second part of if statement runs if game is already in progress
    } else {   
//sets the guess equal to key pressed
        var guess = event.key.toUpperCase();
        var charGuessed = false;
        var charValid = false;

//runs through bank of guessed letters to determine if letter has already been guessed
        for(var j = 0; j < guessed.length; j++){
            if(guessed[j] === guess){
                charGuessed = true;
            }
        }

//checks if the key pressed is alpha-numeric
        for(var j = 0; j < alphaNumeric.length; j++){
            if(alphaNumeric[j] === guess){
                charValid = true;
            }
        } 
//checks if guess has been guessed and is a valid character
        if(charGuessed || charValid === false){
   
        } else{
            var charCorrect = false;
//checks where the letter guessed matches up with letters inside guessWord, replaces them in hiddenWord
//pushes letter to guessed array
//identifies that guess was correct
            for(var i = 0; i < guessWord.length; i++){
                if(guess == guessWord.charAt(i)){
                    correct.push(guess);
                    hiddenWord = hiddenWord.slice(0,i) + guessWord.charAt(i) + hiddenWord.slice(i+1);
                    remainingWord = remainingWord.slice(0,remainingWord.indexOf(guess)) + remainingWord.slice(remainingWord.indexOf(guess)+1);

                    charCorrect = true;

                }  
                
                charRemaining = remainingWord.length;
//prints updated word to page
                document.querySelector(".hidden-word").innerHTML = hiddenWord;
                
            }

//if guess is wrong : pushes letter to guessed array
//deducts a life
//reduces non-red color values by 1/total lives * 255
            if(charCorrect === false){
                incorrect.push(guess);
                misses = incorrect.length;
                lives--;
                document.querySelector(".img-wrap img").setAttribute("src" , "assets/images/" + lives + "_lives.jpg")
                $(".lives").text(lives);
                $(".lives, .hidden-word, .message").css("color" , "rgba(255," + lives*55 + "," + lives*55 + ",1" );
            }

            $(".guessed-letters").append(guess);

//determines if all lives are used up
//if true : ends game, tallies a loss
            if(lives === 0){
                gameActive = false;
                userLost = true;
                charRemaining = 0;
                lossCount = lossCount+1;
                document.querySelector(".losses span").innerHTML = lossCount;
                document.querySelector(".hidden-word").innerHTML = guessWord;
                document.querySelector(".message").innerHTML = loseMessage[randomIndex(loseMessage)];
                $(".start").css("opacity", "1");

//determines if all etters have been guessed
//if true : ends game, tallies a win
            }else if(charRemaining === 0){
                gameActive = false;
                charRemaining = 0;
                userWon = true;
                winCount = winCount+1;
                document.querySelector(".wins span").innerHTML = winCount;
                document.querySelector(".hidden-word").innerHTML = guessWord;
                document.querySelector(".message").innerHTML = winMessage[randomIndex(winMessage)];
                $(".start").css("opacity", "1");


            }

            guessed.push(guess);
        }
    }

}

