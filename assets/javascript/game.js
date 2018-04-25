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
var lives = 10;
var guessWord;
var guessed = [];

var correct = [];
var incorrect = [];
var misses = 0;




document.onkeypress = function(event){
    if (gameActive === false){    
        guessWord = randomWord(wordBank).toUpperCase();
        var charCount = guessWord.length;
        console.log(guessWord);
        gameActive = true;
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
                    guessWord = guessWord.slice(0,i) + guessWord.slice(i+1);
                    charCorrect = true;

                }  
                
                console.log(guessWord);
                
            }
            console.log("charCorrect " + charCorrect);
            
            if(charCorrect === false){
                incorrect.push(guess);
                misses = incorrect.length;
            }

            console.log("incorrect:" + incorrect);
            console.log("correct: " +correct);
            console.log("guessed: " + guessWord[i]);
            console.log(lives - misses);



            guessed.push(guess);
            console.log("letters guessed: " + guessed);
        }
    }

}

