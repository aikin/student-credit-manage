'use strict';

var util        = require('util');
var DisplayRule = require('./DisplayRule');

function DisplayWithSocialPracticeNotCovertIntoCourseRule() {
    DisplayRule.call(this);
}

util.inherits(DisplayWithSocialPracticeNotCovertIntoCourseRule, DisplayRule);

DisplayWithSocialPracticeNotCovertIntoCourseRule.prototype.generateDisplayData = function() {
    return {
        courseCredits                 : {},
        convertedSocialPracticeCredits: {}
    };
};

module.exports = DisplayWithSocialPracticeNotCovertIntoCourseRule;