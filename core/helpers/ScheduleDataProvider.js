"use strict";

function ScheduleDataProvider(creditCalculator) {

    this.creditCalculator = creditCalculator;
}

ScheduleDataProvider.prototype.fetchTotalCredits = function(studiedCoursesAfterReplace) {

    return this.creditCalculator.calculateCourseCredit(studiedCoursesAfterReplace);
};

ScheduleDataProvider.prototype.fetchShortageCredits = function(totalCredits, baseline) {

    return this.creditCalculator.calculateShortageCredit(totalCredits, baseline)
};

ScheduleDataProvider.prototype.fetchAverageScore = function(scoreCalculator, studiedCoursesAfterReplace) {

    return scoreCalculator.calculateAverageScore(studiedCoursesAfterReplace);
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