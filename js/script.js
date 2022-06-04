let valueSelect = document.getElementById("fieldsize"),
  btnRestart = document.querySelector('.restart'),
  btnNewGame = document.querySelector('.new-game'),
  popupScreen = document.querySelector('.popup'),
  messageText = document.querySelector('.message'),
  counter = 0,
  flagX = true,
  xWins = 0,
  oWins = 0,
  draw = 0;

//function get value in select


valueSelect.addEventListener("change", () => {
  sizeBoard = valueSelect.options[valueSelect.selectedIndex].value;
  newField(sizeBoard);
  btnBoard = document.querySelectorAll('.btn-option');
});


//function get параметры






//function create field
function newField(size) {
  document.querySelector('.container').innerHTML = '<button class="btn-option"></button>'.repeat(size * size);
  document.querySelector('.container').style.gridTemplateColumns = `repeat(${sizeBoard},1fr)`;
  document.querySelector('.container').style.gridGap = `${1}vmin`;
  btnBoard = document.querySelectorAll('.btn-option');
  for (i = 0; i < btnBoard.length; i++) {
    btnBoard[i].style.width = `${6}vmin`;
    btnBoard[i].style.height = `${6}vmin`;
    btnBoard[i].style.fontSize = `${5}vmin`;
  }
}

let sizeBoard = valueSelect.options[valueSelect.selectedIndex].value;
newField(sizeBoard);
rows = getRows(btnBoard);
cols = getColumns(btnBoard);
diag1 = getDiagonals1(rows);
diag2 = getDiagonals2(rows);
winArr = rows.concat(cols, diag1, diag2);
//function get rows
function getRows(arr) {
  let rows = [];
  for (let i = 0; i < sizeBoard; i++) {
    rows[i] = [];
    for (let j = 0; j < sizeBoard; j++) {
      rows[i][j] = arr[(i * sizeBoard) + j];
    }
  }
  return rows;
}

//function get columns
function getColumns(arr) {
  let cols = [];
  for (let i = 0; i < sizeBoard; i++) {
    cols[i] = [];
    for (let j = 0; j < sizeBoard; j++) {
      cols[i][j] = arr[(j * sizeBoard) + i];
    }
  }
  return cols;
}



//function get diagonal
function getDiagonals1(arr) {
  let result = [];
  for (i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      if (result[i + j] === undefined) {
        result[i + j] = [];
      }
      result[i + j].push(arr[i][j]);
    }
  }
  return result;
}



function reverseSubArrs(arr) {
  let result = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = arr[i].length - 1; j >= 0; j--) {
      if (result[i] === undefined) {
        result[i] = [];
      }
      result[i].push(arr[i][j]);
    }
  }
  return result;
}

function getDiagonals2(arr) {
  return getDiagonals1(reverseSubArrs(arr));
}

function findWinner(winArr) {
  for (var i = 0; i < winArr.length; i++) {
    for (var j = 2; j < winArr[i].length; j++) {
      if (winArr[i][j - 2].innerText != '' &&
        winArr[i][j - 1].innerText != '' &&
        winArr[i][j - 1].innerText != '') {
        if (
          winArr[i][j - 2].innerText === winArr[i][j - 1].innerText &&
          winArr[i][j - 1].innerText === winArr[i][j].innerText
        ) {
          winFunction(winArr[i][j].innerText, i, j);
        }
      }
    }
  }
}

//function when game end
const endGame = () => {
  popupScreen.style.transform = 'translateY(0)';
  btnBoard.forEach(element => {
    element.disabled = true;
  });
}

//function if 'Ничья'
const drawFunction = () => {
  endGame();
  messageText.innerHTML = "&#x1F60E; <br> Ничья!";
  draw++;
  document.querySelector('.score-draw').textContent = "Draw: " + draw;
}

// function if player win
const winFunction = (letter, i, j) => {
  winArr[i][j - 2].classList.add('win-btn');
  winArr[i][j - 1].classList.add('win-btn');
  winArr[i][j].classList.add('win-btn');
  btnBoard.forEach(element => {
    element.disabled = true;
  });
  setTimeout(endGame, 1000);
  if (letter == 'X') {
    messageText.innerHTML = "&#x1F389; <br> X Победил";
    xWins++;
    document.querySelector('.score-winX').textContent = "X wins: " + xWins;
  } else {
    messageText.innerHTML = "&#x1F389; <br> O Победил";
    oWins++;
    document.querySelector('.score-winO').textContent = "O wins: " + oWins;
  }
}

//functions for restart and play again
const enableButtons = () => {
  btnBoard.forEach(element => {
    element.classList.remove('win-btn');
    element.disabled = false;
    element.textContent = '';
    popupScreen.style.transform = "translateY(-200%)";
  });
}

btnRestart.addEventListener('click', () => {
  counter = 0;
  enableButtons();
});

btnNewGame.addEventListener('click', () => {
  counter = 0;
  enableButtons();
});


btnBoard.forEach((element) => {
  console.log(element)
  element.addEventListener('click', () => {
    if (flagX) {
      flagX = false;
      element.textContent = 'X';
      element.disabled = true;
    } else {
      flagX = true;
      element.textContent = 'O';
      element.disabled = true;
    }
    counter++;
    if (counter === btnBoard.length) {
      drawFunction();
    }
    findWinner(winArr);
  });
});

window.onload = enableButtons;