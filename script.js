const savedTheme = localStorage.getItem('myTheme') || 'theme-mint';
document.body.classList.add(savedTheme);

const themeBtn = document.getElementById('theme-btn');
const themeMenu = document.getElementById('theme-menu');

if (themeBtn && themeMenu) {
    const themeLinks = document.querySelectorAll('.dropdown-content a');
    const theme = Array.from(themeLinks).map(link => link.getAttribute('data-theme'));

    themeLinks.forEach(link => {
        if (link.getAttribute('data-theme') === savedTheme) {
            link.classList.add('active-theme');
        }
    });

    themeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        themeMenu.classList.toggle('show');
    });

    themeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedTheme = link.getAttribute('data-theme');

            document.body.classList.remove(...theme);
            document.body.classList.add(selectedTheme);
            localStorage.setItem('myTheme', selectedTheme);
            themeMenu.classList.remove('show');

            themeLinks.forEach(l => l.classList.remove('active-theme'));
            link.classList.add('active-theme');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-dropdown')) {
            themeMenu.classList.remove('show');
        }
    });
}

const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}