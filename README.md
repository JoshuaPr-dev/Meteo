🌦️ À propos de ce site
Ce site permet de consulter rapidement la météo actuelle d’une ville française.
L’utilisateur peut rechercher une ville grâce à l’auto-complétion, puis obtenir en temps réel la température, la description du temps, l’humidité, le vent et les précipitations.
L’interface s’adapte dynamiquement à la météo affichée pour une expérience plus immersive.

🌍 API utilisées dans ce projet
🏙️ API Geo de l’État français
URL : https://geo.api.gouv.fr/communes

Rôle : Permet d’obtenir la liste des communes françaises correspondant à la saisie de l’utilisateur.

Utilisation dans le projet :
Lorsque l’utilisateur commence à taper le nom d’une ville, l’application interroge cette API pour proposer des suggestions automatiques (auto-complétion) avec le nom et le code postal des villes.

☁️ API OpenWeatherMap
URL : https://api.openweathermap.org/data/2.5/weather

Rôle : Fournit les données météo en temps réel pour une ville donnée.

Utilisation dans le projet :
Une fois la ville sélectionnée, l’application interroge cette API pour afficher la météo actuelle (température, description, humidité, vent, précipitations, etc.) de la ville choisie.

📝 Résumé
L’API Geo sert à trouver et suggérer les villes françaises.

L’API OpenWeatherMap sert à afficher la météo de la ville sélectionnée.