const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let bodyEl = document.querySelector('body');
let setId = null;

btnStart.addEventListener('click', addBgColor);

btnStop.addEventListener('click', () => {
  clearInterval(setId);
  btnStart.disabled = false;
});

function addBgColor() {
  setId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
