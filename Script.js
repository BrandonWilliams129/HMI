// Utility function to hide all screens
function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
}

// Function to show a specific screen
function showScreen(screenId) {
    hideAllScreens();
    const screen = document.getElementById(screenId);
    screen.classList.add('active');
    document.getElementById('time').style.backgroundColor = 'yellow'; // Visual change on the header
}

// Helper function to handle both click and touch events consistently
function addClickTouchEvent(element, handlerFunction) {
    element.addEventListener('click', handlerFunction);
    element.addEventListener('touchstart', handlerFunction);
}

// Event listeners for navigation buttons using the new helper function
addClickTouchEvent(document.getElementById('showProduction'), function() {
    showScreen('productionScreen');
});

addClickTouchEvent(document.getElementById('showBotStatus'), function() {
    showScreen('botStatusScreen');
});

// This function updates the 'time' element in the HTML with the current time
function updateTime() {
    const currentTime = new Date().toLocaleTimeString(); // Get current local time as a string
    document.getElementById('time').textContent = currentTime; // Set the time in the HTML
    document.getElementById('time').style.backgroundColor = ''; // Reset background color on time update
}

// This function updates the next cap change required
function nextCapChange() {
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('nextCapChange').textContent = currentTime;
    document.getElementById('nextCapChange').style.backgroundColor = ''; // Reset background color on time update
}

// Call updateTime at script load and every second thereafter
updateTime();
setInterval(updateTime, 1000); // Update the time every 1000 milliseconds (1 second)

const targetTime = 43; // Target time in seconds
let currentCycleTime = 0; // Start at 0

function UpdateCurrentCycleTime() {
    let percentage = (currentCycleTime / targetTime) * 100;
    percentage = Math.min(100, percentage); // Ensure the percentage does not exceed 100%
    document.getElementById('currentCycleTime').textContent = currentCycleTime;
    document.getElementById('cycle-progress-bar').style.width = `${percentage}%`;

    currentCycleTime++; // Increase currentCycleTime
    
    if (currentCycleTime >= targetTime) {
        currentCycleTime = 0; // Reset currentCycleTime if it reaches or exceeds the targetTime
    }
}

setInterval(UpdateCurrentCycleTime, 1000); // Initialize the timer to update the cycle time every second

showScreen('productionScreen'); // Initialize with the production screen active

document.querySelectorAll('.interactive-card').forEach(card => {
    card.addEventListener('click', function() {
        alert('Clicked on: ' + this.id); // This can be replaced with a function to open a detailed view or perform other actions
    });
});
