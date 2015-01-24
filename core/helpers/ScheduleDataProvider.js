function ScheduleDataProvider() {
}

ScheduleDataProvider.prototype.fetchCourseCredits = function(studiedCourses, allCourses) {

    var courseCredits = {};
    for (var i = 0, max = studiedCourses.length; i < max; i++) {

        for (var j = 0; j < allCourses.length; j++) {

            if (studiedCourses[i].courseId === allCourses[j].courseId
                && studiedCourses[i].score >= allCourses[j].passLine) {

                if (!courseCredits[allCourses[j].type]) {
                    courseCredits[allCourses[j].type] = 0;
                }
                courseCredits[allCourses[j].type] += allCourses[j].credit;
            }
        }
    }
    return courseCredits;
};

ScheduleDataProvider.prototype.fetchAverageScore = function(studiedCourses) {

    var sum = 0;
    for (var i = 0, max = studiedCourses.length; i < max; i++) {
        sum += studiedCourses[i].score;
    }

    return sum / studiedCourses.length;
};

ScheduleDataProvider.prototype.fetchConvertedSocialPracticeCredits = function(replacementRule, studiedCourses, studiedSocialPractices, allCourses, allSocialPractices) {

    var convertedSocialPracticeCredits = {};

    for (var i = 0, max = studiedSocialPractices.length; i < max; i++) {

        for (var j = 0, practicesLength = allSocialPractices.length; j < practicesLength; j++) {
            if (studiedSocialPractices[i].socialPracticeId === allSocialPractices[j].socialPracticeId
                && studiedSocialPractices[i].score >= allSocialPractices[j].passLine) {

            }
        }
    }

    return { obligatory: 2, elective: 2 };
};

module.exports = ScheduleDataProvider;