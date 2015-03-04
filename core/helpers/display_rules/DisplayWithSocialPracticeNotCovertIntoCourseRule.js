'use strict';

var util        = require('util');
var DisplayRule = require('./DisplayRule');

function DisplayWithSocialPracticeNotCovertIntoCourseRule() {
    DisplayRule.call(this);
}

util.inherits(DisplayWithSocialPracticeNotCovertIntoCourseRule, DisplayRule);

DisplayWithSocialPracticeNotCovertIntoCourseRule.prototype.generateDisplayData = function(studiedCourses, dataAfterReplacement) {

    var convertedSocialPracticesWithOnlyScoreIncrease = dataAfterReplacement.convertedSocialPracticesWithOnlyScoreIncrease;
    var convertedSocialPracticesWithCreditIncrease = dataAfterReplacement.convertedSocialPracticesWithCreditIncrease;
    var courseCredits = {obligatory: 0, elective: 0};
    var convertedSocialPracticeCredits = {obligatory: 0, elective: 0};

    for (var item in studiedCourses) {
        if (studiedCourses[item].score >= studiedCourses[item].passLine) {
            courseCredits[studiedCourses[item].type] += studiedCourses[item].credit;
        }
    }

    for (var i = 0, max = convertedSocialPracticesWithOnlyScoreIncrease.length; i < max; i++) {
        convertedSocialPracticeCredits[convertedSocialPracticesWithOnlyScoreIncrease[i].replaceableCourse.type] += convertedSocialPracticesWithOnlyScoreIncrease[i].replaceableCourse.credit;
    }

    for (var i = 0, max = convertedSocialPracticesWithCreditIncrease.length; i < max; i++) {
        convertedSocialPracticeCredits[convertedSocialPracticesWithCreditIncrease[i].replaceableCourse.type] += convertedSocialPracticesWithCreditIncrease[i].replaceableCourse.credit;
    }

    //console.log(studiedCourses);
    //console.log(dataAfterReplacement);

    return {
        courseCredits                 : courseCredits,
        convertedSocialPracticeCredits: convertedSocialPracticeCredits
    };
};

module.exports = DisplayWithSocialPracticeNotCovertIntoCourseRule;