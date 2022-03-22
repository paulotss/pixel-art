const color = document.getElementsByClassName('color');
const pixel = document.getElementsByClassName('pixel');

function radomRGB() {
  const arr = [0, 0, 0];
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = Math.floor(Math.random() * 255);
  }
  return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
}

color[0].style.backgroundColor = 'black';
color[1].style.backgroundColor = radomRGB();
color[2].style.backgroundColor = radomRGB();
color[3].style.backgroundColor = radomRGB();

function selectColor(e) {
  for (let i = 0; i < color.length; i += 1) {
    color[i].classList.remove('selected');
  }
  e.target.classList.add('selected');
}

for (let i = 0; i < color.length; i += 1) {
  color[i].addEventListener('click', selectColor);
}

function changeColor(e) {
  const selected = document.querySelector('.selected').style.backgroundColor;
  e.target.style.backgroundColor = selected;
}

for (let i = 0; i < pixel.length; i += 1) {
  pixel[i].addEventListener('click', changeColor);
}

function clearBoard() {
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = 'white';
  }
}

document.getElementById('clear-board').addEventListener('click', clearBoard);

function changeSizeBox() {
  let size = parseInt(document.getElementById('board-size').value, 10);
  const board = document.getElementById('pixel-board');
  if (size < 5) {
    size = 5;
  } else if (size > 50) {
    size = 50;
  }
  board.innerHTML = '';
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const newPixel = document.createElement('div');
      newPixel.classList.add('pixel');
      newPixel.addEventListener('click', changeColor);
      board.appendChild(newPixel);
    }
    const br = document.createElement('br');
    board.appendChild(br);
  }
}

function generateBoard(e) {
  e.preventDefault();
  if (document.getElementById('board-size').value === '') {
    alert('Board inválido!');
  } else {
    changeSizeBox();
  }
}

document.getElementById('generate-board').addEventListener('click', generateBoard);
