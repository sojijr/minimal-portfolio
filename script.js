const themeButton = document.getElementById('themeButton');
const body = document.body;

themeButton.addEventListener('click', () => {
    // check if the browser supports View Transitions API
    if (document.startViewTransition) {
        document.startViewTransition(() => {
            toggleTheme();
        });
    } else {
        // fallback for older browsers
        toggleTheme();
    }
});

function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
}
