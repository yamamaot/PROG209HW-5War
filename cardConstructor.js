let Card = function(pSuit, pRank){
  this.suit = pSuit;
  this.rank = pRank;
  this.used = false;
  this.exposeSuit = function(){
      return this.suit;
  }
  this.exposeRank = function(){
      return this.rank;
  }
}