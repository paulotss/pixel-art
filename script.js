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
  } else if (size > 15) {
    size = 15;
  }
  board.innerHTML = '';
  board.style.width = `${(size * 40) + (size * 2)}px`;
  board.style.height = `${(size * 40) + (size * 2)}px`;
  for (let i = 0; i < (size * size); i += 1) {
    const newPixel = document.createElement('div');
    newPixel.classList.add('pixel');
    newPixel.addEventListener('click', changeColor);
    board.appendChild(newPixel);
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

let frames = [];

document.getElementById('reset').addEventListener('click', function() {
  window.location.reload();
})
document.getElementById('save').addEventListener('click', newFrame);

function newFrame() {
  document.getElementById('play').style.display = 'inline';
  document.getElementById('reset').style.display = 'inline';
  let save = document.getElementById('pixel-board');
  frames.push(save.innerHTML);
  frames.push(save.style.width);
  let frame = document.createElement('div');
  let size = document.getElementById('pixel-board').children.length;
  frame.style.width = `${Math.sqrt(size) * 5}px`;
  frame.style.height = `${Math.sqrt(size) * 5}px`;
  frame.innerHTML = save.innerHTML;
  document.getElementById('frames').appendChild(frame);
  const sample = document.getElementById('frames').firstChild.children;
  for(let i = 0; i < sample.length; i += 1) {
    sample[i].classList.remove('pixel');
  }
}

let count = 0;
let anim;

document.getElementById('play').addEventListener('click', function() {
  anim = setInterval(animate, 100);
})

function animate() {
  if(count < frames.length) {
    let board = document.getElementById('pixel-board');
    board.style.width = frames[count + 1];
    board.style.height = frames[count + 1];
    board.innerHTML = frames[count];
    count += 2;
  } else {
    clearInterval(anim);
    count = 0;
  }
}