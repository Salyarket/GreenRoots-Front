### Docker

_1_: Docker commandes

- build sans avoir de .env : "docker compose up --build" ;

- build avec un .env : "docker compose --env-file .env.docker up --build" ;

- tout supprimer conteneurs + images : "docker compose down -v --rmi all" ;

- supprime les conteneurs du projet : "docker compose down" ;

- supprime conteneur + DataBase : "docker compose down -v".

