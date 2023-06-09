const selectionButtons = document.querySelectorAll(
  '.rps-selection-container button'
);
const selectionOptions = ['rock', 'paper', 'scissors'];
for (let i = 0; i < selectionButtons.length; i++) {
  let button = selectionButtons[i];
  button.onmouseenter = () => addToolTip(button, selectionOptions[i]);
  button.onmouseleave = () => removeToolTip();

  button.onclick = () => checkWin(selectionOptions[i]);
}

const scoreEles = document.querySelectorAll('.rps-score h2');
const scoreboardoptions = ['Player 1', 'Tie', 'Player 2'];
for (let i = 0; i < scoreEles.length; i++) {
  const scoreEle = scoreEles[i];
  scoreEle.onmouseenter = () => addToolTip(scoreEle, scoreboardoptions[i]);
  scoreEle.onmouseleave = () => removeToolTip();
}

const toolTip = document.querySelector('.tooltip');
function addToolTip(ele, msg) {
  toolTip.innerHTML = msg;
  toolTip.style.display = 'block';

  const rect = ele.getBoundingClientRect();
  toolTip.style.top = `${rect.top + rect.top / 4}px`;
  rect.left > window.innerWidth / 2
    ? (toolTip.style.left = `${rect.left - 100}px`)
    : (toolTip.style.left = `${rect.right - 25}px`);
}
function removeToolTip() {
  toolTip.style.display = 'none';
}

const winnerText = document.getElementById('winner-text');

let animationPlaying = false;
let playerScore = 0;
let botScore = 0;
let tieScore = 0;
function checkWin(selection) {
  if (animationPlaying) return;
  winnerText.innerText = '';
  winnerText.classList.remove('winning-text');
  let winner = '';
  animationPlaying = true;
  const botSelection = getBotSelection();
  if (selection === botSelection) {
    winner = 'Its a Tie!';
    tieScore++;
  } else if (
    (selection === 'rock' && botSelection === 'paper') ||
    (selection === 'scissors' && botSelection === 'rock') ||
    (selection === 'paper' && botSelection === 'scissors')
  ) {
    winner = 'Player 2 Wins!';
    botScore++;
  } else if (
    (selection === 'rock' && botSelection === 'scissors') ||
    (selection === 'paper' && botSelection === 'rock') ||
    (selection === 'scissors' && botSelection === 'paper')
  ) {
    winner = 'Player 1 Wins!';
    playerScore++;
  }
  updateScore();
  playWinAnimation(selection, botSelection, winner);
}
function getBotSelection() {
  let selection = Math.floor(Math.random() * 3);
  return selectionOptions[selection];
}
function updateScore() {
  const scores = [playerScore, tieScore, botScore];
  const scoreEles = document.querySelectorAll('.rps-score h2');

  for (let i = 0; i < scoreEles.length; i++) {
    scoreEles[i].innerHTML = scores[i];
  }
}
const vidPath = '../../assets/videos/';
const animationSources = [
  { path: vidPath + 'rock-v-paper.gif', length: 3500 },
  { path: vidPath + 'rock-v-scissors.gif', length: 3000 },
  { path: vidPath + 'paper-v-scissors.gif', length: 1600 },
  { path: vidPath + 'rock-v-rock.gif', length: 2800 },
  { path: vidPath + 'paper-v-paper.gif', length: 2300 },
  { path: vidPath + 'scissors-v-scissors.gif', length: 3300 },
];
const winVidEle = document.querySelector('.win-video');
function playWinAnimation(player1, player2, winner) {
  animationPlaying = true;
  let animI;
  if (
    (player1 === 'rock' && player2 === 'paper') ||
    (player2 === 'rock' && player1 === 'paper')
  ) {
    //rock and paper
    animI = 0;
  } else if (
    (player1 === 'rock' && player2 === 'scissors') ||
    (player2 === 'rock' && player1 === 'scissors')
  ) {
    //rock v scissors
    animI = 1;
  } else if (
    (player1 === 'paper' && player2 === 'scissors') ||
    (player2 === 'paper' && player1 === 'scissors')
  ) {
    //paper v scissors
    animI = 2;
  } else if (player1 === 'rock' && player2 === 'rock') {
    //rock v rock
    animI = 3;
  } else if (player1 === 'paper' && player2 === 'paper') {
    //paper v paper
    animI = 4;
  } else if (player1 === 'scissors' && player2 === 'scissors') {
    //scissor v scissor
    animI = 5;
  }
  winVidEle.src = animationSources[animI].path;

  winVidEle.style.opacity = '1';
  setTimeout(() => {
    //update bool and add condition
    //
    winVidEle.style.opacity = '0';
    winnerText.innerText = winner;
    winnerText.classList.add('winning-text');

    setTimeout(() => {
      animationPlaying = false;
      if (playerScore < 3 && botScore < 3) return;
      animationPlaying = true;

      initEndGame(winner);
    }, 500);
  }, animationSources[animI].length);
}

const endGameContainer = document.querySelector('.end-game-container');
function initEndGame(winner) {
  endGameContainer.style.display = 'flex';
  const endGameText = document.querySelector('.end-game-container h2');
  endGameText.innerHTML = winner;
}
const endGameBtn = document.querySelector('.quit-button');
const nextRoundButton = document.querySelector('.next-round-button');

endGameBtn.onclick = () => (window.location = '../../index.html');
nextRoundButton.onclick = () => startNextRound();
function startNextRound() {
  animationPlaying = false;
  endGameContainer.style.display = 'none';
  //reset score
  playerScore = 0;
  botScore = 0;
  tieScore = 0;

  updateScore();
}
