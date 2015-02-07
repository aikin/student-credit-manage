'use strict';

var util            = require('util');
var ReplacementRule = require('./ReplacementRule');

function HarmonReplacementRule() {
    ReplacementRule.apply(this, arguments);
}

util.inherits(HarmonReplacementRule, ReplacementRule);

HarmonReplacementRule.prototype.replace = function(detailStudiedCourses, passSocialPractices) {

};

module.exports = HarmonReplacementRule;