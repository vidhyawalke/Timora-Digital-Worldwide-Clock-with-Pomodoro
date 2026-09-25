/* ========================================================
   Timora - Digital Worldwide Clock with Pomodoro
   Beginner-friendly, clean, readable Vanilla JavaScript.
   ======================================================== */

// --- 1. POPULAR HUBS & CURATED WALLPAPERS DATA ---

const POPULAR_HUBS = [
  { name: 'London', country: 'United Kingdom', code: 'gb', tz: 'Europe/London', lat: 51.5074, lon: -0.1278 },
  { name: 'New York', country: 'United States', code: 'us', tz: 'America/New_York', lat: 40.7128, lon: -74.0060 },
  { name: 'Tokyo', country: 'Japan', code: 'jp', tz: 'Asia/Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Dubai', country: 'UAE', code: 'ae', tz: 'Asia/Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Paris', country: 'France', code: 'fr', tz: 'Europe/Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Singapore', country: 'Singapore', code: 'sg', tz: 'Asia/Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Sydney', country: 'Australia', code: 'au', tz: 'Australia/Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Mumbai', country: 'India', code: 'in', tz: 'Asia/Kolkata', lat: 19.0760, lon: 72.8777 }
];

const CURATED_WALLPAPERS = [
  { title: 'Mountain Mist', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop' },
  { title: 'Minimalist Architecture', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop' },
  { title: 'Cozy Study Cafe', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000&auto=format&fit=crop' },
  { title: 'Tokyo Neon Night', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2000&auto=format&fit=crop' },
  { title: 'Deep Forest Green', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2000&auto=format&fit=crop' },
  { title: 'Sunset Ocean Wave', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop' },
  { title: 'Lofi Gradient Glow', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop' },
  { title: 'Nordic Interior Study', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop' }
];

const BACKUP_QUOTES = [
  { text: "The Pomodoro Technique was created to work with time, not against it.", author: "Francesco Cirillo" },
  { text: "One Pomodoro at a time. One task at a time. One goal at a time.", author: "Francesco Cirillo" },
  { text: "Focus is the art of knowing what to ignore.", author: "Francesco Cirillo" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "Deep work is the ability to focus without distraction.", author: "Cal Newport" }
];


// --- 2. LANDING SCREEN LOGIC ---

const landingScreen = document.getElementById('landing-screen');
const btnEnter = document.getElementById('btn-enter');

function dismissLanding() {
  if (!landingScreen) return;
  landingScreen.classList.add('fade-out');
  setTimeout(() => {
    landingScreen.style.display = 'none';
  }, 600);
  sessionStorage.setItem('timora_landing_seen', 'true');
}

if (sessionStorage.getItem('timora_landing_seen') === 'true') {
  landingScreen.style.display = 'none';
} else {
  landingScreen.addEventListener('click', dismissLanding);
  if (btnEnter) btnEnter.addEventListener('click', dismissLanding);
  // Auto-dismiss after 1.8 seconds
  setTimeout(dismissLanding, 1800);
}


// --- 3. DARK / LIGHT THEME TOGGLE ---

const btnThemeToggle = document.getElementById('btn-theme-toggle');
let isDarkMode = localStorage.getItem('timora_dark_mode') === 'true';

function applyTheme() {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    btnThemeToggle.textContent = '☀️ Light Mode';
  } else {
    document.body.classList.remove('dark-mode');
    btnThemeToggle.textContent = '🌙 Dark Mode';
  }
}

btnThemeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  localStorage.setItem('timora_dark_mode', isDarkMode);
  applyTheme();
});

applyTheme();


// --- 4. CUSTOM WALLPAPER BACKGROUND ---

const modalWallpaper = document.getElementById('modal-wallpaper');
const btnOpenWallpaper = document.getElementById('btn-open-wallpaper');
const btnCloseWallpaper = document.getElementById('btn-close-wallpaper-modal');
const wallpapersGrid = document.getElementById('wallpapers-grid');
const formCustomBg = document.getElementById('form-custom-bg');
const inputBgUrl = document.getElementById('input-bg-url');
const inputBgFile = document.getElementById('input-bg-file');
const btnResetBg = document.getElementById('btn-reset-bg');

function setWallpaper(url) {
  if (url) {
    document.body.style.backgroundImage = `url("${url}")`;
    document.body.classList.add('has-custom-bg');
    localStorage.setItem('timora_wallpaper_url', url);
  } else {
    document.body.style.backgroundImage = '';
    document.body.classList.remove('has-custom-bg');
    localStorage.removeItem('timora_wallpaper_url');
  }
}

// Render curated wallpapers grid
function renderWallpaperOptions() {
  wallpapersGrid.innerHTML = '';
  CURATED_WALLPAPERS.forEach((wp) => {
    const img = document.createElement('img');
    img.src = wp.url;
    img.alt = wp.title;
    img.title = wp.title;
    img.className = 'wp-thumb';
    img.addEventListener('click', () => {
      setWallpaper(wp.url);
      modalWallpaper.classList.add('hidden');
    });
    wallpapersGrid.appendChild(img);
  });
}

btnOpenWallpaper.addEventListener('click', () => {
  modalWallpaper.classList.remove('hidden');
  renderWallpaperOptions();
});

btnCloseWallpaper.addEventListener('click', () => {
  modalWallpaper.classList.add('hidden');
});

modalWallpaper.addEventListener('click', (e) => {
  if (e.target === modalWallpaper) modalWallpaper.classList.add('hidden');
});

formCustomBg.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = inputBgUrl.value.trim();
  if (url) {
    setWallpaper(url);
    inputBgUrl.value = '';
    modalWallpaper.classList.add('hidden');
  }
});

inputBgFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    setWallpaper(event.target.result);
    modalWallpaper.classList.add('hidden');
  };
  reader.readAsDataURL(file);
});

