document.addEventListener('DOMContentLoaded', () => {
    let isRunning = false;
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;
    let canStart = true;

    function formatTime(time) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    }

    function updateDisplay() {
        const currentTime = Date.now() - startTime + elapsedTime;
        document.getElementById('display').textContent = formatTime(currentTime);
    }

    function startTimer() {
        if (!isRunning & canStart) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateDisplay, 10);
            let display = document.getElementById("display");
            display.style.opacity = "90%";
            isRunning = true;
            canStart = false;
        } else {
            // do nothing
        }
    }

    function stopTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            elapsedTime = Date.now() - startTime;
            isRunning = false;
        }
        else {
            // do nothing
        }
    }

    // Clears the timer and resets variables
    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        canStart = true; // Allow timer to start again
        document.getElementById('display').textContent = '00:00:00';
        document.getElementById("display").style.opacity = "100%";
    }

    // Event listener for when key gets released (start)
    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            startTimer();
        }
    });

    // Event listener for when key gets pressed (stop)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            stopTimer();
        }
    });

    // Event listener for when "r" key gets pressed (reset)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'KeyR') {
            e.preventDefault();
            resetTimer();
        }
    });

    // Reset display on page load
    document.getElementById('display').textContent = '00:00:00';
});