"use strict";

var SouthHarmonReplacementRule = require('./SouthHarmonReplacementRule');

function ReplacementRuleFactory() {

}

ReplacementRuleFactory.createReplacementRule = function(collage) {

    return new SouthHarmonReplacementRule();
};

module.exports = ReplacementRuleFactory;
