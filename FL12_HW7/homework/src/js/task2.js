if (confirm('Do you want to play a game?')) {
    let total = 0,
        game = true,
        count = 25,
        range = 8;
    
    const TWO = 2,
        THREE = 3,
        FOUR = 4,
        EIGHT = 8,
        TFIVE = 25;

    while (game) {

        for (let i = 0; i < THREE; i++) {
            let curr = 0;
            let gameNum = Math.floor(Math.random() * range + 1);

            switch (i) {
                case 0:
                    curr = count * FOUR;
                    break;
                case 1:
                    curr = count * TWO;
                    break;
                default:
                    curr = count;
            }

            let userNum = prompt(
                `Choose a roulette pocket number from 0 to ${range}
Attempts left: ${THREE-i}
Total prize: ${total}$
Possible prize on current attempt: ${curr}$`, '');

            if (gameNum === +userNum) {
                total += curr;
                if (confirm(`Congratulation, you won!   Your prize is: ${total}$. Do you want to continue?`)) {
                    count *= TWO;
                    range += FOUR;
                    break;
                } else {
                    alert(`Thank you for your participation. Your prize is: ${total}$`);
                    if (confirm('Do you want to play again?')) {
                        total = 0;
                        count = TFIVE;
                        range = EIGHT;
                        break;
                    } else {
                        game = false;
                        break;
                    }

                }

            } else if (i === TWO) {
                alert('You lose!');
                game = false;
                break;
            }
        }

    }
} else {
    alert('You did not become a billionaire, but can.');
}