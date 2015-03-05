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

ScheduleDataProvider.prototype.fetchCreditsAfterDisplayRuleHandle = function(displayRule, studiedCourses, dataAfterReplacement) {

    return displayRule.generateDisplayData(this.creditCalculator, studiedCourses, dataAfterReplacement);
};

module.exports = ScheduleDataProvider;