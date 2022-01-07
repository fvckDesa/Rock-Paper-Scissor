const btns = document.querySelectorAll('.btn-div');
const animatedPunchs = document.querySelectorAll('.animated-punch');
const player1Title = document.getElementById('player1');
const player1Images = document.getElementById('player1-image');
const computerTitle = document.getElementById('computer');
const computerImages = document.getElementById('computer-image');
const roundResulte = document.getElementById('round-result');
const player1Score = document.getElementById('player1-score');
const computerScore = document.getElementById('computer-score');
const gameAreaLeft = document.querySelector('.game-area-left');
const gameAreaRight = document.querySelector('.game-area-right');
const popUp = document.querySelector('.endGame');
const winnerTest = document.getElementById('winner');
const restart = document.getElementById('restart');

popUp.style.display = 'none';

let player1Points = 0, computerPoints = 0;

//scelta casuale tra sasso, carta e forbice (scelta del computer)
const computerPlay = () => {
    let randomNum = Math.floor(Math.random() * 3);
    if(randomNum === 0){
        return 'rock';
    }else if(randomNum === 1){
        return 'paper';
    }else{
        return 'scissor';
    }
}

const playerSelection = (e) => {
    const playerSelection = e.composedPath()[1].className;
    if(playerSelection === 'btn-rock'){
        return 'rock';
    }else if(playerSelection === 'btn-paper'){
        return 'paper';
    }else{
        return 'scissor';
    }
}

//controlla il vincitore tra il giocatore e il computer
const checkWinner = (playerSelection, computerPlay) => {
    if(
        (playerSelection === 'rock' && computerPlay === 'scissor') ||
        (playerSelection === 'scissor' && computerPlay === 'paper') ||
        (playerSelection === 'paper' && computerPlay === 'rock')
    ){
        return true;
    }else{
        return false;
    }
}

const returnSrc = (move) => {
    switch(move) {
        case 'rock':
            return './icon/rock.png';
        case 'paper':
            return './icon/paper.png';
        case 'scissor':
            return './icon/scissor.png';
    }
}

const showPlay = (playerSelection, computerPlay) => {
    player1Images.classList.add('remove-animated-punchs');
    computerImages.classList.add('remove-animated-punchs');

    const imgPlayerSelection = document.createElement('img');
    imgPlayerSelection.src = returnSrc(playerSelection);
    imgPlayerSelection.style.cssText = `position: relative; top: -30px; left: 30px`;
    const imgComputerPlay = document.createElement('img');
    imgComputerPlay.src = returnSrc(computerPlay);
    imgComputerPlay.style.cssText = `position: relative; top: -30px; left: 30px`;
    
    gameAreaLeft.appendChild(imgPlayerSelection);
    gameAreaRight.appendChild(imgComputerPlay);
}

//restituisce il risultato del round
const playRound = (playerSelection, computerPlay) => {
    showPlay(playerSelection, computerPlay);
    for(const animatedPunch of animatedPunchs){
        animatedPunch.classList.remove('animation');
    }
    if(playerSelection === computerPlay){
        player1Title.style.cssText = `color: yellow`;
        computerTitle.style.cssText = `color: yellow`;
        roundResulte.innerText = `The round ended in a draw`;
    }else if(checkWinner(playerSelection, computerPlay)){
        player1Title.style.cssText = `color: var(--win)`;
        computerTitle.style.cssText = `color: var(--lose)`;
        roundResulte.innerText = `Player1 win the round! ${playerSelection} beats ${computerPlay}`;
        player1Points++;
        player1Score.innerText = `${player1Points}`;
        computerScore.innerText = `${computerPoints}`;
        gameAreaLeft.lastChild.style.cssText = `width: 200px; height: 200px; animation: pulse-left 1s infinite`;
    }else{
        player1Title.style.cssText = `color: var(--lose)`;
        computerTitle.style.cssText = `color: var(--win)`;
        roundResulte.innerText = `Computer win the round! ${computerPlay} beats ${playerSelection}`;
        computerPoints++;
        player1Score.innerText = `${player1Points}`;
        computerScore.innerText = `${computerPoints}`;
        gameAreaRight.lastChild.style.cssText = `width: 200px; height: 200px; animation: pulse-right 1s infinite`;
    }
}

const reset = () => {
    roundResulte.innerText = `Round start`;

    player1Title.style.cssText = `color: var(--text)`;
    computerTitle.style.cssText = `color: var(--text)`;

    player1Images.classList.remove('remove-animated-punchs');
    computerImages.classList.remove('remove-animated-punchs');

    gameAreaLeft.removeChild(gameAreaLeft.lastChild);
    gameAreaRight.removeChild(gameAreaRight.lastChild);
}

const endGame = () => {
    btns.forEach(btn => {
        btn.removeEventListener('click', playGame);
    });
    popUp.style.display = 'flex';
    popUp.classList.add('endGameAnimation');
    winnerTest.innerText = `${player1Points > computerPoints ? 'PLAYER1' : 'COMPUTER'} win the game`;
}

const playGame = (e) => {
    if(player1Points === 3 || computerPoints === 3){
        endGame();
        return;
    }
    reset();
    for(const animatedPunch of animatedPunchs){
        animatedPunch.classList.add('animation');
    }
    setTimeout(playRound, 1200, playerSelection(e), computerPlay());

}

for(const btn of btns){
    btn.addEventListener('click', playGame);
}

restart.addEventListener('click', () => {
    window.location.reload();
});








