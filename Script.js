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

const targetTime = 5; // Target time in seconds
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

function UpdateCurrentCycleTime() {
    let percentage = (currentCycleTime / targetTime) * 100;
    percentage = Math.min(100, percentage);
    document.getElementById('currentCycleTime').textContent = currentCycleTime;
    document.getElementById('cycle-progress-bar').style.width = `${percentage}%`;

    currentCycleTime++;

    if (currentCycleTime >= targetTime) {
        currentCycleTime = 0;
        incrementBinCount(); // Call a function to increment the bin count
    }
}

function incrementBinCount() {
    let binCountElement = document.getElementById('binCount');
    let binProgressBar = document.getElementById('bin-progress-bar');
    let currentBinCount = parseInt(binCountElement.textContent);
    let targetBinCount = 4; // Adjust this to your actual target bin count

    currentBinCount += 1; // Increment the bin count
    binCountElement.textContent = currentBinCount; // Update the text content

    // Calculate the new width of the bin progress bar
    let newWidth = (currentBinCount / targetBinCount) * 100;
    newWidth = Math.min(newWidth, 100); // Ensure the width doesn't exceed 100%
    binProgressBar.style.width = `${newWidth}%`; // Update the progress bar width

    if (currentBinCount == targetBinCount +1) {
        binCountElement.textContent = 0; // Reset the bin count if it reaches or exceeds the target
        binProgressBar.style.width = `${0}%`; // Reset the progress bar
    }
}

function drawFirstShiftGraph() {
    const ctx = document.getElementById('firstShiftGraph').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Adjust gradient direction and area based on your specific needs
    gradient.addColorStop(0.6, '#0088ff'); // End color
    gradient.addColorStop(0.1, '#00ff88'); // Start color

    const firstShiftGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm'],
            datasets: [{
                label: 'Parts Produced',
                data: [76, 82, 69, 81, 54, 23, 71, ],
                borderColor: gradient,
                borderWidth: 3,
                fill: false // Set to false if you only want to color the line
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FFFFFF', // Change to white or another high-contrast color
                        font: {
                            size: 16 // Optional: Change font size for better readability
                        }
                    },
                    grid: {
                        borderColor: '#648380', // Green border for the grid
                        color: '#648380' // Green grid lines
                    }
                },
                x: {
                    ticks: {
                        color: '#FFFFFF', // Change to white or another high-contrast color
                        font: {
                            size: 16 // Optional: Change font size for better readability
                        }
                    },
                    grid: {
                        borderColor: '#648380', // Green border for the grid
                        color: '#648380' // Green grid lines
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function drawSecondShiftGraph() {
    const ctx = document.getElementById('secondShiftGraph').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Adjust gradient direction and area based on your specific needs
    gradient.addColorStop(0.6, '#0088ff'); // End color
    gradient.addColorStop(0.1, '#00ff88'); // Start color

    const secondShiftGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
            datasets: [{
                label: 'Parts Produced',
                data: [86, 82, 71, 81, 66, 80, 88, 75],
                borderColor: gradient,
                borderWidth: 3,
                fill: false // Set to false if you only want to color the line
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FFFFFF', // Change to white or another high-contrast color
                        font: {
                            size: 16 // Optional: Change font size for better readability
                        }
                    },
                    grid: {
                        borderColor: '#648380', // Green border for the grid
                        color: '#648380' // Green grid lines
                    }
                },
                x: {
                    ticks: {
                        color: '#FFFFFF', // Change to white or another high-contrast color
                        font: {
                            size: 16 // Optional: Change font size for better readability
                        }
                    },
                    grid: {
                        borderColor: '#648380', // Green border for the grid
                        color: '#648380' // Green grid lines
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function drawThirdShiftGraph() {
    const ctx = document.getElementById('thirdShiftGraph').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Adjust gradient direction and area based on your specific needs
    gradient.addColorStop(0.6, '#0088ff'); // End color
    gradient.addColorStop(0.1, '#00ff88'); // Start color

    const thirdShiftGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10pm', '11pm', '12am', '1am', '2am', '3am', '4am', '5am'],
            datasets: [{
                label: 'Parts Produced',
                data: [69, 80, 70, 81, 33, 23, 5, 60],
                borderColor: gradient,
                borderWidth: 3,
                fill: false // Set to false if you only want to color the line
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FFFFFF', // Change to white or another high-contrast color
                        font: {
                            size: 16 // Optional: Change font size for better readability
                        }
                    },
                    grid: {
                        borderColor: '#648380', // Green border for the grid
                        color: '#648380' // Green grid lines
                    }
                },
                x: {
                    ticks: {
                        color: '#FFFFFF', // Change to white or another high-contrast color
                        font: {
                            size: 16 // Optional: Change font size for better readability
                        }
                    },
                    grid: {
                        borderColor: '#648380', // Green border for the grid
                        color: '#648380' // Green grid lines
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


// Call this function on page load or when the production screen is shown

document.addEventListener('DOMContentLoaded', function() {
    drawFirstShiftGraph();
    drawSecondShiftGraph();
    drawThirdShiftGraph(); // Draw all graphs after the DOM is fully loaded
});