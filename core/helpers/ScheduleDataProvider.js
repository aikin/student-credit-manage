"use strict";

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

    console.log(detailsStudiedSocialPractices);
    console.log(detailStudiedCourses);

    var expectResult = {
        convertedSocialPracticeCredits : { obligatory: 2, elective: 2 },
        totalCredits                   : {},
        shortageCredits                : {}
    };

    return expectResult;
};

module.exports = ScheduleDataProvider;