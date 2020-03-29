import { enableListeners } from './listener-handler';
import { opponentTurn } from './turns';
import { board } from './add-data';
import { ZERO, TWO } from './constants';

export const clearBoard = () => {
    board().forEach((el) => {
        el.innerText = '';
        el.classList.remove('winner');
    });
    document.querySelector('.player-one-header').classList.remove('active');
    document.querySelector('.player-two-header').classList.remove('active');
}

export const clearGame = () => {
    clearBoard();
    const score = Array.from(document.getElementsByClassName('score'));
    score.forEach((el) => {el.innerText = '0'});

}

export const startGame = () => {
    const rand = Math.floor(Math.random() * TWO) === ZERO;

    if(rand) {
        document.querySelector('.player-two-header').classList.add('active');
        opponentTurn();
    } else {
        document.querySelector('.player-one-header').classList.add('active');
        enableListeners();
    }
}