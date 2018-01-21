# Mongodump file reader

[![Greenkeeper badge](https://badges.greenkeeper.io/Neamar/mongodump-reader.svg)](https://greenkeeper.io/)

Mongodump uses a special file format when backing up its content (concatenating each item without any separator, save for the standard `\x00` at the end of the object)

This small library returns an array of all the items in the mongodump file.

## Install
```
npm install mongodump-reader --save
```

## Usage

```js
var mongodumpReader = require("mongodump-reader");

// Option 1, directly from a buffer:
// (can be a file buffer, or something from the network, or any kind of valid bson binary content)
var buffer = fs.readFileSync("./path-to-bson");
mongodumpReader(buffer, function(err, items) {
    console.log(items);
});

// Option 2, specify a file path
// (will be read asynchronously)
mongodumpReader("/tmp/file.bson", function(err, items) {
    console.log(items);
});
```

## Known limitations
This module reads all the content in memory before returning anything. This won't be suitable for large collections.

However, the implementation is very simple and turning it in a Stream based engine should be straightforward.
