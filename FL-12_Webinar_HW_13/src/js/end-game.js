import { disableListeners } from './listener-handler';
import { ZERO } from './constants' 

export default (winningSequence) => { 
    const board = document.querySelector('.notice-board');
    if(winningSequence.length > ZERO){
        winningSequence.forEach(el => el.classList.add('winner'));
        if(winningSequence[ZERO].innerText === 'X'){
            board.innerText = 'Player 1 Win!';
        } else if (winningSequence[ZERO].innerText === 'O'){
            board.innerText = 'Player 2 Win!';
        }
    }
    else {
        board.innerText = 'Draw';
    }
    disableListeners();
};