btnResetBg.addEventListener('click', () => {
  setWallpaper('');
  modalWallpaper.classList.add('hidden');
});

// Restore saved wallpaper on startup
const savedWallpaper = localStorage.getItem('timora_wallpaper_url');
if (savedWallpaper) {
  setWallpaper(savedWallpaper);
}


// --- 5. LOCAL CLOCK, WORLDWIDE CLOCKS & WEATHER ---

const localCityEl = document.getElementById('local-city');
const localWeatherEl = document.getElementById('local-weather');
const localTimeEl = document.getElementById('local-time');
const localDateEl = document.getElementById('local-date');
const foreignClocksListEl = document.getElementById('foreign-clocks-list');

// Load foreign clocks from localStorage (max 4)
let foreignClocks = JSON.parse(localStorage.getItem('timora_foreign_clocks')) || [];

function saveForeignClocks() {
  localStorage.setItem('timora_foreign_clocks', JSON.stringify(foreignClocks));
  renderForeignClocks();
}

function updateClocks() {
  const now = new Date();

  // Local Time & Date
  localTimeEl.textContent = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  localDateEl.textContent = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  // Foreign Clocks Time update
  foreignClocks.forEach((clock) => {
    const timeEl = document.getElementById(`time-clock-${clock.id}`);
    if (timeEl) {
      try {
        timeEl.textContent = new Intl.DateTimeFormat('en-US', {
          timeZone: clock.tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now);
      } catch (e) {
        timeEl.textContent = '--:--:--';
      }
    }
  });
}

function renderForeignClocks() {
  foreignClocksListEl.innerHTML = '';
  foreignClocks.forEach((clock) => {
    const chip = document.createElement('div');
    chip.className = 'clock-chip foreign-clock-chip';
    chip.innerHTML = `
      <div class="clock-chip-top">
        <span class="city-name">${clock.name}</span>
        <span class="weather-badge">${clock.temp || ''}</span>
      </div>
      <div class="clock-chip-time" id="time-clock-${clock.id}">--:--:--</div>
      <button class="btn-remove-clock" title="Remove clock">&times;</button>
    `;

    chip.querySelector('.btn-remove-clock').addEventListener('click', () => {
      foreignClocks = foreignClocks.filter((c) => c.id !== clock.id);
      saveForeignClocks();
    });

    foreignClocksListEl.appendChild(chip);
  });
}

// Fetch Weather using Open-Meteo API
async function fetchWeather(lat, lon) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await res.json();
    if (data && data.current_weather) {
      const temp = Math.round(data.current_weather.temperature);
      return `${temp}°C`;
    }
  } catch (err) {
    console.log('Weather error:', err);
  }
  return '';
}

