// Definierar en asynkron funktion för att hämta GitHub-repos
async function fetchGitHubRepos() {
    try {
        // Skickar en HTTP-förfrågan till GitHubs API för att hämta alla publika repos för användaren "Tomshi-123"
        const response = await fetch("https://api.github.com/users/Tomshi-123/repos");

        // Konverterar svaret från JSON-format till en JavaScript-array av objekt
        const repos = await response.json();

        // Hämtar HTML-elementet med id "repo-container" där repos ska visas
        const container = document.getElementById("repo-container");

        // Rensar befintligt innehåll i containern innan nya repos läggs till
        container.innerHTML = "";

        // Loopar igenom varje repository i den hämtade listan
        repos.forEach(async (repo) => {
            // Skapar ett nytt div-element för att representera ett repository
            const repoCard = document.createElement("div");

            // Lägger till CSS-klassen "repo-card" för styling
            repoCard.classList.add("repo-card");

            // Sätter bakgrundsfärgen på kortet till en slumpmässig gradient
            repoCard.style.background = randomColor();

            // Funktion som returnerar en slumpmässig gradientfärg
            function randomColor() {
                const gradients = [
                    'linear-gradient(to bottom left,rgb(96, 196, 243),rgb(239, 242, 247) )',
                    'linear-gradient(to bottom right,rgb(76, 133, 255),rgba(255, 255, 255, 0.69))',
                    'linear-gradient(to bottom left,rgb(66, 216, 236),rgba(255, 255, 255, 0.82))'
                ];
                // Returnerar en slumpmässig färg från arrayen
                return gradients[Math.floor(Math.random() * gradients.length)];
            }

            // Skapar HTML-strukturen för kortet och fyller det med repo-information
            repoCard.innerHTML = `
                <h3>${repo.name}</h3> <!-- Repo-namn som länk -->
                <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p> <!-- Visar antal stjärnor och forks -->
            `;

            // Lägger till en klick-händelse på kortet, som hämtar README-filen och öppnar panelen
            repoCard.addEventListener("click", () => {
                fetchReadme(repo.name);
            });

            // Lägger till kortet i "repo-container" så det syns på sidan
            container.appendChild(repoCard);
        });

    } catch (error) {
        // Om något går fel vid hämtning av repos, logga felet i konsolen
        console.error("Kunde inte hämta repositories:", error);

        // Visa ett felmeddelande på sidan
        document.getElementById("repo-container").innerHTML = "<p>Fel vid hämtning av projekt.</p>";
    }
}

// Funktion för att hämta och visa README-filen för ett specifikt repository
async function fetchReadme(repoName) {
    try {
        // Skickar en förfrågan till GitHub API för att hämta README-filen för det valda repot
        const response = await fetch(`https://api.github.com/repos/Tomshi-123/${repoName}/readme`, {
            headers: { Accept: "application/vnd.github.v3.raw" } // Begär råtext istället för Base64-kodat innehåll
        });

        // Om responsen inte är OK (t.ex. README finns inte), kasta ett fel
        if (!response.ok) {
            throw new Error("README kunde inte hämtas");
        }

        // Läs in README-innehållet som text
        const readmeText = await response.text();

        // Uppdaterar innehållet i sidopanelen med repo-namn och README-text
        document.getElementById("project-info-content").innerHTML = `
            <h2>${repoName}</h2>
            <div>${readmeText}</div> <!-- <pre> bevarar formatering av texten -->
            <button onclick="closePanel()" class="btn">Stäng</button> <!-- Knapp för att stänga panelen -->
        `;

        // Lägger till klassen "open" på sidopanelen så den visas
        document.getElementById("project-info-panel").classList.add("open");
    } catch (error) {
        // Om något går fel vid hämtning av README, logga felet i konsolen
        console.error("Kunde inte hämta README:", error);

        // Visa ett felmeddelande i sidopanelen
        document.getElementById("project-info-content").innerHTML = "<p>README kunde inte hämtas.</p>";
    }
}

// Funktion för att stänga sidopanelen
function closePanel() {
    // Tar bort klassen "open" från sidopanelen så den göms
    document.getElementById("project-info-panel").classList.remove("open");
}

// Anropar funktionen för att hämta och visa GitHub-repos direkt när sidan laddas
fetchGitHubRepos();
