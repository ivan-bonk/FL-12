function draw(info, userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);

    info.result_p.innerHTML = `Round ${info.round}. ${info.convertToWord(userChoice)} equals ${info.convertToWord(computerChoice)}. It's a draw.`;
    userChoice_div.classList.add('grey-glow');
    setTimeout(() => userChoice_div.classList.remove('grey-glow'), 500);
}

export default draw;