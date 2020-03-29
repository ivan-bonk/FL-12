import { winningCombinaton, ZERO, ONE, TWO} from './constants';
import endGame from './end-game';
import {board, emptyItems} from './add-data';
import writeScore from './write-score';

export default () => {
    let victory = false;
    winningCombinaton.forEach(combo => {
        const grid = board();
        const sequence = [grid[combo[ZERO]], grid[combo[ONE]], grid[combo[TWO]]];
        if(allSame(sequence)) {
            victory = true;
            endGame(sequence);
        }
    });
    if(emptyItems().length === ZERO && victory === false) {
        victory = 'draw';
        writeScore('Op-score')
        writeScore('My-score')
        endGame([]);
    }
    return victory;
};

const allSame = (arr) => arr.every(el => el.innerText === arr[ZERO].innerText && el.innerText !== ''); 
