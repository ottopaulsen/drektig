# Drektig

## Development

```
npm run dev
```

Preview locally:

```
node

```

[Find icons here](https://icones.js.org/collection/mdi?s=barn)

## Deploy

```
npm run build
cd .output/server; npm install; cd ../..
firebase deploy
```

Deploy only rules:

```
firebase deploy --only firestore:rules
```
