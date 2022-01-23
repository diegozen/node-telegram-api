# Node Telegram API Integration

Example of a service integrated with TDLib and Telegram Bot API to make Telegram actions programatically.

## Functionality

Make new friends with a Telegram command.

An user asks for a group by a Telegram bot command and receive a invitation link when a new group is created.

## Getting started

You have to create a bot with BotFather and get your API credentials here https://my.telegram.org.

## Develop

### Environment

You'll need to build a custom Docker image to be able to use TDLib. Do the following:

```
cd devenv

docker build --tag=node-td .

docker-compose up -d
```

Check `.env` to point to the database in the container.
Example: `DEV_DB='postgres://postgres:postgres@db-container:5432/development_db'`

Then

```
docker exec -it api bash
```

And inside:

```
yarn install && yarn start
```

First time, you'll have to login to Telegram to let them know you are using that machine.

### Prettier

Use Prettier formatting tool in VS Code for the best programming experience.

Open your VS Code `settings.json` and set:

```
"editor.formatOnPaste": true,
"editor.formatOnSave": true,
```

If you want to save a file without formatting, VS Code has a shortcut for that:
In OSX just `CMD + k` then press `s`

### Migrations

Create your development database in postgres container and

```
yarn knex migrate:latest
```

### Seeds

You may want to use some initial data. In `src/config/db/seeds/` define the data you need. Then

```
yarn knex seed:run
```

## Production

Configure Github Actions for your use case.

There is a minimal configuration for the api to use Traefik as a reverse proxy. You would need to configure your own database container and the rest of Traefik config.
