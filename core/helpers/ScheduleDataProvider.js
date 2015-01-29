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
            if (studiedSocialPractices[i].id === allSocialPractices[j].id
                && studiedSocialPractices[i].score >= allSocialPractices[j].passLine) {

                // TODO 根据置换规则获取折算后的社会实践学分
            }
        }
    }

    return { obligatory: 2, elective: 2 };
};

module.exports = ScheduleDataProvider;