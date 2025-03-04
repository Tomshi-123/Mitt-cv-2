// Definierar en asynkron funktion för att hämta GitHub-repos
async function fetchGitHubRepos() {
    try {
        // Skickar en GET-förfrågan till GitHubs API för att hämta användarens publika repositories
        const response = await fetch("https://api.github.com/users/Tomshi-123/repos");
        
        // Väntar på att svaret ska omvandlas till JSON-format (lista med repositories)
        const repos = await response.json();

        // Hämtar elementet med id "repo-container" där repos ska visas
        const container = document.getElementById("repo-container");

        // Rensar innehållet i container om det redan finns något där
        container.innerHTML = "";

        // Loopar igenom varje repository i den hämtade listan
        repos.forEach((repo) => {
            // Skapar ett nytt div-element för varje repository
            const repoCard = document.createElement("div");
            
            // Lägger till CSS-klassen "repo-card" för styling
            repoCard.classList.add("repo-card");

            repoCard.style.background = randomColor();

            function randomColor() {
                const gradients = [
                    'linear-gradient(to bottom left,rgb(96, 196, 243),rgb(34, 107, 243) )',
                    'linear-gradient(to bottom right,rgb(12, 79, 223),rgb(69, 143, 253))',
                    'linear-gradient(to bottom left,rgb(66, 216, 236),rgb(38, 155, 250))'
                ]                    
                
                return gradients[Math.floor(Math.random() * gradients.length)];
            }

            // Skapar HTML-strukturen för varje repo och sätter in datan
            repoCard.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>  <!-- Repo-namn som länk -->
                <p>${repo.description || "Ingen beskrivning"}</p>  <!-- Beskrivning eller standardtext -->
                <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>  <!-- Stjärnor & forks -->
            `;

            // Lägger till det skapade repoCard i "repo-container"
            container.appendChild(repoCard);
        });

    } catch (error) {  // Om något går fel under API-anropet
        console.error("Kunde inte hämta repositories:", error);  // Loggar felet i konsolen

        // Visar ett felmeddelande för användaren i repo-container
        document.getElementById("repo-container").innerHTML = "<p>Fel vid hämtning av projekt.</p>";
    }
}

// Kör funktionen direkt när sidan laddas, så att repos visas automatiskt
fetchGitHubRepos();
