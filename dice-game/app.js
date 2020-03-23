/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying, dice, dice_2;

init();

function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    dice = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice_2').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

}

function nextPlayer()
{
    prevDice = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //toggle adds a class if its not there, otherwise it removes from there
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
}

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying)
    {
        dice = Math.floor(Math.random()*6)+1;
        dice_2 = Math.floor(Math.random()*6)+1;

        //display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var dice_2Dom = document.querySelector('.dice_2');
        dice_2Dom.style.display = 'block';
        dice_2Dom.src = 'dice-' + dice_2 + '.png';

        switch(dice)
        {
            case 1:
            {
                nextPlayer();
                diceDOM.style.display = 'none';
                dice_2Dom.style.display = 'none';
            } 
            break;
            case 6: 
            {
                if(dice === 6 && dice_2 === 6)
                {
                    //active player looses everything
                    document.getElementById('score-'+activePlayer).textContent = '0';
                    document.getElementById('current-'+activePlayer).textContent = '0';
                    nextPlayer();
                    diceDOM.style.display = 'none';                    
                }
            } 
            break;
            default: 
            {
                roundScore += dice + dice_2;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            }
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if(gamePlaying)
    {
        //add current score to global score
        scores[activePlayer] += roundScore;
        
        //update the ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //check if player won
        if(scores[activePlayer] >= 20)
        {
            document.getElementById('name-'+activePlayer).textContent = 'WiNNER!';
            document.querySelector('.player-'+activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer + '-panel').classList.remove('winner');
            gamePlaying = false;
        }
        else
        {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);