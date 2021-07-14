const buttons = document.querySelectorAll('.btn-choice');
const buttonStart = document.querySelector('.btn-start');
const buttonContainer = document.querySelector('.button-container');
const btnImg = document.querySelectorAll('.btn-img');
const divScore = document.querySelector('#game-score');
const scoreHeading = document.createElement('h2');



let computerPlay = () => {
    let moveArray = ["rock", "paper", "scissors"];
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


let playerWinCount = 0;
let playerLoseCount = 0;
let gameCounter = 0;

buttonStart.addEventListener('click', () => {
    buttons.forEach((button) => {
        button.disabled = false;
    })
    buttonContainer.style.cssText = "filter: none";

    let style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = '.btn-img:hover { transition: ease 0.5s; transform: scale(1.2,1.2); filter: grayscale(0%); cursor: pointer}';
    } else {
        style.appendChild(document.createTextNode('.btn-img:hover { transition: ease 0.5s; transform: scale(1.2,1.2); filter: grayscale(0%); cursor: pointer}'))
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    
    scoreHeading.textContent = "Current Win-Lose: 0-0";
    scoreHeading.animate([
    { // from
      opacity: 0,
      easing: 'ease-out',
      color: "#fff",
      transform: "translateY(-30px)"
    },
    { // to
      opacity: 1,
      easing: 'ease-in',
      color: "#000",
      transform: "translateY(0)"
    }
  ], 600);
    divScore.appendChild(scoreHeading);
    buttonStart.disabled = true;
});

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        scoreHeading.textContent = playGame(button.value);
        if (gameCounter === 5) {
            buttons.forEach((button) => {
                button.disabled = true;
            })
            let gameOver = document.createElement('h3');
            gameOver.textContent = `Game finished. ${(playerWinCount > playerLoseCount) ? "You win!" 
            : (playerWinCount < playerLoseCount) ? "You lose!" 
            : "It's a draw!"}`;
            gameOver.animate([
                { // from
                  opacity: 0,
                  easing: 'ease-out',
                  color: "#fff",
                  transform: "scale(0.5)"
                },
                { // to
                  opacity: 1,
                  easing: 'ease-in',
                  color: "#000",
                  transform: "scale(1)"
                }
              ], 600);
            divScore.appendChild(gameOver);
        }
    })
});

let playGame = (playerMove) => {

    let computerSelection = computerPlay();

    switch(playRound(playerMove, computerSelection)) {
        case 0:
            console.log(`Draw! You both picked ${playerMove}.`);
            break;
        case 1:
            console.log(`You win! ${playerMove[0].toUpperCase() + playerMove.slice(1)} beats ${computerSelection}.`);
            playerWinCount += 1;
            break;
        case 2:
            console.log(`You lose! ${playerMove[0].toUpperCase() + playerMove.slice(1)} loses to ${computerSelection}.`);
            playerLoseCount += 1;
            break;
        default:
            break;
    }
    gameCounter++;
    let score = `Current Win-Lose: ${playerWinCount}-${playerLoseCount}`;

    return score;
};