// Auto detect local location & weather
async function initLocalInfo() {
  try {
    const res = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en');
    const data = await res.json();
    const city = data.city || data.locality || 'Local';
    const lat = data.latitude || 20;
    const lon = data.longitude || 78;

    localCityEl.textContent = city;
    const temp = await fetchWeather(lat, lon);
    if (temp) localWeatherEl.textContent = `${temp} Clear`;
  } catch (err) {
    localCityEl.textContent = 'Local';
    localWeatherEl.textContent = '26°C Clear';
  }
}

// Modal: Add Worldwide Clock
const modalClock = document.getElementById('modal-clock');
const btnOpenAddClock = document.getElementById('btn-open-add-clock');
const btnCloseClockModal = document.getElementById('btn-close-clock-modal');
const popularHubsGrid = document.getElementById('popular-hubs-grid');
const inputCitySearch = document.getElementById('input-city-search');
const searchResultsList = document.getElementById('search-results-list');

function renderPopularHubs() {
  popularHubsGrid.innerHTML = '';
  POPULAR_HUBS.forEach((hub) => {
    const btn = document.createElement('button');
    btn.className = 'btn-hub';
    btn.textContent = `+ ${hub.name}`;
    btn.addEventListener('click', async () => {
      await addForeignClock(hub.name, hub.tz, hub.lat, hub.lon);
      modalClock.classList.add('hidden');
    });
    popularHubsGrid.appendChild(btn);
  });
}

async function addForeignClock(name, tz, lat, lon) {
  if (foreignClocks.length >= 4) {
    alert('Maximum 4 world clocks can be added.');
    return;
  }
  const temp = lat && lon ? await fetchWeather(lat, lon) : '';
  const newClock = {
    id: Date.now().toString(),
    name: name,
    tz: tz,
    lat: lat,
    lon: lon,
    temp: temp
  };
  foreignClocks.push(newClock);
  saveForeignClocks();
}

btnOpenAddClock.addEventListener('click', () => {
  modalClock.classList.remove('hidden');
  renderPopularHubs();
  searchResultsList.innerHTML = '';
  inputCitySearch.value = '';
});

btnCloseClockModal.addEventListener('click', () => {
  modalClock.classList.add('hidden');
});

modalClock.addEventListener('click', (e) => {
  if (e.target === modalClock) modalClock.classList.add('hidden');
});

