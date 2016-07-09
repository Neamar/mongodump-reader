"use strict";

var bsonize = require("bsonize");
var bson = require('bson').BSONPure.BSON;

/**
 * Mongodump files are not stored as array, but rather as a concatenation of objects
 * However the default Mongo BSON library does not allow for this, and only returns the first item
 * (or crash, depending on the version)
 */
module.exports = function(bsonFileContent) {
  var r = [];

  var buffer = bsonFileContent;
  while(buffer.length > 0) {
    // Read first item (up to \x00 for item)
    var data = bsonize.deserialize(buffer);
    r.push(data);

    // Compute the size in BSON length, and "move" the buffer cursor forward to next item
    var objectSize = bson.calculateObjectSize(data);
    buffer = buffer.slice(objectSize);
  }

  return r;
};
