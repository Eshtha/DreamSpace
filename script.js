let timer;
let timeLeft = 25 * 60;
let isRunning = false;

function setMood(emoji, label) {
    document.getElementById('vibeStatus').textContent = `Vibe: ${label} ${emoji}`;
    confetti({ 
        particleCount: 40, 
        spread: 60,
        colors: ['#FFB6C1', '#DCD0FF', '#9370DB'] 
    });
}

function addTask() {
    const input = document.getElementById('taskInput');
    const list = document.getElementById('taskList');
    if (!input.value.trim()) return;
    
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" onchange="toggleTask(this)" style="width:20px;height:20px;accent-color:#9370DB">
        <span>${input.value}</span>
    `;
    
    list.appendChild(li);
    input.value = '';
    list.scrollTop = list.scrollHeight;
}

function toggleTask(checkbox) {
    checkbox.nextElementSibling.classList.toggle('completed');
    if (document.querySelectorAll('input:checked').length === document.querySelectorAll('li').length && document.querySelectorAll('li').length > 0) {
        confetti({ 
            particleCount: 150, 
            spread: 70, 
            origin: { y: 0.6 },
            colors: ['#FFB6C1', '#9370DB']
        });
    }
}

// New Theme Toggle Function
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.querySelector('.theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        btn.textContent = '☀️';
    } else {
        btn.textContent = '🌙';
    }
}

function updateTimerDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById('timer').textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
}

function setCustomTimer() {
    const val = document.getElementById('customMin').value;
    if (val > 0) {
        clearInterval(timer);
        isRunning = false;
        timeLeft = val * 60;
        updateTimerDisplay();
    }
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            document.getElementById('timerAudio').play();
            document.getElementById('popupOverlay').classList.remove('hidden');
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

function toggleJournal() {
    const content = document.getElementById('journalContent');
    const btn = document.getElementById('lockBtn');
    if (content.style.display === 'block') {
        content.style.display = 'none';
        btn.innerHTML = '🔓 Unlock';
    } else {
        if (prompt("Secret code:") === "promise") {
            content.style.display = 'block';
            btn.innerHTML = '🔒 Lock';
        }
    }
}

function closePopup() {
    document.getElementById('popupOverlay').classList.add('hidden');
    document.getElementById('timerAudio').pause();
}
