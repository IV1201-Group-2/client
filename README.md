# Client Service

## Table of Contents
* [General Info](#general-info)
* [Project Setup](#project-setup)
* [Recommended IDE Setup](#recommended-ide-setup)
* [File and Directory Semantics](#file-and-directory-semantics)
* [How to Handle API Calls](#how-to-handle-api-calls)

## General info
This repository contains all files relevant to the client:
* The Vue project files
* A lightweight Spring Boot server that serves the Vue build files.
* A Dockerfile that builds and containerizes the Vue and Spring Boot build files.
* A YAML file that enables the Docker container to run on Heroku.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Simulate how Heroku containerizes and launches the app with the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
```sh
heroku local
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run Prettier Formatting
```sh
npm run format
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## File and Directory Semantics
- service
  - src
    - main
      - java
        - com
          - iv1201
            - clientservice
              - ClientServiceApplication.java -> initiates spring boot server
              - ServerController.java -> contains GET mapping to the client root
      - ...
    - ...
  - mwnw -> build tool
  - system.properties -> required Heroku settings
  - ...
- src
  - assets
    - base.css -> defines color system
    - main.css -> defines meta css
  - components
    - \_\_tests\_\_
      - custom_test_utils
        - enums.ts -> defines enums for testing
        - functions.ts -> defines custom functions for testing
      - unit.setup.ts -> defines global plugins and mocks
      - ... -> test files
  - i18n
    - locales
      - en.json -> contains English translations
      - sv.json -> contains Swedish translations
    - index.ts -> exports configured instance of I18n
  - router
    - index.ts -> exports configured router
  - stores
    - ... -> state management stores
  - util
    - api.ts -> exports variables used for communicating with REST API:s
    - constants.ts -> exports generic constants
    - enums.ts -> exports generic enums
    - error.ts -> exports REST API error response messages
    - types.ts -> exports generic types
    - validation.ts -> exports validation builder
  - views
    - ... -> views rendered by Vue's RouterView
  - vuetify
    - index.ts -> exports configured Vuetify instance
  - App.vue -> root component
  - main.ts -> initializes and configures root component
- .env -> defines I18n default and fallback locales
- Dockerfile -> contains Docker instructions
- heroku.yml -> contains Heroku instructions for running docker

## How to Handle API Calls
- Each API base URL is stored as a property of the object `BASE_URL` declared in and exported from `src/util/api.ts`.
- When making an API call, the URL should be formed by concatenating the appropriate property of `BASE_URL` with the endpoint.
- When adding a URL to `BASE_URL`, the property should be named after the service and capitalized.