// Real-time City Search using Open-Meteo Geocoding
let searchTimeout = null;
inputCitySearch.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  const q = inputCitySearch.value.trim();
  if (q.length < 2) {
    searchResultsList.innerHTML = '';
    return;
  }
  searchTimeout = setTimeout(async () => {
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=5&language=en&format=json`);
      const data = await res.json();
      searchResultsList.innerHTML = '';
      if (data && data.results) {
        data.results.forEach((city) => {
          const item = document.createElement('div');
          item.className = 'search-result-item';
          item.innerHTML = `<span><strong>${city.name}</strong>, ${city.country || ''}</span> <span>${city.timezone || 'UTC'}</span>`;
          item.addEventListener('click', async () => {
            await addForeignClock(city.name, city.timezone || 'UTC', city.latitude, city.longitude);
            modalClock.classList.add('hidden');
          });
          searchResultsList.appendChild(item);
        });
      }
    } catch (e) {
      console.log('Search error:', e);
    }
  }, 300);
});

// Initialize Clocks
renderForeignClocks();
initLocalInfo();
setInterval(updateClocks, 1000);
updateClocks();


// --- 6. POMODORO FOCUS TIMER ---

const PRESETS = {
  work:       { label: 'Work Session', minutes: 25, seconds: 0 },
  study:      { label: 'Study Session', minutes: 45, seconds: 0 },
  read:       { label: 'Reading Session', minutes: 30, seconds: 0 },
  code:       { label: 'Coding Session', minutes: 50, seconds: 0 },
  shortBreak: { label: 'Short Break', minutes: 5, seconds: 0 },
  longBreak:  { label: 'Long Break', minutes: 15, seconds: 0 },
  custom:     { label: 'Custom Timer', minutes: 25, seconds: 0 }
};

let currentPresetKey = 'work';
let totalDuration = 25 * 60;
let secondsRemaining = 25 * 60;
let timerRunning = false;
let timerInterval = null;
let soundEnabled = true;

const timerDisplay = document.getElementById('timer-display');
const timerStatusLabel = document.getElementById('timer-status-label');
const btnTimerStart = document.getElementById('btn-timer-start');
const btnTimerReset = document.getElementById('btn-timer-reset');
const btnSoundToggle = document.getElementById('btn-sound-toggle');
const presetButtons = document.querySelectorAll('.btn-preset');
const customTimeRow = document.getElementById('custom-time-row');
const customHoursInput = document.getElementById('custom-hours');
const customMinutesInput = document.getElementById('custom-minutes');
const customSecondsInput = document.getElementById('custom-seconds');
const btnApplyCustom = document.getElementById('btn-apply-custom');

// Format seconds into MM:SS or HH:MM:SS
function formatTime(totalSecs) {
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;

  if (h > 0) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(secondsRemaining);
  document.title = timerRunning 
    ? `(${formatTime(secondsRemaining)}) Timora Focus` 
    : 'Timora - Digital Worldwide Clock with Pomodoro';
}

// Play pleasant Web Audio bell chime on timer completion
function playTimerChime() {
  if (!soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5 note

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch (e) {
    // audio context blocked or unsupported
  }
}

function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  btnTimerStart.textContent = 'Pause';
  btnTimerStart.classList.add('btn-secondary');
  btnTimerStart.classList.remove('btn-primary');

  timerInterval = setInterval(() => {
    if (secondsRemaining > 0) {
      secondsRemaining--;
      updateTimerDisplay();
    } else {
      pauseTimer();
      timerStatusLabel.textContent = 'Session Complete! 🎉';
      playTimerChime();
    }
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  btnTimerStart.textContent = 'Start';
  btnTimerStart.classList.add('btn-primary');
  btnTimerStart.classList.remove('btn-secondary');
  updateTimerDisplay();
}

function resetTimer() {
  pauseTimer();
  secondsRemaining = totalDuration;
  timerStatusLabel.textContent = PRESETS[currentPresetKey].label;
  updateTimerDisplay();
}

btnTimerStart.addEventListener('click', () => {
  if (timerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

btnTimerReset.addEventListener('click', resetTimer);

btnSoundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  btnSoundToggle.textContent = soundEnabled ? '🔔 Sound: ON' : '🔕 Sound: OFF';
});

// Preset Selection
presetButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    presetButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    currentPresetKey = btn.dataset.preset;

    if (currentPresetKey === 'custom') {
      customTimeRow.classList.remove('hidden');
    } else {
      customTimeRow.classList.add('hidden');
      const mins = parseInt(btn.dataset.min, 10);
      const secs = parseInt(btn.dataset.sec, 10);
      totalDuration = mins * 60 + secs;
      secondsRemaining = totalDuration;
      timerStatusLabel.textContent = PRESETS[currentPresetKey].label;
      resetTimer();
    }
  });
});

btnApplyCustom.addEventListener('click', () => {
  const h = parseInt(customHoursInput.value, 10) || 0;
  const m = parseInt(customMinutesInput.value, 10) || 0;
  const s = parseInt(customSecondsInput.value, 10) || 0;
  const total = h * 3600 + m * 60 + s;

  if (total > 0) {
    totalDuration = total;
    secondsRemaining = total;
    timerStatusLabel.textContent = 'Custom Timer';
    resetTimer();
  }
});

updateTimerDisplay();


// --- 7. TASKS BOARD ---

let tasks = JSON.parse(localStorage.getItem('timora_tasks')) || [];

const taskListEl = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const btnToggleTaskForm = document.getElementById('btn-toggle-task-form');
const btnCancelTask = document.getElementById('btn-cancel-task');
const tasksBadge = document.getElementById('tasks-badge');
const noTasksMsg = document.getElementById('no-tasks-msg');

function saveTasks() {
  localStorage.setItem('timora_tasks', JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskListEl.innerHTML = '';
  const completedCount = tasks.filter((t) => t.completed).length;
  tasksBadge.textContent = `${completedCount} / ${tasks.length}`;

  if (tasks.length === 0) {
    noTasksMsg.style.display = 'block';
  } else {
    noTasksMsg.style.display = 'none';
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    const left = document.createElement('div');
    left.className = 'task-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
    });

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    left.appendChild(checkbox);
    left.appendChild(textSpan);

    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn-delete-task';
    btnDelete.innerHTML = '&times;';
    btnDelete.title = 'Delete task';
    btnDelete.addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
    });

    li.appendChild(left);
    li.appendChild(btnDelete);
    taskListEl.appendChild(li);
  });
}

btnToggleTaskForm.addEventListener('click', () => {
  taskForm.classList.toggle('hidden');
  if (!taskForm.classList.contains('hidden')) {
    taskInput.focus();
  }
});

btnCancelTask.addEventListener('click', () => {
  taskForm.classList.add('hidden');
  taskInput.value = '';
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({
      id: Date.now().toString(),
      text: text,
      completed: false
    });
    saveTasks();
    taskInput.value = '';
    taskForm.classList.add('hidden');
  }
});

renderTasks();


// --- 8. YOUTUBE STUDY PLAYER ---

const ytIframe = document.getElementById('yt-iframe');
const ytForm = document.getElementById('yt-form');
const ytUrlInput = document.getElementById('yt-url-input');
const btnToggleYtInput = document.getElementById('btn-toggle-yt-input');
const ytPresetButtons = document.querySelectorAll('.btn-yt-preset');

function setYouTubeVideo(videoId) {
  if (!videoId) return;
  ytIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
}

function extractYouTubeId(url) {
  if (!url) return null;
  const clean = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) return clean;
  const match = clean.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/))([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

btnToggleYtInput.addEventListener('click', () => {
  ytForm.classList.toggle('hidden');
  if (!ytForm.classList.contains('hidden')) ytUrlInput.focus();
});

ytForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = extractYouTubeId(ytUrlInput.value);
  if (id) {
    setYouTubeVideo(id);
    ytPresetButtons.forEach((b) => b.classList.remove('active'));
    ytForm.classList.add('hidden');
    ytUrlInput.value = '';
  } else {
    alert('Please enter a valid YouTube video link or 11-character video ID.');
  }
});

ytPresetButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    ytPresetButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    setYouTubeVideo(btn.dataset.vid);
  });
});


// --- 9. DAILY MOTIVATIONAL QUOTE BAR ---

const quoteTextEl = document.getElementById('quote-text');
const quoteAuthorEl = document.getElementById('quote-author');
const btnRefreshQuote = document.getElementById('btn-refresh-quote');

async function fetchQuote() {
  try {
    const res = await fetch('https://dummyjson.com/quotes/random');
    if (res.ok) {
      const data = await res.json();
      if (data && data.quote) {
        quoteTextEl.textContent = `“${data.quote}”`;
        quoteAuthorEl.textContent = `— ${data.author || 'Anonymous'}`;
        return;
      }
    }
  } catch (e) {
    // API network error, use backup quote
  }

  // Fallback quote from local array
  const random = BACKUP_QUOTES[Math.floor(Math.random() * BACKUP_QUOTES.length)];
  quoteTextEl.textContent = `“${random.text}”`;
  quoteAuthorEl.textContent = `— ${random.author}`;
}

// Initial quote is by the inventor of Pomodoro: Francesco Cirillo
quoteTextEl.textContent = `“The Pomodoro Technique was created to work with time, not against it.”`;
quoteAuthorEl.textContent = `— Francesco Cirillo`;

// Clicking refresh button shuffles with new quotes from API or curated list
btnRefreshQuote.addEventListener('click', fetchQuote);
