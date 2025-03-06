// Hämta och visa JSON data experience/education
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

        //Hämta projectdata
        fetch("data.json") // Justera så att rätt data hämtas
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("projects-container");
    
            data.projects.forEach(project => { // 🔥 Lägg till .projects här!
                const projectElement = document.createElement("a");
                projectElement.className = "project";
                projectElement.id = project.id;
                projectElement.href = project.url;
                projectElement.target = "_blank";
    
                const img = document.createElement("img");
                img.src = project.image;
                img.alt = project.alt;
    
                projectElement.appendChild(img);
                container.appendChild(projectElement);
            });
        })
        .catch(error => console.error("Error loading projects JSON data:", error));

});
