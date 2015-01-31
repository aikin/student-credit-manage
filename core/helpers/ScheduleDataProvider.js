"use strict";

var _ = require("lodash");

function ScheduleDataProvider() {
}

ScheduleDataProvider.prototype.fetchCourseCredits = function(detailStudiedCourses) {


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

ScheduleDataProvider.prototype.fetchDetailCreditsInfo = function(replacementRule, detailStudiedCourses, detailsStudiedSocialPractices) {

    // TODO extract function can filter pass social practice
    var passSocialPractices = [];

    for (var i = 0, max = detailsStudiedSocialPractices.length; i < max; i++) {
        if (detailsStudiedSocialPractices[i].score >= detailsStudiedSocialPractices[i].passLine) {
            var passSocialPractice = _.clone(detailsStudiedSocialPractices[i]);
            passSocialPractices.push(passSocialPractice);
        }
    }

    var studiedCoursesAfterReplace = replacementRule.replace(detailStudiedCourses, passSocialPractice);



    var expectResult = {
        convertedSocialPracticeCredits : { obligatory: 2, elective: 2 },
        totalCredits                   : {},
        shortageCredits                : {}
    };

    return expectResult;
};

module.exports = ScheduleDataProvider;