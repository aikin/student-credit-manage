"use strict";

var util            = require('util');
var ReplacementRule = require('./ReplacementRule');

function SouthHarmonReplacementRule() {
    ReplacementRule.apply(this, arguments);
}

util.inherits(SouthHarmonReplacementRule, ReplacementRule);

SouthHarmonReplacementRule.prototype.replace = function() {
};

module.exports = SouthHarmonReplacementRule;