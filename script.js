const buttons = document.querySelectorAll('.btn-choice');
const buttonStart = document.querySelector('.btn-start');
const buttonContainer = document.querySelector('.button-container');
const btnImg = document.querySelectorAll('.btn-img');
const divScore = document.querySelector('#game-score');
const scoreHeading = document.createElement('h2');
const divArena = document.createElement('div');
const imgArenaLeft = document.createElement('img');
const imgArenaRight = document.createElement('img');
imgArenaLeft.classList.add('arenaImg');
imgArenaLeft.classList.add('leftImg');
imgArenaRight.classList.add('arenaImg');

let playerWinCount = 0;
let playerLoseCount = 0;
let gameCounter = 0;

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

let playGame = (playerMove) => {
    let arenaImgFlag = false;
    let computerSelection = computerPlay();


    if (!arenaImgFlag) {

        divArena.appendChild(imgArenaLeft);
        divArena.appendChild(imgArenaRight);
        arenaImgFlag = true;
    }

    switch(playRound(playerMove, computerSelection)) {
        case 0:
            console.log(`Draw! You both picked ${playerMove}.`);
            imgArenaLeft.setAttribute('src', `static/${playerMove}1.png`);
            imgArenaLeft.style.filter = "grayscale(100%) brightness(60%) sepia(100%) hue-rotate(150deg) saturate(300%)";
            imgArenaRight.setAttribute('src', `static/${computerSelection}1.png`);
            imgArenaRight.style.filter = "grayscale(100%) brightness(60%) sepia(100%) hue-rotate(150deg) saturate(300%)";

            break;
        case 1:
            imgArenaLeft.style.filter = "grayscale(100%) brightness(60%) sepia(100%) hue-rotate(60deg) saturate(300%)";
            imgArenaLeft.setAttribute('src', `static/${playerMove}1.png`);
            imgArenaRight.style.filter = "grayscale(100%) brightness(60%) sepia(100%) hue-rotate(300deg) saturate(300%)";
            imgArenaRight.setAttribute('src', `static/${computerSelection}1.png`)

            console.log(`You win! ${playerMove[0].toUpperCase() + playerMove.slice(1)} beats ${computerSelection}.`);
            playerWinCount += 1;
            break;
        case 2:
            console.log(`You lose! ${playerMove[0].toUpperCase() + playerMove.slice(1)} loses to ${computerSelection}.`);
            imgArenaLeft.style.filter = "grayscale(100%) brightness(60%) sepia(100%) hue-rotate(300deg) saturate(300%)";
            imgArenaLeft.setAttribute('src', `static/${playerMove}1.png`);
            imgArenaRight.style.filter = "grayscale(100%) brightness(60%) sepia(100%) hue-rotate(60deg) saturate(300%)";
            imgArenaRight.setAttribute('src', `static/${computerSelection}1.png`)
            playerLoseCount += 1;
            break;
        default:
            break;
    }
    gameCounter++;
    let score = `Current Win-Lose: ${playerWinCount}-${playerLoseCount}`;

    return score;
};


buttonStart.addEventListener('click', () => {
    buttons.forEach((button) => {
        button.disabled = false;
    })
    buttonContainer.style.cssText = "filter: none";

    btnImg.forEach((img) => {
        img.classList.add('gameactive');
    })

    

    divArena.style.cssText = 'width: 300px; height: 150px; border: 2px solid black';

    divArena.animate([
        { // from
          opacity: 0,
          easing: 'ease-out',
          color: "#fff"
        },
        { // to
          opacity: 1,
          easing: 'ease-in',
          color: "#000"
        }
      ], 600);
    divScore.appendChild(divArena);

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
            
            btnImg.forEach((img) => {
                img.classList.remove('gameactive');
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
            if (playerWinCount > playerLoseCount) {
                document.querySelector('html').style.backgroundImage = "url('static/neverlost.png')"
            }
        }
    })
});


