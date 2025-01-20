// DOMContentLoaded to ensure the script runs after the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close Mobile Navigation when a link is clicked
    document.querySelectorAll('.mobile-nav__links li a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[data-scroll]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Resume Modal Functionality
    const resumeToggles = document.querySelectorAll('a[data-modal]');
    const resumeModal = document.getElementById('resume-modal');
    const closeModals = document.querySelectorAll('.modal__close, .modal__overlay');

    resumeToggles.forEach(toggle => {
        toggle.addEventListener('click', openResumeModal);
    });

    closeModals.forEach(close => {
        close.addEventListener('click', closeResumeModal);
    });

    // Close Modal on Esc Key Press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal.style.display === 'flex') {
            closeResumeModal();
        }
    });

    // Function to open the resume modal
    function openResumeModal(e) {
        e.preventDefault();
        resumeModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Disable scrolling
    }

    // Function to close the resume modal
    function closeResumeModal() {
        resumeModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        updateThemeIcon();
        saveThemePreference();
        updateChartColors(); // Update chart colors when theme changes
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.add('light-mode');
    }

    // Update theme icon based on current theme
    function updateThemeIcon() {
        const themeIcon = document.querySelector('.header__toggle i');
        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Save theme preference in localStorage
    function saveThemePreference() {
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

   // Initialize Charts
let chart1, chart2, chart3;

function initializeCharts() {
    // Chart 1 - Bar Chart (Monthly Sales)
    chart1 = new Chart(document.getElementById('chart1'), {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Monthly Sales',
                data: [50, 70, 80, 90, 120, 150],
                backgroundColor: body.classList.contains('dark-mode')
                    ? ['#FFD166', '#FF6F61', '#88B04B', '#6B5B95', '#92A8D1', '#955251'] // Dark mode colors (matching text colors)
                    : ['#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0'], // Light mode colors
                borderColor: body.classList.contains('dark-mode') ? '#1E2130' : '#373B5A',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Sales',
                    font: { size: 16 }
                }
            }
        }
    });

    // Chart 2 - Line Chart (Weekly Visitors)
    chart2 = new Chart(document.getElementById('chart2'), {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'Weekly Visitors',
                data: [200, 450, 400, 500, 600, 700, 750],
                fill: false,
                borderColor: body.classList.contains('dark-mode') ? '#FFD166' : '#2196F3', // Dark mode: Accent color, Light mode: Blue
                backgroundColor: body.classList.contains('dark-mode') ? '#1E2130' : '#F2F2F2',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Weekly Visitors',
                    font: { size: 16 }
                }
            }
        }
    });

    // Chart 3 - Pie Chart (Skill Proficiency)
    chart3 = new Chart(document.getElementById('chart3'), {
        type: 'pie',
        data: {
            labels: ['Python', 'Excel', 'SQL', 'Others'],
            datasets: [{
                label: 'Skill Proficiency',
                data: [40, 25, 30, 5],
                backgroundColor: body.classList.contains('dark-mode')
                    ? ['#FFD166', '#FF6F61', '#88B04B', '#6B5B95'] // Dark mode colors (matching text colors)
                    : ['#64B5F6', '#42A5F5', '#2196F3', '#1E88E5'], // Light mode colors
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Skill Proficiency',
                    font: { size: 16 }
                }
            }
        }
    });
}

// Update chart colors when theme changes
function updateChartColors() {
    if (chart1 && chart2 && chart3) {
        // Update Chart 1 (Bar Chart)
        chart1.data.datasets[0].backgroundColor = body.classList.contains('dark-mode')
            ? ['#FFD166', '#FF6F61', '#88B04B', '#6B5B95', '#92A8D1', '#955251'] // Dark mode colors (matching text colors)
            : ['#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0']; // Light mode colors
        chart1.update();

        // Update Chart 2 (Line Chart)
        chart2.data.datasets[0].borderColor = body.classList.contains('dark-mode') ? '#FFD166' : '#2196F3'; // Dark mode: Accent color, Light mode: Blue
        chart2.update();

        // Update Chart 3 (Pie Chart)
        chart3.data.datasets[0].backgroundColor = body.classList.contains('dark-mode')
            ? ['#FFD166', '#FF6F61', '#88B04B', '#6B5B95'] // Dark mode colors (matching text colors)
            : ['#64B5F6', '#42A5F5', '#2196F3', '#1E88E5']; // Light mode colors
        chart3.update();
    }
}

// Initialize charts on page load
initializeCharts();
});