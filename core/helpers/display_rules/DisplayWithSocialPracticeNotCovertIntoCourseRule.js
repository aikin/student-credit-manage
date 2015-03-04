'use strict';

var util        = require('util');
var DisplayRule = require('./DisplayRule');

function DisplayWithSocialPracticeNotCovertIntoCourseRule() {
    DisplayRule.call(this);
}

util.inherits(DisplayWithSocialPracticeNotCovertIntoCourseRule, DisplayRule);

DisplayWithSocialPracticeNotCovertIntoCourseRule.prototype.generateDisplayData = function(creditCalculator, studiedCourses, dataAfterReplacement) {


    var courseCredits = creditCalculator.calculateCourseCredit(studiedCourses);

    var convertedSocialPractices = dataAfterReplacement.convertedSocialPracticesWithOnlyScoreIncrease.concat(dataAfterReplacement.convertedSocialPracticesWithCreditIncrease);
    var convertedSocialPracticeCredits = creditCalculator.calculateSocialPracticeCredit(convertedSocialPractices);


    return {
        courseCredits                 : courseCredits,
        convertedSocialPracticeCredits: convertedSocialPracticeCredits
    };
};

module.exports = DisplayWithSocialPracticeNotCovertIntoCourseRule;