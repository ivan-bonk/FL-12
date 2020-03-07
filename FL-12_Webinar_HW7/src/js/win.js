function win(info, userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);

    info.userScore++;
    info.userScore_span.innerHTML = info.userScore;
   
    info.result_p.innerHTML = `Round ${info.round}. ${info.convertToWord(userChoice)} beats ${info.convertToWord(computerChoice)}. You win!`;
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 500);
}

export default win;