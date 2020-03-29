import writeScore from './write-score';
import {enableListeners, disableListeners} from './listener-handler';
import {board, index, emptyItems} from './add-data';
import checkVictory from './check-victory';

export const opponentTurn = () => {
   
    disableListeners();
    setTimeout(() => {
        makeTurn(opponentChoice(), 'O');
        const check = checkVictory();
        if(check === false) {
            enableListeners();
        } else if(check === true) {
            writeScore('Op-score')
        }
    }, 1000);
}

export const clickFn = (event) => {
    
    makeTurn(index(event.target), 'X');
    const check = checkVictory();
    if( check === false){
        opponentTurn();
    }else if(check  === true) {
        writeScore('My-score')
    }
        
};

const makeTurn = (index, letter) => {
    board()[index].innerText = letter;

    document.querySelector('.player-one-header').classList.toggle('active');
    document.querySelector('.player-two-header').classList.toggle('active');
}
const opponentChoice = () => index(emptyItems()[Math.floor(Math.random() * emptyItems().length)]);
