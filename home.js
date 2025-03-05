
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

