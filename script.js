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

let apiKey = "b87774d05ae46be354e07c2518c2c694";

input.addEventListener("input", async function () {
  let query = input.value.trim();
  if (query.length <= 2) {
    suggestions.style.display = "none";
    suggestions.innerHTML = "";
    loader.style.display = "none";
    return;
  }

  loader.style.display = "block";

  let response = await fetch(
    `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&fields=nom,codesPostaux&boost=population&limit=20`
  );
  let villes = await response.json();

  let villesFiltrees = villes.filter((ville) => ville.nom.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5);

  suggestions.innerHTML = "";

  villesFiltrees.forEach((ville) => {
    let codePostal = ville.codesPostaux && ville.codesPostaux.length > 0 ? ville.codesPostaux[0] : "";
    let li = document.createElement("li");
    li.textContent = `${ville.nom} (${codePostal})`;
    li.style.cursor = "pointer";
    li.style.padding = "5px";

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

document.addEventListener("click", (e) => {
  if (!input.contains(e.target) && !suggestions.contains(e.target)) {
    suggestions.style.display = "none";
  }
});

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

function setTextWeatherClass(description) {
  const body = document.body;
  body.classList.remove(
    "texte-ensoleille",
    "texte-nuageux",
    "texte-pluie",
    "texte-orage",
    "texte-neige"
  );
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
    body.classList.add("texte-ensoleille");
  }
}

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

async function afficherMeteo(ville) {
  loader.style.display = "block";
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ville)}&appid=${apiKey}&units=metric&lang=fr`
    );
    if (!response.ok) {
      throw new Error("Ville non trouvée");
    }
    let data = await response.json();

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

    let precipitation = 0;
    if (data.rain && data.rain["1h"]) precipitation = data.rain["1h"];
    else if (data.snow && data.snow["1h"]) precipitation = data.snow["1h"];
    precipitationElt.textContent = `Précipitation: ${precipitation} mm`;

    ville2Elt.textContent = data.name;
    temperature2Elt.textContent = `${Math.round(data.main.temp)}°C`;

    // Changement dynamique de la couleur du header
    document.querySelector("header").style.backgroundColor = getHeaderColor(desc);
  } catch (e) {
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

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let ville = input.value.split(" (")[0];
  afficherMeteo(ville);
});

afficherMeteo("Marseille");
