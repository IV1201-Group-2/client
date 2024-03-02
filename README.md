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
```
├───.github
│   └───workflows            - contains GitHub action workflows for CI/CD
├───dist                     - contains Vue build files after the project has been built
├───public                   - contains favicon
├───service
│   ├───src
│   │   ├───main
│   │   │   ├───java         - contains the lightweight server serving the Vue build files
│   │   │   └───resources
│   │   │       └───static   - Vue build files must be put in here in order for the server to serve the files
│   └───target               - contains the JAR file after the server has been compiled
└───src
    ├───assets               - contains meta CSS that affects the entire app
    ├───components           - contains components used by the views defined in src/views
    │   ├───generic          - contains components used by multiple views
    │   ├───__tests__        - contains component tests
    │   └───...              - remaining directories contain view-specific components
    ├───i18n                 - contains internationalization related files
    │   └───locales          - contains translations for each available language
    ├───router               - contains routing configurations
    ├───stores               - contains state management stores
    ├───util                 - contains utility files
    ├───views                - contains all views rendered by Vue's <RouterView> component
    │   ├───applicant        - contains all views relevant for applicants
    │   └───recruiter        - contains all views relevant for recruiters
    └───vuetify              - contains Vuetify (UI library) configurations
```
## How to Handle API Calls
- Each API base URL is stored as a property of the object `BASE_URL` declared in and exported from `src/util/api.ts`.
- When making an API call, the URL should be formed by concatenating the appropriate property of `BASE_URL` with the endpoint.
- When adding a URL to `BASE_URL`, the property should be named after the service and capitalized.
