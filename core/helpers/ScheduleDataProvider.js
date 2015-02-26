"use strict";

var _ = require("lodash");

function ScheduleDataProvider() {
    // TODO promote parameter to be attr
}

ScheduleDataProvider.prototype.fetchTotalCredits = function(studiedCoursesAfterReplace) {

    // TODO extract calculator to calculate schedule data
    var totalCredits = { obligatory: 0, elective: 0 };

    for (var i = 0, max = studiedCoursesAfterReplace.length; i < max; i++) {
        if (studiedCoursesAfterReplace[i].score >= studiedCoursesAfterReplace[i].passLine) {
            totalCredits[studiedCoursesAfterReplace[i].type] += studiedCoursesAfterReplace[i].credit;
        }
    }
    return totalCredits;
};

ScheduleDataProvider.prototype.fetchShortageCredits = function(totalCredits, baseline) {

    var shortageCredits = { obligatory: 0, elective: 0 };

    shortageCredits.obligatory = baseline.creditLine.obligatory - totalCredits.obligatory;
    shortageCredits.elective   = baseline.creditLine.elective - totalCredits.elective;
    return shortageCredits;
};

ScheduleDataProvider.prototype.fetchAverageScore = function(studiedCoursesAfterReplace) {

    var sum = 0;
    var maxLength = studiedCoursesAfterReplace.length;

    for (var i = 0; i < maxLength; i++) {
        sum += studiedCoursesAfterReplace[i].score;
    }
    return (sum / maxLength).toFixed(1);
};

ScheduleDataProvider.prototype.fetchDetailCreditsInfo = function(replacementRule, detailStudiedCourses, passSocialPractices) {

    var dataAfterReplacement           = replacementRule.replace(detailStudiedCourses, passSocialPractices);
    var totalCredits                   = this.fetchTotalCredits(dataAfterReplacement.studiedCoursesAfterReplace);
    var convertedSocialPracticeCredits = { obligatory: 2, elective: 2 };

    return {
        convertedSocialPracticeCredits : convertedSocialPracticeCredits,
        totalCredits                   : totalCredits,
        shortageCredits                : {}
    };
};

module.exports = ScheduleDataProvider;