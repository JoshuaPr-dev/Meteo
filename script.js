// Sélection des éléments du DOM nécessaires pour l'application météo
let input = document.querySelector("#city-input");
let suggestions = document.querySelector("#suggestions");
let loader = document.querySelector("#loader");
let villeElt = document.querySelector("#ville");
let temperatureElt = document.querySelector("#temperature");
let descriptionElt = document.querySelector("#description");
let humiditeElt = document.querySelector("#humidite");
let ventElt = document.querySelector("#vent");
let precipitationElt = document.querySelector("#precipitation");
let ville2Elt = document.querySelector("#ville2");
let temperature2Elt = document.querySelector("#temperature2");
let form = document.querySelector("#city-form");

// Clé API pour OpenWeatherMap
let apiKey = "b87774d05ae46be354e07c2518c2c694";

// Gestion de la saisie dans le champ de recherche de ville
input.addEventListener("input", async function () {
  let query = input.value.trim();
  // Si la saisie est trop courte, on masque les suggestions et le loader
  if (query.length <= 2) {
    suggestions.style.display = "none";
    suggestions.innerHTML = "";
    loader.style.display = "none";
    return;
  }

  loader.style.display = "block";

  // Appel à l'API Geo pour récupérer les villes correspondant à la saisie
  let response = await fetch(
    `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&fields=nom,codesPostaux&boost=population&limit=20`
  );
  let villes = await response.json();

  // Filtrage des villes pour ne garder que celles qui commencent par la saisie
  let villesFiltrees = villes.filter((ville) => ville.nom.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5);

  suggestions.innerHTML = "";

  // Affichage des suggestions de villes sous forme de liste
  villesFiltrees.forEach((ville) => {
    let codePostal = ville.codesPostaux && ville.codesPostaux.length > 0 ? ville.codesPostaux[0] : "";
    let li = document.createElement("li");
    li.textContent = `${ville.nom} (${codePostal})`;
    li.style.cursor = "pointer";
    li.style.padding = "5px";

    // Lorsqu'on clique sur une suggestion, on remplit le champ et on masque la liste
    li.addEventListener("click", () => {
      input.value = `${ville.nom} (${codePostal})`;
      suggestions.style.display = "none";
      suggestions.innerHTML = "";
      loader.style.display = "none";
    });

    suggestions.appendChild(li);
  });

  suggestions.style.display = villesFiltrees.length ? "block" : "none";
  loader.style.display = "none";
});

// Masquer les suggestions si on clique en dehors du champ ou de la liste
document.addEventListener("click", (e) => {
  if (!input.contains(e.target) && !suggestions.contains(e.target)) {
    suggestions.style.display = "none";
  }
});

// Fonction pour déterminer la couleur du header selon la météo
function getHeaderColor(description) {
  description = description.toLowerCase();
  if (description.includes("soleil") || description.includes("clair") || description.includes("dégagé")) {
    return "var(--couleur-FondHeader-Ensoleillé)";
  }
  if (
    description.includes("nuage") ||
    description.includes("couvert") ||
    description.includes("brouillard") ||
    description.includes("brume")
  ) {
    return "var(--couleur-FondHeader-Nuageux)";
  }
  if (description.includes("pluie") || description.includes("bruine") || description.includes("averse")) {
    return "var(--couleur-FondHeader-Pluie)";
  }
  if (description.includes("orage")) {
    return "var(--couleur-FondHeader-Orage)";
  }
  if (description.includes("neige") || description.includes("grésil") || description.includes("verglas")) {
    return "var(--couleur-FondHeader-Neige)";
  }
  return "var(--couleur-FondHeader-Ensoleillé)";
}

// Applique la classe CSS sur l'input selon la météo
function setInputWeatherClass(description) {
  input.classList.remove("ensoleille", "nuageux", "pluie", "orage", "neige");
  description = description.toLowerCase();
  if (description.includes("soleil") || description.includes("clair") || description.includes("dégagé")) {
    input.classList.add("ensoleille");
  } else if (
    description.includes("nuage") ||
    description.includes("couvert") ||
    description.includes("brouillard") ||
    description.includes("brume")
  ) {
    input.classList.add("nuageux");
  } else if (description.includes("pluie") || description.includes("bruine") || description.includes("averse")) {
    input.classList.add("pluie");
  } else if (description.includes("orage")) {
    input.classList.add("orage");
  } else if (description.includes("neige") || description.includes("grésil") || description.includes("verglas")) {
    input.classList.add("neige");
  } else {
    input.classList.add("ensoleille");
  }
}

// Applique la classe CSS sur le bouton selon la météo
function setButtonWeatherClass(description) {
  const button = document.querySelector("header form button");
  button.classList.remove("ensoleille", "nuageux", "pluie", "orage", "neige");
  description = description.toLowerCase();
  if (description.includes("soleil") || description.includes("clair") || description.includes("dégagé")) {
    button.classList.add("ensoleille");
  } else if (
    description.includes("nuage") ||
    description.includes("couvert") ||
    description.includes("brouillard") ||
    description.includes("brume")
  ) {
    button.classList.add("nuageux");
  } else if (description.includes("pluie") || description.includes("bruine") || description.includes("averse")) {
    button.classList.add("pluie");
  } else if (description.includes("orage")) {
    button.classList.add("orage");
  } else if (description.includes("neige") || description.includes("grésil") || description.includes("verglas")) {
    button.classList.add("neige");
  } else {
    button.classList.add("ensoleille");
  }
}

