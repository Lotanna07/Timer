/* New landing page */
const startBtn = document.getElementById('startTimerBtn');

const bgRadios    = document.querySelectorAll('input[name="background"]');
const fontRadios  = document.querySelectorAll('input[name="font"]');
const borderRadios = document.querySelectorAll('input[name="border"]');

function allSelected() {
  const bgSelected     = document.querySelector('input[name="background"]:checked');
  const fontSelected   = document.querySelector('input[name="font"]:checked');
  const borderSelected = document.querySelector('input[name="border"]:checked');

  // border color is compulsory
  return bgSelected && fontSelected && borderSelected;
}

function updateButtonState() {
  startBtn.disabled = !allSelected();
}

bgRadios.forEach(r => r.addEventListener('change', updateButtonState));
fontRadios.forEach(r => r.addEventListener('change', updateButtonState));
borderRadios.forEach(r => r.addEventListener('change', updateButtonState));

startBtn.addEventListener('click', () => {
  if (!allSelected()) return;          // safety

  // here you can pass data via URL params, localStorage, etc.
  // example: go to timer.html
  window.location.href = 'timer.html';
});







/*Night 1*/

