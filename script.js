// Hämta element
const menuButton = document.querySelector(".menu-toggle-btn");
const navigationMenu = document.querySelector("nav");
const themeToggleButton = document.getElementById("theme-toggle");

// Funktion för att visa/dölja menyn
const menuVisibility = function () {
    navigationMenu.classList.toggle("hidden");
}

// Funktion för att byta tema (dark mode)
const toggleTheme = function () {
    document.body.classList.toggle("dark-mode");

    // Byt ikon mellan måne och sol
    if (document.body.classList.contains("dark-mode")) {
        themeToggleButton.classList.replace("fa-moon", "fa-sun"); // Byt till sol-ikon 
        localStorage.setItem("theme", "dark"); // Spara dark mode i localStorage
    } else {
        themeToggleButton.classList.replace("fa-sun", "fa-moon"); // Byt till måne-ikon 
        localStorage.setItem("theme", "light"); // Spara light mode i localStorage
    }
}

// Vid sidladdning, kontrollera om dark mode är aktivt och tillämpa det
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggleButton.classList.replace("fa-moon", "fa-sun"); // Om dark mode, sätt ikon till sol
} else {
    document.body.classList.add("light-mode");
    themeToggleButton.classList.replace("fa-sun", "fa-moon"); // Om light mode, sätt ikon till måne
}

// Lägg till event-lyssnare
menuButton.addEventListener("click", menuVisibility);
themeToggleButton.addEventListener("click", toggleTheme);
