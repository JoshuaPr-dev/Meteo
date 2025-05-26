// Je récupère tous les éléments HTML dont j’ai besoin
let input = document.querySelector("#city-input"); // Champ de saisie de la ville
let suggestions = document.querySelector("#suggestions"); // Liste déroulante pour les suggestions de villes
let loader = document.querySelector("#loader"); // Loader pour indiquer le chargement
let villeElt = document.querySelector("#ville"); // Élément où j’affiche le nom de la ville
let temperatureElt = document.querySelector("#temperature"); // Élément où j’affiche la température
let descriptionElt = document.querySelector("#description"); // Élément où j’affiche la description météo
let humiditeElt = document.querySelector("#humidite"); // Élément pour afficher l’humidité
let ventElt = document.querySelector("#vent"); // Élément pour afficher la vitesse du vent
let precipitationElt = document.querySelector("#precipitation"); // Élément pour afficher les précipitations
let ville2Elt = document.querySelector("#ville2"); // Deuxième affichage du nom de la ville (peut être utilisé ailleurs dans l’UI)
let temperature2Elt = document.querySelector("#temperature2"); // Deuxième affichage de la température
let form = document.querySelector("#city-form"); // Le formulaire de recherche

// Ma clé API pour accéder à l’API OpenWeatherMap
let apiKey = "b87774d05ae46be354e07c2518c2c694";

// Quand je tape dans le champ de recherche
input.addEventListener("input", async function () {
  let query = input.value.trim(); // Je supprime les espaces inutiles
  if (query.length < 2) {
    // Si la recherche est trop courte, je n’affiche rien
    suggestions.style.display = "none";
    suggestions.innerHTML = "";
    loader.style.display = "none";
    return;
  }

  loader.style.display = "block"; // Je montre le loader pendant le chargement

  // Je fais une requête à l’API du gouvernement pour chercher les villes correspondant au texte saisi
  let response = await fetch(
    `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&fields=nom,codesPostaux&boost=population&limit=20`
  );
  let villes = await response.json();

  // Je filtre pour ne garder que les villes dont le nom commence par ce que j’ai saisi
  let villesFiltrees = villes
    .filter((ville) => ville.nom.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 5); // Je limite à 5 suggestions

  suggestions.innerHTML = ""; // Je vide la liste actuelle des suggestions

  // Pour chaque ville filtrée, je crée un élément dans la liste
  villesFiltrees.forEach((ville) => {
    let codePostal = ville.codesPostaux && ville.codesPostaux.length > 0 ? ville.codesPostaux[0] : "";
    let li = document.createElement("li");
    li.textContent = `${ville.nom} (${codePostal})`;
    li.style.cursor = "pointer";
    li.style.padding = "5px";

    // Quand je clique sur une suggestion, je remplis le champ avec le nom choisi
    li.addEventListener("click", () => {
      input.value = `${ville.nom} (${codePostal})`;
      suggestions.style.display = "none";
      suggestions.innerHTML = "";
      loader.style.display = "none";
    });

    suggestions.appendChild(li); // Je l’ajoute à la liste
  });

  // J’affiche ou je cache la liste en fonction du résultat
  suggestions.style.display = villesFiltrees.length ? "block" : "none";
  loader.style.display = "none"; // Je cache le loader
});

// Si je clique ailleurs sur la page, je ferme la liste des suggestions
document.addEventListener("click", (e) => {
  if (!input.contains(e.target) && !suggestions.contains(e.target)) {
    suggestions.style.display = "none";
  }
});

// Cette fonction me permet d’afficher les infos météo d’une ville
async function afficherMeteo(ville) {
  loader.style.display = "block"; // Je montre le loader pendant le chargement
  try {
    // Je fais la requête à l’API météo avec la ville choisie
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ville)}&appid=${apiKey}&units=metric&lang=fr`
    );
    if (!response.ok) throw new Error("Ville non trouvée"); // Je gère le cas où la ville n'existe pas
    let data = await response.json();

    // Je remplis les éléments HTML avec les données reçues
    villeElt.textContent = data.name;
    temperatureElt.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElt.textContent =
      data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    humiditeElt.textContent = `Humidité: ${data.main.humidity}%`;
    ventElt.textContent = `Vent: ${Math.round(data.wind.speed * 3.6)} km/h`; // Je convertis le vent de m/s à km/h

    // Je gère les précipitations (pluie ou neige)
    let precipitation = 0;
    if (data.rain && data.rain["1h"]) precipitation = data.rain["1h"];
    else if (data.snow && data.snow["1h"]) precipitation = data.snow["1h"];
    precipitationElt.textContent = `Précipitation: ${precipitation} mm`;

    // Je mets aussi à jour les deux autres champs ville/température s’ils sont utilisés ailleurs dans la page
    ville2Elt.textContent = data.name;
    temperature2Elt.textContent = `${Math.round(data.main.temp)}°C`;
  } catch (e) {
    // Si la ville est inconnue ou qu'il y a une erreur, j’affiche des valeurs par défaut
    villeElt.textContent = "Ville non trouvée";
    temperatureElt.textContent = "--°C";
    descriptionElt.textContent = "";
    humiditeElt.textContent = "Humidité: --%";
    ventElt.textContent = "Vent: -- km/h";
    precipitationElt.textContent = "Précipitation: -- mm";
    ville2Elt.textContent = "";
    temperature2Elt.textContent = "";
  }
  loader.style.display = "none"; // Je cache le loader une fois terminé
}

// Quand je soumets le formulaire, j'empêche le rechargement de la page et j’affiche la météo
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let ville = input.value.split(" (")[0]; // Je récupère uniquement le nom de la ville (sans le code postal)
  afficherMeteo(ville);
});

// À l’ouverture de la page, j’affiche automatiquement la météo de Paris
afficherMeteo("Paris");
