"use strict";

var SouthHarmonReplacementRule = require('./SouthHarmonReplacementRule');
var HarmonReplacementRule      = require('./HarmonReplacementRule');

function ReplacementRuleFactory() {

}

ReplacementRuleFactory.RULES = {
    '南哈蒙理工大学': SouthHarmonReplacementRule,
    '哈蒙理工大学': HarmonReplacementRule
};

ReplacementRuleFactory._forRule = function(college) {

    return this.RULES[college];
};

ReplacementRuleFactory.createReplacementRule = function(collage) {

//    return this._forRule(collage).createInstance();

    var Rule = this._forRule(collage);
    return new Rule();
};

module.exports = ReplacementRuleFactory;
