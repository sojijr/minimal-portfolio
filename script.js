const snowButton = document.getElementById('snowButton');
const snowflakeContainer = document.getElementById('snowflakeContainer');
const body = document.body;

let isSnowing = false;
let isDarkMode = true;

snowButton.addEventListener('click', () => {
    if (!isSnowing) {
        isSnowing = true;
        fillScreenWithSnow();
    }
});

function fillScreenWithSnow() {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    let currentFillLevel = screenHeight; // start from bottom
    const fillSpeed = 15; // how fast the level rises
    const snowflakesPerWave = 20;
    
    // create the "fill" overlay that rises from bottom
    const fillOverlay = document.createElement('div');
    fillOverlay.className = 'snow-fill-overlay';
    fillOverlay.style.height = '0px';
    snowflakeContainer.appendChild(fillOverlay);
    
    // continuously create falling snowflakes
    const snowInterval = setInterval(() => {
        for (let i = 0; i < snowflakesPerWave; i++) {
            createFallingSnowflake(currentFillLevel);
        }
    }, 50);
    
    // rise the fill level
    const fillInterval = setInterval(() => {
        currentFillLevel -= fillSpeed;
        const fillHeight = screenHeight - currentFillLevel;
        fillOverlay.style.height = fillHeight + 'px';
        
        // add accumulated snowflakes on top of the fill
        for (let i = 0; i < 5; i++) {
            createAccumulatedSnowflake(currentFillLevel);
        }
        
        // when screen is filled
        if (currentFillLevel <= 0) {
            clearInterval(fillInterval);
            clearInterval(snowInterval);
            
            // flash and switch mode
            setTimeout(() => {
                // flash effect
                const flash = document.createElement('div');
                flash.className = 'screen-flash';
                document.body.appendChild(flash);
                
                // clear everything
                snowflakeContainer.innerHTML = '';
                
                // toggle mode
                if (isDarkMode) {
                    body.classList.remove('dark-mode');
                    body.classList.add('light-mode');
                } else {
                    body.classList.remove('light-mode');
                    body.classList.add('dark-mode');
                }
                isDarkMode = !isDarkMode;
                
                setTimeout(() => {
                    flash.remove();
                    isSnowing = false;
                }, 400);
            }, 300);
        }
    }, 50);
}

function createFallingSnowflake(stopAt) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake falling';
    snowflake.innerHTML = '❄';

    const startX = Math.random() * window.innerWidth;
    const duration = 0.8 + Math.random() * 0.7;
    const sway = (Math.random() - 0.5) * 50;

    snowflake.style.left = startX + 'px';
    snowflake.style.setProperty('--tx', sway + 'px');
    snowflake.style.setProperty('--stop-at', stopAt + 'px');
    snowflake.style.animationDuration = duration + 's';
    snowflake.style.fontSize = (1 + Math.random() * 1.2) + 'em';
    snowflake.style.opacity = 0.7 + Math.random() * 0.3;

    snowflakeContainer.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

function createAccumulatedSnowflake(yPosition) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake accumulated';
    snowflake.innerHTML = '❄';

    const x = Math.random() * window.innerWidth;
    const y = yPosition + Math.random() * 30;
    
    snowflake.style.left = x + 'px';
    snowflake.style.top = y + 'px';
    snowflake.style.fontSize = (0.8 + Math.random() * 1) + 'em';
    snowflake.style.opacity = 0.8 + Math.random() * 0.2;

    snowflakeContainer.appendChild(snowflake);
}
