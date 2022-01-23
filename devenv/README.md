```
docker build --tag=node-td .
```

```
docker-compose up -d
```

Check .env DEV_DB to point to the database in the container.
Example: DEV_DB='postgres://postgres:postgres@db-container:5432/development_db'

Then

```
docker exec -it api bash
```

And inside:

```
yarn start
```
