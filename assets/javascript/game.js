function randomWord(array){
   return array[Math.floor(Math.random()*array.length)];
}





var activeGame = false;
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




document.onkeypress = function(event){
    if (gameActive === false){     //DETERMINES IF THE GAME HAS BEEN STARTED, INITIATES NEW GAME IF FALSE
        guessWord = randomWord(wordBank).toUpperCase();
        remainingWord = guessWord;
        hiddenWord = "_";
        guessed = [];
        correct = [];
        incorrect = [];
        lives = 5;

        var charCount = guessWord.length;
        for(var i = 1; i < charCount; i++){
            hiddenWord = hiddenWord + "_";
            console.log(hiddenWord);
        }

        console.log(guessWord);
        gameActive = true;
        charRemaining = charCount;
        userLost = false;
        userWon = false;
    } else {   
        var guess = event.key.toUpperCase();
        var charGuessed = false;
        for(var j = 0; j < guessed.length; j++){
            if(guessed[j] === guess){
                charGuessed = true;
            }
        }

        if(charGuessed){
            console.log("guess again, dumbass");
        
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
                console.log("guess Word: " + guessWord);
                console.log("hidden word " +hiddenWord);
                console.log("remaining word " +remainingWord);
                
            }
            console.log("charCorrect " + charCorrect);
            
            if(charCorrect === false){
                incorrect.push(guess);
                misses = incorrect.length;
                lives = lives - 1
            }

            if(lives === 0){
                gameActive = false;
                userLost = true;
                charRemaining = 0;
                lossCount = lossCount+1;
                console.log("losses: " + lossCount);
                console.log("wins :" + winCount);

            }else if(charRemaining === 0){
                gameActive = false;
                charRemaining = 0;
                userWon = true;
                winCount = winCount+1;
                console.log("losses: " + lossCount);
                console.log("wins :" + winCount);

            }

            console.log("incorrect:" + incorrect);
            console.log("correct: " +correct);
            // console.log("guessed: " + guessWord[i]);
            console.log(lives);
            console.log("letters remaining " + charRemaining);



            guessed.push(guess);
            console.log("letters guessed: " + guessed);
        }
    }

}

