// Theme management functionality
function applyTheme(theme) {
    const lightThemeStyle = document.getElementById('hljs-light-theme');
    const darkThemeStyle = document.getElementById('hljs-dark-theme');

    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        if (darkThemeStyle) darkThemeStyle.disabled = false;
        if (lightThemeStyle) lightThemeStyle.disabled = true;
    } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        if (darkThemeStyle) darkThemeStyle.disabled = true;
        if (lightThemeStyle) lightThemeStyle.disabled = false;
    }
    
    // Update theme toggle button icons
    updateThemeToggleIcon(theme);
    
    // Force re-render of Lucide icons after theme change
    setTimeout(() => {
        if (window.lucide) {
            lucide.createIcons();
        }
    }, 100);
}

function updateThemeToggleIcon(theme) {
    const sunIcon = document.querySelector('#theme-toggle [data-lucide="sun"]');
    const moonIcon = document.querySelector('#theme-toggle [data-lucide="moon"]');
    
    if (sunIcon && moonIcon) {
        if (theme === 'dark') {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    
    console.log(`Theme switched to: ${newTheme}`); // Debug log
    
    // Add a small visual feedback
    const button = document.getElementById('theme-toggle');
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
}
