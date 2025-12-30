// 🆕 CLOSE BUTTON - Add this at the TOP of index.js
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeBtn');
    const bgVideo = document.getElementById('bgVideo');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            // Stop music and video first
            if (bgVideo) bgVideo.pause();
            const musicAudio = document.getElementById('musicAudio');
            if (musicAudio) {
                localStorage.setItem('musicTime', musicAudio.currentTime);
                musicAudio.pause();
            }
            
            // Confirm and close (best visual exit)
            if (confirm('Close My Space To Focus?')) {
                document.body.style.display = 'none';  // Instant hide
                document.title = 'Closed';
                setTimeout(() => {
                    window.location.href = 'about:blank';
                }, 300);
            }
        });
    }
});


/* Landing Page */
let startBtn = document.getElementById('startTimerBtn');

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


/* 🆕 BULLETPROOF MUSIC SYSTEM - WORKS ACROSS ALL PAGES */
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const musicToggle = document.getElementById('musicToggle');
    const musicAudio = document.getElementById('musicAudio');
    const soundToggle = document.getElementById('soundToggle');
    const clickSound = document.getElementById('clickSound');

    // 🔧 DEBUG: Check if elements exist
    console.log('Music toggle:', musicToggle);
    console.log('Music audio:', musicAudio);
    console.log('Music enabled:', localStorage.getItem('musicEnabled'));

    // 1. LOAD MUSIC STATE ON EVERY PAGE LOAD
    if (musicAudio) {
        const musicEnabled = localStorage.getItem('musicEnabled') === 'true';
        
        if (musicEnabled) {
            // Resume music with saved position
            const savedTime = parseFloat(localStorage.getItem('musicTime')) || 0;
            musicAudio.currentTime = savedTime;
            musicAudio.volume = 0.3;
            musicAudio.play().catch(e => console.log('Autoplay blocked:', e));
        } else {
            musicAudio.pause();
        }
        
        // Update toggle if on settings page
        if (musicToggle) musicToggle.checked = musicEnabled;
    }

    // 2. TOGGLE MUSIC (only on settings page)
    if (musicToggle && musicAudio) {
        musicToggle.addEventListener('change', function() {
            const enabled = this.checked;
            localStorage.setItem('musicEnabled', enabled);
            console.log('Music toggled:', enabled);
            
            if (enabled) {
                musicAudio.volume = 0.3;
                musicAudio.play().catch(e => console.log('Play failed:', e));
            } else {
                localStorage.setItem('musicTime', musicAudio.currentTime);
                musicAudio.pause();
            }
        });
    }

    // 3. SAVE POSITION WHEN LEAVING PAGE
    window.addEventListener('beforeunload', function() {
        if (musicAudio && localStorage.getItem('musicEnabled') === 'true') {
            localStorage.setItem('musicTime', musicAudio.currentTime);
        }
    });

    // 4. CLICK SOUNDS (works everywhere)
    window.playClickSound = function() {
        if (clickSound && soundToggle && soundToggle.checked) {
            clickSound.currentTime = 0;
            clickSound.volume = 0.5;
            clickSound.play().catch(e => console.log('Click blocked'));
        }
    };
});

/* Night 1 Timer - TIME'S UP WITH EMOJIS ⏰🔥✅ */
if (document.getElementById('timerDisplay')) {
  // 🆕 TRACK USAGE ON TIMER PAGES
  trackAppUsage();
  
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
  const alarmSound = document.getElementById('alarmSound');

  function updateDisplay() {
    display.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function startTimer() {
    playClickSound(); // 🆕 Click sound
    if (isRunning) return;
    isRunning = true;
    pauseBtn.textContent = 'Pause';
    
    timerInterval = setInterval(() => {
      if (h === 0 && m === 0 && s === 0) {
        clearInterval(timerInterval);
        isRunning = false;
        
        // 🆕 TIME'S UP WITH EMOJIS + BLACK + ALARM
        display.textContent = "⏰TIME'S UP!⏰";
        display.style.color = "#000000"; // BLACK COLOR
        if (alarmSound) alarmSound.play();
        
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
    playClickSound(); // 🆕 Click sound
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
    playClickSound(); // 🆕 Click sound
    clearInterval(timerInterval);
    isRunning = false;
    pauseBtn.textContent = 'Pause';
    
    // 🆕 STOP ALARM + RESET DISPLAY
    if (alarmSound) {
      alarmSound.pause();
      alarmSound.currentTime = 0;
    }
    display.style.color = "";
    
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

/* 🆕 ANALYTICS SYSTEM - TRACKS WEEK/MONTH/YEAR USAGE ✅ */
function trackAppUsage() {
  const now = new Date();
  const today = now.toDateString();
  
  // Get or initialize usage data
  let usageData = JSON.parse(localStorage.getItem('appUsage') || '{}');
  
  // Track today's session
  if (!usageData.days) usageData.days = {};
  usageData.days[today] = (usageData.days[today] || 0) + 1;
  usageData.lastSession = now.toLocaleString();
  usageData.totalSessions = (usageData.totalSessions || 0) + 1;
  
  // Clean old data (keep 2 years max)
  cleanupOldData(usageData);
  
  // Save back to storage
  localStorage.setItem('appUsage', JSON.stringify(usageData));
}

function cleanupOldData(usageData) {
  const now = new Date();
  const twoYearsAgo = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);
  
  // Remove days older than 2 years
  for (let date in usageData.days) {
    const dateTime = new Date(date).getTime();
    if (dateTime < twoYearsAgo.getTime()) {
      delete usageData.days[date];
    }
  }
}

/*Analysis page - FULL ANALYTICS DISPLAY ✅*/
if (document.querySelector('.analytics-page')) {
  const usageData = JSON.parse(localStorage.getItem('appUsage') || '{}');
  updateAnalyticsDisplay(usageData);
  
  function getUsageCount(period) {
    const now = new Date();
    let count = 0;
    
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    
    for (let date in usageData.days) {
      const dateTime = new Date(date).getTime();
      if (period === 'week' && dateTime >= weekAgo.getTime()) count += usageData.days[date];
      if (period === 'month' && dateTime >= monthAgo.getTime()) count += usageData.days[date];
      if (period === 'year' && dateTime >= yearAgo.getTime()) count += usageData.days[date];
    }
    
    return count;
  }
  
  function updateAnalyticsDisplay(usageData) {
    document.getElementById('weekCount').textContent = getUsageCount('week');
    document.getElementById('monthCount').textContent = getUsageCount('month');
    document.getElementById('yearCount').textContent = getUsageCount('year');
    document.getElementById('totalCount').textContent = usageData.totalSessions || 0;
    document.getElementById('lastSession').textContent = usageData.lastSession || 'Never';
  }
}
