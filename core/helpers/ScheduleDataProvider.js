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

ScheduleDataProvider.prototype.fetchConvertedSocialPracticeCredits = function(replacementRule, studiedCourses, studiedSocialPractices, allCourses, allSocialPractices) {

    return { obligatory: 2, elective: 2 };
};

module.exports = ScheduleDataProvider;