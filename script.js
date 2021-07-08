let computerPlay = () => {
    let moveArray = ["Rock", "Paper", "Scissors"];
    let randomMove = Math.floor(Math.random() * 3);
    return moveArray[randomMove];
};

let playRound = (playerSelection, computerSelection) => {
        
    let moveSelectLoop = true;
    while (moveSelectLoop) {
        

        if (playerSelection === "rock" || playerSelection === "paper" || playerSelection === "scissors") {
            moveSelectLoop = false;

            if (playerSelection === computerSelection) {
                return 0;

            } else if (playerSelection === "rock" && computerSelection === "scissors" ||
                        playerSelection === "paper" && computerSelection === "rock" || 
                        playerSelection === "scissors" && computerSelection === "paper") {
                return 1;

            } else {
                return 2;
            }
            
        } else {
            alert("Please, input correct move!\n(Rock, Paper, Scissors)");
        }

    }
    
};

let game = () => {
    let playerSelection;
    let computerSelection;
    let playerWinCount = 0;
    let playerLoseCount = 0;
    for (let i = 0; i < 5; i++) {
        playerSelection = prompt("Pick your move: (Rock, Paper, Scissors)").toLowerCase();
        computerSelection = computerPlay().toLowerCase();
        let currGameResult = playRound(playerSelection, computerSelection);
        switch(currGameResult) {
            case 0:
                console.log(`Draw! You both picked ${playerSelection}.`);
                break;
            case 1:
                console.log(`You win! ${playerSelection[0].toUpperCase() + playerSelection.slice(1)} beats ${computerSelection}.`);
                playerWinCount += 1;
                break;
            case 2:
                console.log(`You lose! ${playerSelection[0].toUpperCase() + playerSelection.slice(1)} loses to ${computerSelection}.`);
                playerLoseCount += 1;
                break;
            default:
                continue;
        }
    }
    let score = `Your win-lose: ${playerWinCount}-${playerLoseCount}`;

    return score;
};