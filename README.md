# extension-template

A template I use for building Chrome Extensions

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Design decisions

### Conversation mutation

To avoid syncing issues, mutation to conversations always happens in the content script. When a new message appears, it is added to the conversation object in the content script, and then the entire conversation is sent to the service worker to be saved. This is the flow for both messages written by the user and AI responses.
