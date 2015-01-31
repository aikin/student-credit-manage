"use strict";

var _ = require("lodash");

function ScheduleDataProvider() {
    // TODO promote parameter to be attr
}

ScheduleDataProvider.prototype.fetchCourseCredits = function(detailStudiedCourses) {

    // TODO extract calculator to calculate schedule data
    var courseCredits = {};

    for (var i = 0, max = detailStudiedCourses.length; i < max; i++) {
        if (detailStudiedCourses[i].score >= detailStudiedCourses[i].passLine) {

            courseCredits[detailStudiedCourses[i].type] =

                    courseCredits[detailStudiedCourses[i].type] !== undefined
                    ? courseCredits[detailStudiedCourses[i].type] + detailStudiedCourses[i].credit
                    : 0 + detailStudiedCourses[i].credit;
        }
    }
    return courseCredits;

};

ScheduleDataProvider.prototype.fetchDetailCreditsInfo = function(replacementRule, detailStudiedCourses, passSocialPractices) {

    var dataAfterReplacement           = replacementRule.replace(detailStudiedCourses, passSocialPractices);
    var totalCredits                   = this.fetchCourseCredits(dataAfterReplacement.studiedCoursesAfterReplace);
    var convertedSocialPracticeCredits = { obligatory: 2, elective: 2 };

    return {
        convertedSocialPracticeCredits : convertedSocialPracticeCredits,
        totalCredits                   : totalCredits,
        shortageCredits                : {}
    };
};

module.exports = ScheduleDataProvider;