import './scss/style.scss';

import rock from './img/rock.png';
import paper from './img/paper.png';
import scissors from './img/scissors.png';

import win from './js/win';
import lose from './js/lose';
import draw from './js/draw'


const rock_btn = document.querySelector('.rock');
rock_btn.setAttribute('src', rock);
const paper_btn = document.querySelector('.paper');
paper_btn.setAttribute('src', paper);
const scissors_btn = document.querySelector('.scissors');
scissors_btn.setAttribute('src', scissors);

const gameInfo = {
    userScore: 0,
    computerScore: 0,
    round: 1,
    userScore_span: document.getElementById("user-score"),
    computerScore_span: document.getElementById("computer-score"),
    result_p: document.querySelector(".result > p"),
    rock_div: document.getElementById("r"),
    paper_div: document.getElementById("p"),
    scissors_div: document.getElementById("s"),
    reset_btn: document.querySelector('.reset'),
    convertToWord: function (letter) {
        if(letter === 'r') return "Rock";
        if(letter === 'p') return "Paper";
        if(letter === 's') return "Scissors";
    },
    getComputerChoice: function () {
        const choices = ['r', 'p', 's'];
        const randomNumber = Math.floor(Math.random()*3);
        return choices[randomNumber];
    },
    
}



document.querySelector('.play').addEventListener('click', () => {
    document.querySelector('.game').style.display = 'block';
    document.querySelector('.intro').style.display = 'none'
    main(gameInfo);
})


function game(info, userChoice) {
    const computerChoice = info.getComputerChoice();
    switch(userChoice + computerChoice) {
        case 'sp':
        case 'pr':
        case 'rs':
            win(info, userChoice, computerChoice);
            break;
        case 'ps':
        case 'rp':
        case 'sr':
            lose(info, userChoice, computerChoice);
            break;
        case 'rr':
        case 'pp':
        case 'ss':
            draw(info, userChoice, computerChoice);
            break;
    }
    info.round++;
    if(info.userScore === 3 || info.computerScore === 3) {
        finalResults(info);
    }
}

function finalResults(info) {
    info.rock_div.removeEventListener('click', choice);
    info.paper_div.removeEventListener('click', choice);
    info.scissors_div.removeEventListener('click', choice);

    if(info.userScore > info.computerScore) {
        info.result_p.innerHTML = `You win!`;
    }else {
        info.result_p.innerHTML = 'You lose!';
    }
}



function main(info) {
    info.reset_btn.addEventListener('click', () => {
        info.userScore = 0;
        info.userScore_span.innerHTML = 0;
        info.computerScore = 0;
        info.computerScore_span.innerHTML = 0;
        info.round = 1;
        main(info);
    })
    info.rock_div.addEventListener('click', choice);

    info.paper_div.addEventListener('click', choice );

    info.scissors_div.addEventListener('click', choice);
}

function choice(event) {
    const target = event.target.parentNode.id;
    game(gameInfo, target);
}
