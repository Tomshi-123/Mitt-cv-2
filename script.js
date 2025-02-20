// Hämta element
const menuButton = document.querySelector(".menu-toggle-btn");
const navigationMenu = document.querySelector("nav");
const themeToggleButton = document.getElementById("theme-toggle");
const playButton = document.getElementById("music");

// Hämta aktuell timme
let hour = new Date().getHours();
let shouldBeDark = hour >= 19 || hour < 7;

// Hämta användarens valda tema från localStorage
let savedTheme = localStorage.getItem("theme");

// Om användaren har valt ett tema, använd det
if (savedTheme) {
    document.body.classList.add(savedTheme === "dark" ? "dark-mode" : "light-mode");
    themeToggleButton.classList.replace(
        savedTheme === "dark" ? "fa-sun" : "fa-moon",
        savedTheme === "dark" ? "fa-moon" : "fa-sun"
    );
} else {
    // Om inget tema är valt, använd tidslogiken
    if (shouldBeDark) {
        document.body.classList.add("dark-mode");
        themeToggleButton.classList.replace("fa-sun", "fa-moon");
    } else {
        document.body.classList.add("light-mode");
        themeToggleButton.classList.replace("fa-moon", "fa-sun");
    }
}

// Funktion för att visa/dölja menyn
const menuVisibility = function () {
    navigationMenu.classList.toggle("hidden");
};

// Funktion för att byta tema (dark mode)
const toggleTheme = function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggleButton.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
    } else {
        themeToggleButton.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
    }
};

// Musikspelare
let audio = new Audio("music/deep-future-garage-royalty-free-music-163081.mp3");
audio.loop = true;

playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        sessionStorage.setItem("isPlaying", "true");
    } else {
        audio.pause();
        sessionStorage.setItem("isPlaying", "false");
    }
});

// Hämta och visa JSON data
document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            // Utbildning
            let educationHTML = "";
            data.education.forEach(edu => {
                educationHTML += `<li><strong>${edu.school}</strong> – ${edu.program} (${edu.year})</li>`;
            });
            document.querySelector(".education ul").innerHTML = educationHTML;

            // Arbetslivserfarenhet
            let experienceHTML = "";
            data.experience.forEach(job => {
                experienceHTML += `
                <li>
                    <strong>${job.workplace}</strong> – ${job.position} (${job.years})
                </li>
                `;
            });
            document.querySelector(".experience ul").innerHTML = experienceHTML;
        })
        .catch(error => console.error("Error loading JSON data:", error));
});

// Lägg till event-lyssnare
menuButton.addEventListener("click", menuVisibility);
themeToggleButton.addEventListener("click", toggleTheme);
