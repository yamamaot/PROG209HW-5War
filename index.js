document.addEventListener("DOMContentLoaded", function(event){



    var deck1 = new Deck();    
    let playerDeck = [];
    let computerDeck = [];
    let playerWin = 0;
    let computerWin = 0;
    let m = 0;
    let turnValue = document.getElementById("turnCount");
    let playerScore = document.getElementById("playerScore");
    let computerScore = document.getElementById("computerScore");
    let dealButton = document.getElementById("deal");
    let nextButton = document.getElementById("next");
    let resultDisplay = document.getElementById("result");
    let cardDisplay = document.getElementById("cardDisplay");
    let playerCardDisplay = document.getElementById("playerCard");
    let computerCardDisplay = document.getElementById("computerCard");
    
    playerCardDisplay.style.color = "white";
    computerCardDisplay.style.color = "white";
    
    cardDisplay.style.display = "none";
    resultDisplay.style.display = "none";
    nextButton.style.display = "none";
    deck1.populate();
    

    //playerArray, computerArray

    dealCards = function(){
        //create a copy of the deck into computerarray that won't affect the original deck
        for( let i = 0; i < deck1.cardArray.length; i++){
            computerDeck[i] = deck1.cardArray[i];
        }
        //push random card into playerArray
        //remove same card from computerarray
        for( let j = 0; j < 26; j++){
            let randCard = Math.floor(Math.random() * (51-j));
            playerDeck.push(computerDeck[randCard]);
            let removeCard = computerDeck.splice(randCard, 1);
        }

        //shuffling computer deck
        for(let i = (computerDeck.length - 1); i > 0; i--){
          const j = Math.floor(Math.random() * i);
          const temp = computerDeck[i];
          computerDeck[i] = computerDeck[j];
          computerDeck[j] = temp;
        }
        dealButton.style.display = "none";
        nextButton.style.display = "block";
        
        resultDisplay.style.display = "block";
        resultDisplay.innerHTML = "Cards dealt.";
    }
    
    //unused random card method
    getRandomCard = function(deckToUse){
        let randCard = Math.floor(Math.random() * (deckToUse.length-1));
        return deckToUse[randCard];
    }

    displayCards = function(turnCount){
        playerCardDisplay.innerHTML = returnRank(playerDeck[turnCount]) + " of " + returnSuit(playerDeck[turnCount]);
        colorDisplay(playerDeck[turnCount], playerCardDisplay);
        
        computerCardDisplay.innerHTML = returnRank(computerDeck[turnCount]) + " of " + returnSuit(computerDeck[turnCount]);
        colorDisplay(computerDeck[turnCount], computerCardDisplay);        
    }
    
    colorDisplay = function(cardToParse, htmlElement){
        if(parseInt(cardToParse.suit) < 3){
            htmlElement.style.backgroundColor = "black";
        } else {
            htmlElement.style.backgroundColor = "red";
        }
    }

    returnRank = function(Card){
        let rankValue = parseInt(Card.rank);
        if(rankValue < 11 && rankValue > 1){
            return rankValue.toString();
        } else {
            switch (rankValue) {
                case 1:
                    return "Ace"
                    break;
                case 11:
                    return "Jack";
                    break;
                case 12:
                    return "Queen";
                    break;
                case 13:
                    return "King";
                    break;
            }
        }
    }

    returnSuit = function(Card){
        let suitValue = parseInt(Card.suit);
        switch (suitValue){
            case 1:
                return "Spades";
                break;
            case 2:
                return "Clubs";
                break;
            case 3:
                return "Diamonds";
                break;
            case 4:
                return "Hearts";
                break;
        }
    }
    

    compareCards = function(player, computer){
        switch ((player.rank > computer.rank)){
            case true:
                //player win
                playerWin++;
                resultDisplay.innerHTML = "Player win!";
                break;
            case false:
                //check to see if rank is equal, then check suit
                if (player.rank === computer.rank){
                    switch (player.suit > computer.suit){
                        case true:
                            //player win
                            playerWin++;
                            resultDisplay.innerHTML = "Player win!";
                            break;
                        case false:
                            //computer win
                            computerWin++;
                            resultDisplay.innerHTML = "Computer win!";
                            break;
                    }
                } else {
                    //computer win
                    computerWin++;
                    resultDisplay.innerHTML = "Computer win!";
                }
                break;
        }
    }
    
    playGame = function(){
        cardDisplay.style.display = "block";
        displayCards(m);
        turnValue.innerHTML = m + 1;
        compareCards(playerDeck[m], computerDeck[m]);
        playerScore.innerHTML = playerWin;
        computerScore.innerHTML = computerWin;
        m++;
        if (m === 26){
            switch (playerWin > computerWin){
                case true:
                    resultDisplay.innerHTML = "Congratulations! You won the game!";
                    break;
                case false:
                    if (playerWin == computerWin){
                        resultDisplay.innerHTML = "Tie game!";
                    } else{
                        resultDisplay.innerHTML = "Sorry! You lost the game.";
                    }                    
                    break;
            }
            dealButton.style.display = "block";
            nextButton.style.display = "none";
            cardDisplay.style.display = "none";
            playerWin = 0;
            computerWin = 0;
            m = 0;
        }        
    }

    
});
