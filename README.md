# Housemate Lamp

An interactive research-through-design prototype exploring how an everyday lamp might respond to what a person shares, not only to commands.

## Run locally

Requires Node.js 18 or newer. No dependencies are needed.

```sh
npm start
```

Open http://localhost:3000. The server uses Railway's `PORT` environment variable when available and falls back to port 3000 locally.

## Deploy on Railway

Create a Railway project from this GitHub repository. Railway detects the Node.js app and runs `npm start`. After deployment, generate a public domain in the service's Settings.

## Prototype scope

The current interaction is a speculative, local simulation. It maps a person's utterance to a light quality and a short acknowledgment; it does not connect to an LLM or control a physical lamp.
