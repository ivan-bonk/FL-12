function lose(info, userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);

    info.computerScore++;
    info.computerScore_span.innerHTML = info.computerScore;
    
    info.result_p.innerHTML = `Round ${info.round}. ${info.convertToWord(userChoice)} loses ${info.convertToWord(computerChoice)}. You lost...`;
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 500);
}

export default lose;