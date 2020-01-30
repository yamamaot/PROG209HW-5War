var Deck = function(){
  this.cardArray = [];

  this.populate = function(){
    for(var i = 1; i < 5; i++){
      for(var j = 1; j < 14; j++){
          //create a placeholder to hold the values
          var cardPlaceholder = new Card(i, j);
          //add to the array
          this.cardArray.push(cardPlaceholder);        
      }
    }
  }
}