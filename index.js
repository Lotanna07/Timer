/* Landing Page - FIXED: Changed var to const/let */
let startBtn = document.getElementById('startTimerBtn'); // Fixed: was var

const bgRadios     = document.querySelectorAll('input[name="background"]');
const fontRadios   = document.querySelectorAll('input[name="font"]');
const borderRadios = document.querySelectorAll('input[name="border"]');

const hoursInput   = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

function allSelected() {
  const bgSelected     = document.querySelector('input[name="background"]:checked');
  const fontSelected   = document.querySelector('input[name="font"]:checked');
  const borderSelected = document.querySelector('input[name="border"]:checked');
  return bgSelected && fontSelected && borderSelected;
}

function updateButtonState() {
  if (startBtn) startBtn.disabled = !allSelected();
}

bgRadios.forEach(r => r.addEventListener('change', updateButtonState));
fontRadios.forEach(r => r.addEventListener('change', updateButtonState));
borderRadios.forEach(r => r.addEventListener('change', updateButtonState));

if (startBtn) {
  startBtn.addEventListener('click', () => {
    if (!allSelected()) return;

    const bg     = document.querySelector('input[name="background"]:checked').value;
    const font   = document.querySelector('input[name="font"]:checked').value;
    const hours  = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    const pageMap = {
      bg1: { clash: 'nightday1.html', press: 'nightday2.html', pacifico: 'nightday3.html' },
      bg2: { clash: 'daytime1.html', press: 'daytime2.html', pacifico: 'daytime3.html' }
    };

    const targetPage = pageMap[bg][font];
    window.location.href = `${targetPage}?h=${hours}&m=${minutes}&s=${seconds}`;
  });
}

/* Night 1 Timer - YOUR CODE IS PERFECT ✅ */
if (document.getElementById('timerDisplay')) {
  const params = new URLSearchParams(window.location.search);
  let h = parseInt(params.get('h')) || 0;
  let m = parseInt(params.get('m')) || 0;
  let s = parseInt(params.get('s')) || 0;

  let timerInterval;
  let isRunning = false;

  const display = document.getElementById('timerDisplay');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');
  const pauseBtn = document.getElementById('pauseBtn');

  function updateDisplay() {
    display.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    pauseBtn.textContent = 'Pause';
    
    timerInterval = setInterval(() => {
      if (h === 0 && m === 0 && s === 0) {
        clearInterval(timerInterval);
        isRunning = false;
        return;
      }
      if (s > 0) {
        s--;
      } else if (m > 0) {
        m--;
        s = 59;
      } else if (h > 0) {
        h--;
        m = 59;
        s = 59;
      }
      updateDisplay();
    }, 1000);
  }

  function pauseTimer() {
    if (!isRunning) {
      startTimer();
      pauseBtn.textContent = 'Pause';
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      pauseBtn.textContent = 'Resume';
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    pauseBtn.textContent = 'Pause';
    const params = new URLSearchParams(window.location.search);
    h = parseInt(params.get('h')) || 0;
    m = parseInt(params.get('m')) || 0;
    s = parseInt(params.get('s')) || 0;
    updateDisplay();
  }

  // Event listeners
  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

  // Initial display
  updateDisplay();
}
