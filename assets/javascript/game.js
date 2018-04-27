function randomWord(array){
   return array[Math.floor(Math.random()*array.length)];
}

function randomIndex(array){
    return Math.floor(Math.random()*array.length);
}





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
]

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

var loseMessage = [
    "You know nothing Jon Snow",
    "The Lannisters send their regards",
    "Everyone is mine to torment.",
    "The night is dark and full of terrors.",
    "If you think this has a happy ending, you haven't been paying attention.",


]
var winMessage = [
    "That's what I do, I drink and I know things",
    "What do we say to the God of death?",
    "Chaos isn't a pit. Chaos is a ladder."
    ]



document.onkeypress = function(event){
    if (gameActive === false){     //DETERMINES IF THE GAME HAS BEEN STARTED, INITIATES NEW GAME IF FALSE
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
        for(var i = 1; i < charCount; i++){
            hiddenWord = hiddenWord + "_";
            // console.log(hiddenWord);
            document.querySelector(".hidden-word").innerHTML = hiddenWord;
        }

        // console.log(guessWord);
        gameActive = true;
        charRemaining = charCount;
        userLost = false;
        userWon = false;
        
    } else {   
        var guess = event.key.toUpperCase();
        var charGuessed = false;

        // for(var k = 0; k < alphaNumeric.length; k++){
        //     console.log(alphaNumeric[k]);
        //     if(alphaNumeric[k] !== guess){
        //         charGuessed = true;
        //     }
        // }

        for(var j = 0; j < guessed.length; j++){
            if(guessed[j] === guess){
                charGuessed = true;
            }
        }
        

        if(charGuessed){
            // console.log("guess again, dumbass");
        
        } else{
            var charCorrect = false;
            for(var i = 0; i < guessWord.length; i++){
                if(guess == guessWord.charAt(i)){
                    correct.push(guess);
                    hiddenWord = hiddenWord.slice(0,i) + guessWord.charAt(i) + hiddenWord.slice(i+1);
                    remainingWord = remainingWord.slice(0,remainingWord.indexOf(guess)) + remainingWord.slice(remainingWord.indexOf(guess)+1);

                    charCorrect = true;

                }  
                
                charRemaining = remainingWord.length;
                // console.log("guess Word: " + guessWord);
                // console.log("hidden word " +hiddenWord);
                document.querySelector(".hidden-word").innerHTML = hiddenWord;
                // console.log("remaining word " +remainingWord);
                
            }
            // console.log("charCorrect " + charCorrect);
            
            if(charCorrect === false){
                incorrect.push(guess);
                misses = incorrect.length;
                lives = lives - 1
                document.querySelector(".img-wrap img").setAttribute("src" , "assets/images/" + lives + "_lives.jpg")
                $(".lives").text(lives);
                $(".lives, .hidden-word, .message").css("color" , "rgba(255," + lives*55 + "," + lives*55 + ",1" );
            }

            $(".guessed-letters").append(guess);

            if(lives === 0){
                gameActive = false;
                userLost = true;
                charRemaining = 0;
                lossCount = lossCount+1;
                // console.log("losses: " + lossCount);
                // console.log("wins :" + winCount);
                document.querySelector(".losses span").innerHTML = lossCount;
                document.querySelector(".hidden-word").innerHTML = guessWord;
                document.querySelector(".message").innerHTML = loseMessage[randomIndex(loseMessage)];
                $(".start").css("opacity", "1");

            }else if(charRemaining === 0){
                gameActive = false;
                charRemaining = 0;
                userWon = true;
                winCount = winCount+1;
                // console.log("losses: " + lossCount);
                // console.log("wins :" + winCount);
                document.querySelector(".wins span").innerHTML = winCount;
                document.querySelector(".hidden-word").innerHTML = guessWord;
                document.querySelector(".message").innerHTML = winMessage[randomIndex(winMessage)];
                $(".start").css("opacity", "1");


            }

            // console.log("incorrect:" + incorrect);
            // console.log("correct: " +correct);
            // console.log("guessed: " + guessWord[i]);
            // console.log(lives);
            // console.log("letters remaining " + charRemaining);



            guessed.push(guess);
            // console.log("letters guessed: " + guessed);
        }
    }

}

