<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) API Rest avec TypeORM, Authentification JWT et implémentation de SWAGGER.

## Installation et mise à jour du Package.json

Une fois le repository cloné, déplacer vous dans le dossier /back et lancer les commandes suivantes:

```bash
$ npm install
$ npm update
```

## Création du fichier .env

> [!IMPORTANT]
> Créer un fichier .env en y déclarant les variables de la base de données crée précedemment, de la façon suivante: (les données sont à titre d'exemple):

```bash
DATABASE_TYPE=mysql
DATABASE_NAME=db_project_nest
DATABASE_URL=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=admin
DATABASE_PASSWORD=changeit
JWT_SECRET=D€F!N!R1M0T2P@$$£
```

## Base de données

Le fichier SQL fourni procure un script pour démarrer une database_project mySQL afin de pouvoir tester les routes et persister les données.

Ajouter dans l'IDE de votre choix et lancer le script.

> [!NOTE]
> Dans cette database vous pourrez vous inscrire avec un user déjà pré-compilé dans tous les body request directement sur la page Swagger ( http://localhost:5000/api )  
> Cela vous permettra d'obtenir rapidement un JWT token pour accéder aux méthodes CRUD pour les entités de base users, profiles et addresses, et vous pourrez donc gérer :

```
  - la création d'un compte user permettant de réaliser ensuite des requêtes basiques CRUD sur les différentes entités
  - l'implémentation d'un profil associé à ce même user, dans lequel seront enregistrées ses adresses postales sous format JSON
  - une liste d'abonnements avec des champs génériques
  - des tables correspoondant à différents type d'abonnement et reliées vers la table ABONNEMENT.
```

> [!TIP]
> L'exemple fourni dans le POST route auth/login détient le role ADMIN permettant d'ajouter des types de contrat sur la table homonyme.
> Ci dessous les identifiants de connexion :

```
{
  "email": "juste.leblanc@mail.com",
  "password": "1MotdePasse?"
}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger

> [!TIP]
> L'application tourne par défault sur le port 5000.
> Cliquez sur le lien suivant pour accéder à la page SWAGGER pour réaliser vos premières requêtes et vous familiariser avec les différents end-points

http://localhost:5000/api
