"use strict";

var fs = require("fs");
var assert = require("assert");

var mongodumpReader = require('../index.js');

var buffer = fs.readFileSync(__dirname + "/sample.bson");

mongodumpReader(buffer, function(err, items) {
  if(err) {
    throw err;
  }

  assert.ok(items.length > 0);

  process.exit(0);
});
