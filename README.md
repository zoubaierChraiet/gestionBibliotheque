# Application de gestion d'une bibliothéque

Application simple pour gestion de bibliothéque crée avec Nodejs, express, firestore.

## Introduction

L'application de gestion de bibliothèque vous permet de gérer les livres d'une bibliothèque.
Vous pouvez effectuer des opérations CRUD sur les livres, telles que l'ajout de nouveaux livres, la mise à jour de livres existants, la récupération de la liste des livres et la suppression de livres.

## Features

- Ajouter un nouveau livre
- Mettre à jour un livre existant
- Récupérer la liste de tous les livres
- Supprimer un livre par ID

## Installation

Pour exécuter ce projet localement, suivez ces étapes:

1. **Cloner le repo:**

   ```sh
   git clone https://github.com/zoubaierChraiet/gestionBibliotheque.git
   cd gestionBibliotheque
   ```

2. **Installation des dépendances:**

   ```sh
   npm install
   ```

3. **Lancer le projet:**

   ```sh
   npm start
   ```

   L'application sera exécutée à `http://localhost:3000`.

4. **Lancer les tests:**

   ```sh
   npm run test:watch
   ```

5. **Documentation swagger:**

   Vous pouvez tester les differentes routes avec une interface swagger sur la route:
   `http://localhost:3000/api-docs`
