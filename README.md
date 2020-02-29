# VPN Gate API

Simple access VPN Gate API with heroku/zeit-now/netlfiy and save to firebase firestore.

[![Deploy with Herku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/panelssh/vpn-gate-api) [![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/import/project?template=https://github.com/panelssh/vpn-gate-api.git) [![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/panelssh/vpn-gate-api)

## Prerequisites

- NodeJS >= 8.0.0
- YARN (latest)
- Create new project [firebase app](https://console.firebase.google.com/)
- Creeate new app from this providers (you can choose one):
    - [Heroku](https://dashboard.heroku.com/new-app)
    - [Zeit Now](https://zeit.co/import)
    - [Netlify](https://app.netlify.com/start)

## Configuration

- [Generate new private key](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk) then open it and copy all text for make encode value to base64 or you can use [this link](https://www.base64encode.org).
- Add environment variables `FIREBASE` with with the value that you have encoded.
    - [Heroku](https://devcenter.heroku.com/articles/config-vars)
    - [Zeit Now](https://zeit.co/docs/v2/serverless-functions/env-and-secrets)
    - [Netlify](https://docs.netlify.com/configure-builds/environment-variables)

## Installation

```bash
yarn
```

## Development

Copy or rename `.env.example` to `.env`.
```bash
cp .env.example .env
```

Put your `encode base64` text in `FIREBASE ENV`.
```env
FIREBASE=YOUR_FIREBASE_HAS_ENCODED_WITH_BASE64
```

Run test with command:
```bash
yarn dev
```
Access with this url [localhost:5000](http://localhost:5000)

## API Endpoint

BASE URL:
- Heroku: `https://[YOUR-HEROKU-APP-NAME].herokuapp.com`
- Zeit Now: `https://[YOUR-ZEIT-NOW-APP-NAME].now.sh`
- Netlify: `https://[YOUR-NETLIFY-APP-NAME].netlify.com/.netlify/functions`

| method   | path                 | query            | body             | details                               |
|----------|----------------------|------------------|------------------|---------------------------------------|
| `GET`    | `/`                  | -                | -                | count servers and configs.            |
| `POST`   | `/`                  | -                | -                | insert or update servers and configs. |
| `DELETE` | `/`                  | -                | -                | delete servers and configs.           |
| `PATCH`  | `/`                  | -                | -                | use `delete` and `insert` at once.    |
| `GET`    | `/insert`            | -                | -                | insert or update servers and configs. |
| `GET`    | `/delete`            | -                | -                | delete servers and configs.           |
| `GET`    | `/update`            | -                | -                | use `delete` and `insert` at once.    |
| `GET`    | `/send-notification` | `title` & `body` | -                | send notification to all users.       |
| `POST`   | `/send-notification` | -                | `title` & `body` | send notification to all users.       |

## Postman API Docs

- [Heroku](https://documenter.getpostman.com/view/10489365/SzKVQxcv)
- [Zeit Now](https://documenter.getpostman.com/view/10489365/SzKWuHmD)
- [Netlify](https://documenter.getpostman.com/view/10489365/SzKWuHmC)

## Limitations

- [Firebase Firestore](https://firebase.google.com/docs/firestore/quotas)
- [Heroku](https://devcenter.heroku.com/articles/limits)
- [Zeit Now](https://zeit.co/docs/v2/platform/limits)
- [Netlify](https://www.netlify.com/tos/)
