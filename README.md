# e-mjpm API

## Get Started

```sh
git clone git@github.com:SocialGouv/eMJPM-api.git

cd eMJPM-api

npm install
```

## Run

 - Editer le fichier [.env](./env)
 - Builder l'image avec `docker build . -t emjpm-api`
 - Lancer les containers avec `docker-compose up`

## Seeds


### Developement

```sh

docker exec -it emjpm-postgres createdb -U emjpm backendlebontuteur_db_1

./node_modules/.bin/knex migrate:latest --env development

./node_modules/.bin/knex seed:run --env development
```

### Tests

```sh

docker exec -it emjpm-postgres createdb -U emjpm backendlebontuteur_db_1_test

./node_modules/.bin/knex migrate:latest --env test

./node_modules/.bin/knex seed:run --env test
```
