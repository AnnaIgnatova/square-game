const body = document.querySelector('body');
const startBtn = document.querySelector('.start-btn');
const game = document.querySelector('.game');
const timer = document.querySelector('.timer');
const winBlock = document.querySelector('.win');
const level = document.querySelector('.level');

const GAME_SIZE = 570;
const COLORS = [
  '#78DBE2',
  '#9966CC',
  '#A8E4A0',
  '#ABCDEF',
  '#98FB98',
  '#D87093',
  '#919192',
  '#009B76',
  '#FFCF48',
  '#F64A46',
  '#1A153F',
  '#FD7C6E',
  '#78866B',
  '#FF5349',
];

let currentColor;
let squareNum = 2;
let squareSize = Math.floor((GAME_SIZE - squareNum * 5) / squareNum);
let squaresArr = [];
let randomNum;
let currentOpacity = 0.1;
let step = 0.1;
let countLevels = 1;
let currentTime = 10;
let gameStatus = 1;
let timeGo;

let stopTimer = () => {
  clearInterval(timeGo);
};

const timerFunc = () => {
  timeGo = setInterval(() => {
    if (currentTime === 0) {
      lose();
    }
    timer.textContent = `00 : ${String(currentTime--).padStart(2, '0')}`;
  }, 1000);
};

const resetAll = () => {
  stopTimer();
  gameStatus = 0;
  squareNum = 2;
  squareSize = Math.floor((GAME_SIZE - squareNum * 5) / squareNum);
  step = 0.1;
  currentOpacity = 0.1;
  countLevels = 1;
  resetLevel();
  currentTime = 10;
};
const resetLevel = () => {
  squaresArr = [];
  game.innerHTML = '';
};

const win = () => {
  resetAll();
  game.innerHTML = `
    <div class="win">
        <img src="./assets/win.png" alt="win" class="win-img"/>
        <span class="win-text">You are win!</span>
    </div>`;
  startBtn.classList.remove('hide');
  timer.classList.add('hide');
  level.classList.add('hide');
};

const lose = () => {
  resetAll();
  game.innerHTML = `
    <div class="win">
        <img src="./assets/lose.png" alt="win" class="win-img"/>
        <span class="win-text">You are lose!</span>
    </div>`;
  startBtn.classList.remove('hide');
  timer.classList.add('hide');
  level.classList.add('hide');
};

const changeLevel = () => {
  countLevels++;
  level.textContent = `level: ${countLevels}`;

  squaresArr[randomNum].removeEventListener('click', changeLevel);
  squareNum++;
  squareSize = Math.floor((GAME_SIZE - squareNum * 5) / squareNum);

  if (currentOpacity === 0.8) step = 0.02;
  currentOpacity += step;

  resetLevel();

  if (countLevels === 10) {
    win();
    return;
  }
  playGame();
};

const createActiveSquare = () => {
  randomNum = Math.floor(Math.random() * (squaresArr.length - 1));
  squaresArr[randomNum].style.opacity = currentOpacity;
  squaresArr[randomNum].classList.add('active');

  squaresArr[randomNum].addEventListener('click', changeLevel);
};

const createSquaresArr = () => {
  for (let i = 0; i < Math.pow(squareNum, 2); i++) {
    let square = createSquare();
    squaresArr.push(square);
  }
};

const createSquare = () => {
  const square = document.createElement('div');
  square.classList.add('square');
  square.style.width = `${squareSize}px`;
  square.style.height = `${squareSize}px`;
  square.style.backgroundColor = currentColor;

  return square;
};

const playGame = () => {
  createSquaresArr();
  createActiveSquare();

  squaresArr.forEach((square) => {
    game.append(square);
  });
};

const getRandomColor = () => {
  currentColor = COLORS[Math.floor(Math.random() * (COLORS.length - 1))];
};

startBtn.addEventListener('click', () => {
  gameStatus = 1;
  timerFunc();
  resetLevel();
  getRandomColor();
  playGame();
  startBtn.classList.add('hide');
  timer.classList.remove('hide');
  timer.textContent = `00 : ${currentTime}`;
  level.classList.remove('hide');
  level.textContent = `level: ${countLevels}`;
});

game.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('square') &&
    squaresArr.length > 0 &&
    !e.target.classList.contains('active')
  ) {
    lose();
    return;
  }
});
