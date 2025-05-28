# API Météo – Application météo en JavaScript

## Présentation du projet

Ce projet est une application web permettant d’afficher la météo en temps réel pour n’importe quelle ville en France. L’utilisateur peut rechercher une ville via un champ de saisie avec suggestions automatiques, puis consulter les informations météo détaillées (température, humidité, vent, précipitations, etc.). L’interface s’adapte dynamiquement à la météo affichée (couleurs, images, fond…).

## Fonctionnalités

- Recherche de ville avec suggestions automatiques (auto-complétion)
- Affichage de la météo actuelle (température, description, humidité, vent, précipitations)
- Changement dynamique du design selon la météo (couleurs, images, fond)
- Affichage d’une météo par défaut (Paris) au chargement
- Responsive design (adapté mobile/tablette/desktop)

## APIs utilisées

- **API Geo de l’État français**  
  [`https://geo.api.gouv.fr/communes`](https://geo.api.gouv.fr/communes)  
  Sert à obtenir la liste des villes françaises correspondant à la saisie de l’utilisateur (auto-complétion).

- **API OpenWeatherMap**  
  [`https://api.openweathermap.org/data/2.5/weather`](https://openweathermap.org/current)  
  Sert à récupérer les données météo en temps réel pour la ville sélectionnée.

## Instructions pour lancer l’application

1. **Cloner ou télécharger le projet**  
   Placez tous les fichiers dans un même dossier (HTML, CSS, JS, images).

2. **Ouvrir le fichier `index.html`**  
   Double-cliquez sur `index.html` ou ouvrez-le dans votre navigateur préféré.

3. **Utilisation**  
   - Tapez le nom d’une ville dans le champ de recherche.
   - Sélectionnez une suggestion ou validez avec Entrée.
   - La météo s’affiche instantanément.

> **Remarque :**  
> Une connexion Internet est nécessaire pour interroger les APIs.



