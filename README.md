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

In a separate terminal, from the root directory

```
cd apps/client
```

```
pnpm install
pnpm run start
```

## General Approach

One of the most difficult tasks in web development is validation. A simple form, for example, might have a multitude of validation rules regarding input existence, type, length, as well as more specific input rules. Complicating the manner, the client cannot be counted on to pass validated data to the api, therefore any validation logic needs to be replicated on both front- and backend.

[Zod](https://zod.dev/) is an excellent tool for solving the validation problem in the typescript ecosystem. This tool or similar should be installed on every TypeScript project. Using a schema first approach, we can define in detail the validation rules of a form, api, or file, and from this generate the code needed to validate these entities.

My aim with this project was to leverage a monorepo setup to share the a Zod schema between a Typescript client and Typescript api. This provides 100% alignment in validation throughout the system, regardless of whether the user is filling in a form, submitting date through the ai or uploding a file.

## Design Approach

The app was made with a mobile-first design. The idea here being that a mobile design is easier to stretch to a tablet or desktop size screen, than it is to shrink a desktop design down to table or mobile size

## Yet to do ...

- Testing
- Internationalisation
- Error reporting
- Better handling of specific HTTP response codes (on both client and api)
- Analytics
- Accessibilty
- CI/CD
- Error pages, 404, etc.
- Better user of SSR, SRC, etc.
