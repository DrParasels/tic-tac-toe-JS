let btnBoard = document.querySelectorAll('.btn-option'),
    btnRestart = document.querySelector('.restart'),
    btnNewGame = document.querySelector('.new-game'),
    popupScreen = document.querySelector('.popup'),
    messageText = document.querySelector('.message'),
    winArray = [
      [0,1,2],
      [0,3,6],
      [0,4,8],
      [1,4,7],
      [2,5,8],
      [3,4,5],
      [6,7,8],
      [2,4,6]
    ],
    counter = 0,
    flagX = true;

//function when game end
const endGame = () => {
  popupScreen.classList.remove('hide');
  btnBoard.forEach(element => {
    element.disabled = true;
  });
}

//function if 'Ничья'
const drawFunction = () => {
  endGame();
  messageText.innerHTML = "&#x1F60E; <br> Ничья!";
}

// function if player win
const winFunction = (letter) => {
  endGame();
  if (letter == 'X') {
    messageText.innerHTML = "&#x1F389; <br> X Победил";
  }
  else {
    messageText.innerHTML = "&#x1F389; <br> O Победил";
  }
}

//functions for restart and play again
const enableButtons = () => {
  btnBoard.forEach(element => {
    element.disabled = false;
    element.textContent = '';
    popupScreen.classList.add('hide');
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

//function click O or X
btnBoard.forEach ((element) => {
  element.addEventListener('click', () => {
    if (flagX) {
      flagX = false;
      element.textContent = 'X';
      element.disabled = true;
    }
    else {
      flagX = true;
      element.textContent = 'O';
      element.disabled = true;
    }
    counter++;
    if (counter === 9) {
      drawFunction();
    }
    findWinner();
  });
});

//function find winner
const findWinner = () => {
  for (item of winArray) {
    let [element1, element2, element3] = [
      btnBoard[item[0]].innerText,
      btnBoard[item[1]].innerText,
      btnBoard[item[2]].innerText,
    ];
    if (element1 != '' && element2 != '' && element3 != '') {
      if (element1 === element2 && element2 === element3) {
        winFunction(element1);
      }
    }
  }
};

window.onload = enableButtons;