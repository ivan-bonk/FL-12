import './scss/main.scss';
import { startGame, clearBoard, clearGame} from './js/game-handlers';

document.querySelector('.clear-btn')
.addEventListener('click', () => {
    clearGame();
    startGame()
});

document.querySelector('.new-game-btn')
.addEventListener('click', () => {
    clearBoard();
    startGame();
});