// Hämta element
const menuButton = document.querySelector(".menu-toggle-btn");
const navigationMenu = document.querySelector("nav");
const themeToggleButton = document.getElementById("theme-toggle");
const playButton = document.getElementById("music")

// Funktion för att visa/dölja menyn
const menuVisibility = function () {
    navigationMenu.classList.toggle("hidden");
}

// Funktion för att byta tema (dark mode)
const toggleTheme = function () {
    document.body.classList.toggle("dark-mode");

    // Byt ikon mellan måne och sol
    if (document.body.classList.contains("dark-mode")) {
        themeToggleButton.classList.replace("fa-sun", "fa-moon"); // Byt till sol-ikon 
        localStorage.setItem("theme", "dark"); // Spara dark mode i localStorage
    } else {
        themeToggleButton.classList.replace("fa-moon", "fa-sun"); // Byt till måne-ikon 
        localStorage.setItem("theme", "light"); // Spara light mode i localStorage
    }
}

// Vid sidladdning, kontrollera om dark mode är aktivt och tillämpa det
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggleButton.classList.replace("fa-sun", "fa-moon"); // Om dark mode, sätt ikon till sol
} else {
    document.body.classList.add("light-mode");
    themeToggleButton.classList.replace("fa-moon", "fa-sun"); // Om light mode, sätt ikon till måne
}

let hour = (new Date).getHours(); // Hämta aktuell timme
if (hour >= 19 || hour < 7) { 
    document.body.classList.add("dark-mode");
    themeToggleButton.classList.replace("fa-sun", "fa-moon");
}


let audio = new Audio("music/deep-future-garage-royalty-free-music-163081.mp3");
audio.loop = true;



// Eventlyssnare för att spela/pausa musik
playButton.addEventListener("click",() => {
    if (audio.paused){
        audio.play();
        sessionStorage.setItem("isPlaying", "true");
    } else {
        audio.pause();
        sessionStorage.setItem("isPlaying", "false");
    }});



// Lägg till event-lyssnare
menuButton.addEventListener("click", menuVisibility);
themeToggleButton.addEventListener("click", toggleTheme);
