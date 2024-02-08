# docker-tp-final

## Table des Matières

- [Structure du Projet](#structure-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Développement](#développement)
- [Déploiement](#déploiement)

## Structure du Projet

```bash
/
├── app/
│ ├── Dockerfile
│ └── ...
├── mysql-data/
├── docker-compose.yml
└── README.md
```


- `app/` - Contient le code source de l'application et le Dockerfile pour construire l'image.
- `mysql-data/` - (Si applicable) Un volume Docker pour la persistance des données MySQL.
- `docker-compose.yml` - Définit les services, volumes et autres configurations pour Docker Compose.
- `README.md` - Ce fichier.

## Prérequis

- Docker
- Docker Compose

Assurez-vous que Docker et Docker Compose sont installés sur votre système. Pour les installer, suivez les instructions sur le [site officiel de Docker](https://docs.docker.com/get-docker/).

## Installation

Pour mettre en place le projet localement, suivez ces étapes :

Clonez le dépôt Git :

```bash
git clone [URL_DU_REPOSITORY] && cd [NOM_DU_PROJET]
```

Lancez les services à l'aide de Docker Compose :
```bash
sudo docker-compose up --build -d
```

## Utilisation
Après avoir démarré les services, accédez à votre application via http://localhost:3000 ou le port configuré dans votre docker-compose.yml.

## Développement
Pour travailler sur l'application :

Faites vos modifications dans le dossier /app.
Reconstruisez et redémarrez les services pour voir les changements :
```bash
sudo docker-compose up --build -d
```

## Déploiement

1. Cloner le dépôt Git

Clonez le dépôt de votre projet depuis GitHub :
```bash
git clone https://github.com/YanisHlali/docker-tp-final.git && cd docker-tp-final
```

2. Configuration de l'application

Assurez-vous que votre application est correctement configurée pour se connecter à la base de données MySQL. Cela peut inclure la configuration des variables d'environnement ou des fichiers de configuration.

3. Configuration Docker Compose

Vérifiez le fichier docker-compose.yml pour vous assurer que les services app et mysql sont configurés correctement. Assurez-vous que les ports nécessaires sont exposés et que les volumes sont configurés selon vos besoins.

4. Construction et lancement des conteneurs

Utilisez Docker Compose pour construire et lancer les conteneurs :
```bash
sudo docker-compose up --build -d
```
Cela va construire les images Docker et démarrer les conteneurs en arrière-plan.

5. Vérification du déploiement

Vérifiez que les conteneurs sont en cours d'exécution :
```bash
sudo docker-compose ps
```
Vous devriez voir les conteneurs app et mysql avec l'état "Up".

6. Accès à l'application

Accédez à votre application via l'URL spécifiée dans votre application, généralement http://localhost:3000 ou un autre port spécifié dans votre configuration.

7. Déploiement en production

Pour déployer en production, vous pouvez utiliser un service d'hébergement Docker tel que Docker Swarm, Kubernetes, ou un service de cloud comme AWS ECS, Google Kubernetes Engine, ou Azure Kubernetes Service. Assurez-vous de suivre les bonnes pratiques de sécurité et de configuration pour le déploiement en production.




