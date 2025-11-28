const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const coffeeStatus = document.getElementById('coffee-status');
const progressBar = document.getElementById('progress-bar');
const modeButton = document.getElementById('mode-button');

let timer = null;
let totalSeconds = 0;
const TEMPS_CAFE = 60; 

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function updateChrono() {
    totalSeconds++;

    const minutes = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;

    let pourcentage = (totalSeconds / TEMPS_CAFE) * 100;
    if(pourcentage > 100) pourcentage = 100;

    progressBar.style.width = pourcentage + '%';

    minutesSpan.innerText = pad(minutes);
    secondsSpan.innerText = pad(sec);

    if (pourcentage >= 100) {
        clearInterval(timer);
        timer = null;
        minutesSpan.innerText = pad(Math.floor(TEMPS_CAFE / 60));
        secondsSpan.innerText = pad(TEMPS_CAFE % 60);
        progressBar.style.width = '100%';
        coffeeStatus.innerText = 'Café prêt';
    }
}

function resetChrono() {
    clearInterval(timer);
    timer = null; 
    totalSeconds = 0;
    minutesSpan.innerText = '00';
    secondsSpan.innerText = '00';
    progressBar.style.width = '0%';
    coffeeStatus.innerText = 'Préparation du Café...';
}

stopButton.addEventListener('click', resetChrono);

startButton.addEventListener('click', () => { 
    if(timer) return;

    coffeeStatus.innerText = "Préparation du Café...";
    timer = setInterval(updateChrono, 1000);
});

if (modeButton) {
    const THEME_KEY = 'chrono-coffee-theme';

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            modeButton.innerText = '☀️';
            modeButton.setAttribute('aria-pressed', 'true');
            localStorage.setItem(THEME_KEY, 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            modeButton.innerText = '🌙';
            modeButton.setAttribute('aria-pressed', 'false');
            localStorage.setItem(THEME_KEY, 'light');
        }
    }

function initTheme(){
    const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }
    }


    modeButton.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-mode');
        applyTheme(isDark ? 'light' : 'dark');
    });

    initTheme();
}