// Applique la classe CSS sur le body pour changer la couleur du texte selon la météo
function setTextWeatherClass(description) {
  const body = document.body;
  body.classList.remove("texte-ensoleille", "texte-nuageux", "texte-pluie", "texte-orage", "texte-neige");
  description = description.toLowerCase();
  if (description.includes("soleil") || description.includes("clair") || description.includes("dégagé")) {
    body.classList.add("texte-ensoleille");
  } else if (
    description.includes("nuage") ||
    description.includes("couvert") ||
    description.includes("brouillard") ||
    description.includes("brume")
  ) {
    body.classList.add("texte-nuageux");
  } else if (description.includes("pluie") || description.includes("bruine") || description.includes("averse")) {
    body.classList.add("texte-pluie");
  } else if (description.includes("orage")) {
    body.classList.add("texte-orage");
  } else if (description.includes("neige") || description.includes("grésil") || description.includes("verglas")) {
    body.classList.add("texte-neige");
  } else {
    body.classList.add("ensoleille");
  }
}

// Change l'image météo affichée selon la description
function setWeatherImage(description) {
  const img = document.getElementById("weather-img");
  description = description.toLowerCase();
  if (description.includes("soleil") || description.includes("clair") || description.includes("dégagé")) {
    img.src = "./assets/img/soleil.svg";
    img.alt = "Image de soleil";
  } else if (
    description.includes("nuage") ||
    description.includes("couvert") ||
    description.includes("brouillard") ||
    description.includes("brume")
  ) {
    img.src = "./assets/img/nuageux.svg";
    img.alt = "Image de nuage";
  } else if (description.includes("pluie") || description.includes("bruine") || description.includes("averse")) {
    img.src = "./assets/img/pluie.svg";
    img.alt = "Image de pluie";
  } else if (description.includes("orage")) {
    img.src = "./assets/img/orageux.svg";
    img.alt = "Image d'orage";
  } else if (description.includes("neige") || description.includes("grésil") || description.includes("verglas")) {
    img.src = "./assets/img/neige.svg";
    img.alt = "Image de neigeux";
  } else {
    img.src = "./assets/img/soleil.svg";
    img.alt = "Image de soleil";
  }
}

// Change le fond de la page selon la météo
function setBackgroundWeather(description) {
  description = description.toLowerCase();
  let bg = "./assets/img/fondsoleil.svg";
  if (description.includes("soleil") || description.includes("clair") || description.includes("dégagé")) {
    bg = "./assets/img/fondsoleil.svg";
  } else if (
    description.includes("nuage") ||
    description.includes("couvert") ||
    description.includes("brouillard") ||
    description.includes("brume")
  ) {
    bg = "./assets/img/fondnuageux.svg";
  } else if (description.includes("pluie") || description.includes("bruine") || description.includes("averse")) {
    bg = "./assets/img/fondpluie.svg";
  } else if (description.includes("orage")) {
    bg = "./assets/img/fondorageux.svg";
  } else if (description.includes("neige") || description.includes("grésil") || description.includes("verglas")) {
    bg = "./assets/img/fondneige.svg";
  }
  document.body.style.backgroundImage = `url('${bg}')`;
}

// Fonction principale pour afficher la météo d'une ville
async function afficherMeteo(ville) {
  loader.style.display = "block";
  try {
    // Appel à l'API OpenWeatherMap pour récupérer la météo
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ville)}&appid=${apiKey}&units=metric&lang=fr`
    );
    if (!response.ok) {
      throw new Error("Ville non trouvée");
    }
    let data = await response.json();

    // Mise à jour des éléments du DOM avec les données météo
    villeElt.textContent = data.name;
    temperatureElt.textContent = `${Math.round(data.main.temp)}°C`;
    let desc = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
    descriptionElt.textContent = desc;
    setInputWeatherClass(desc);
    setButtonWeatherClass(desc);
    setTextWeatherClass(desc);
    setWeatherImage(desc);
    setBackgroundWeather(desc);
    humiditeElt.textContent = `Humidité: ${data.main.humidity}%`;
    ventElt.textContent = `Vent: ${Math.round(data.wind.speed * 3.6)} km/h`;

    // Gestion des précipitations (pluie ou neige)
    let precipitation = 0;
    if (data.rain && data.rain["1h"]) precipitation = data.rain["1h"];
    else if (data.snow && data.snow["1h"]) precipitation = data.snow["1h"];
    precipitationElt.textContent = `Précipitation: ${precipitation} mm`;

    // Mise à jour d'autres éléments (pour affichage secondaire)
    ville2Elt.textContent = data.name;
    temperature2Elt.textContent = `${Math.round(data.main.temp)}°C`;

    // Changement de la couleur du header selon la météo
    document.querySelector("header").style.backgroundColor = getHeaderColor(desc);
  } catch (e) {
    // Gestion des erreurs (ville non trouvée, etc.)
    villeElt.textContent = "Ville non trouvée";
    temperatureElt.textContent = "--°C";
    descriptionElt.textContent = "";
    humiditeElt.textContent = "Humidité: --%";
    ventElt.textContent = "Vent: -- km/h";
    precipitationElt.textContent = "Précipitation: -- mm";
    ville2Elt.textContent = "";
    temperature2Elt.textContent = "";
    document.querySelector("header").style.backgroundColor = "var(--couleur-FondHeader-Ensoleillé)";
  }
  loader.style.display = "none";
}

// Gestion de la soumission du formulaire pour lancer la recherche météo
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let ville = input.value.split(" (")[0];
  afficherMeteo(ville);
});

// Affichage de la météo de Paris au chargement de la page
afficherMeteo("Paris");
