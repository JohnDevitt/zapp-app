# Zapp app

### Prerequisites

- Make you have [docker](https://www.docker.com/) installed
- You also need the Docker daemon running, easiest way is using [Docker desktop](https://www.docker.com/products/docker-desktop/)
- [npx](https://docs.npmjs.com/cli/v8/commands/npx) is needed for running some prisma commands, like migrations, or generating types
- Lastly, the project was built using [pnpm](https://pnpm.io/)

## Running API

**Make sure to the run the API before running the client**

```
cd apps/api
```

Install dependencies, generate typings

```
pnpm install
npx prisma generate
```

Run Docker, migrate db

```
docker compose up postgres -d --build
npx prisma migrate dev
npx prisma db push
```

Run the server

```
pnpm run start:dev
```

## Running the client

```
pnpm install
pnpm run start
```
