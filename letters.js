var Letters = function(word,guessedLetter){
	this.input = guessedLetter;
	this.word= word;
	this.display= " ";
    this.winner= false;
    
	this.show=function(){
	 var shown= "";
	 //during game start no guessed letter - show dashes
	 if(this.input === undefined){
	 	
	     for(var i = 0; i < this.word.length; i++){
	        shown += ' _ ';
	          //shows _ for all letters in word initially
          }
	   
	 }

	 else {//when guessed a letter check by running loop through guessed letter array and word array
	   for(var i = 0; i < this.word.length; i++){//runs through all letters of word
         
	        var identified = false;

	        for(var j = 0; j < this.input.length; j++){
	          
	          if(this.word[i] === this.input[j]){
	            shown += this.input[j]; //actual letter replaces _ in shown
	            identified = true; //if letter in word matches letter in guessed letter array flag turned to true else false
	          }
	        }
	        // If flag false "_" is shown
	        if(!identified){
	          shown += ' _ ';

	        }
	    }
      
	 }      

	   this.see = shown.trim();
	    //console.log("display text: "+this.displayText+"word: "+this.word.join(""));
       console.log(shown); 
	    
	    if(this.see === this.word.join("")){
	      this.winner = true;
	    }
    }

}


module.exports = Letters;