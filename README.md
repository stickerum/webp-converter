<!-- # webp-converter-promise -->

# webp-converter

A small [node.js](http://nodejs.org) library for converting any image to webp file format or converting webp image to any image file format.

This library uses precompiled executables of WebP for more info visit [WebP](https://developers.google.com/speed/webp).

## What's New 

* Precompiled executables of WebP upgraded to v1.0.2
* Promise-based structure

## Installation

```bash
yarn add github:stickerum/webp-converter
```

<!--
```bash
npm install webp-converter-promise
yarn add webp-converter-promise
```
-->

## How to use

### `cwebp` — convert other image format to webp

```js
const webp = require('webp-converter');

webp.cwebp('input.jpg', 'output.webp', '-q 80')
    .then(console.log)
    .catch(console.error);
```

### `dwebp` — onvert webp image to other image format

```js
const webp = require('webp-converter');

webp.dwebp('output.webp', 'input.png')
    .then(console.log)
    .catch(console.error);
```

