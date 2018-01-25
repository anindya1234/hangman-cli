
var inquirer = require('inquirer');
var letterCheck = require('./word.js');
var Letters = require('./letters.js');
var wordlist = require('./wordlist.js');
var guessedLetters = [];

var results ={

	word : wordlist,
	//game start function
	Begin : function(){
    var i = Math.floor(Math.random() * this.word.length); //generate random number 0 to length of wordlist array
    this.randomWord = this.word[i].split("");//split and create an array of letters
	this.guessesRemaining = 10;
	this.guessedLetters = [];
	var display = new Letters(this.randomWord);
	display.show();
	console.log("Your guesses Left: " + this.guessesRemaining);
	userPrompt();
	}

};

function userPrompt(){

if(results.guessesRemaining > 0){
    inquirer.prompt([
      {
        type: "value",
        name: "letter",
        message: "Guess a Letter: "
      }
    ]).then(function(guess){
    
    var input= guess.letter.toLowerCase();
    
   //if letter already guessed and in letterguessed array dont reduce count but prompt user to try again
    if (results.guessedLetters.indexOf(input) != -1){
    	 
	     console.log("Your guesses Left: " + results.guessesRemaining);
	     console.log("You already guessed this letter: "+ results.guessedLetters[(results.guessedLetters.length)-1]+ "\nFor your reference the letters already guessed are: " + results.guessedLetters +" \nTry a different letter");
	     userPrompt();
    }
    else{
    var check= letterCheck(results.randomWord,input);// check if letter input is in random word call word.js
    
    results.guessedLetters.push(input);
	 if(check){	        
	        
	        var display1 = new Letters(results.randomWord,results.guessedLetters);
		    display1.show();
		    //console.log(display1.show());
	          if(display1.winner){
	            console.log("You win!");
	            inquireAgain();
	          }
	          else{
	            results.guessesRemaining--;
	            console.log("Your guesses Left: " + results.guessesRemaining);
				console.log("Letters already guessed: " + results.guessedLetters);
			    userPrompt();
			     
		       }
     }
     else{
             results.guessesRemaining--;
             console.log("Your guesses Left: " + results.guessesRemaining);
			 console.log("Letters already guessed: " + results.guessedLetters);
		     userPrompt();
		     
	       }
     }
         
    });//inquirer ends

}//if statement ends

else{
console.log("You lost! "+"Correct word is: "+ results.randomWord.join(""));
 inquireAgain();
}
}//userPrompt function ends
//start game
function inquireAgain(){
	inquirer.prompt([
	      {
	          type: "confirm",
		      message: "Want to continue?",
		      name: "confirm",
		      default: true
	      }
	    ]).then(function(inquirerResponse){
	    	if (inquirerResponse.confirm) {
	      results.Begin();
	    }
	    else {
	      console.log("\nThanks for playing.\n");
	    }

	});	
}



results.Begin();



