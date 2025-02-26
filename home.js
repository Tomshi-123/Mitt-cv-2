
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

// Modal-kod hämtad från w3schools:

// Hämta modalen
let modal = document.getElementById("myModal");

// Hämta alla knappar som ska öppna modalen
let btns = document.querySelectorAll("#project4");

// Hämta <span>-elementet som stänger modalen
let span = document.getElementsByClassName("close")[0];

// Loopa igenom alla knappar och lägg till en klick-händelse
btns.forEach(btn => {
  btn.addEventListener("click", function() {
    modal.style.display = "block";
  });
});

// När användaren klickar på <span> (X), stäng modalen
span.onclick = function() {
  modal.style.display = "none";
}

// När användaren klickar utanför modalen, stäng den
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

