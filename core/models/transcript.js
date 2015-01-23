function Transcript(college, studiedCourses, studiedSocialPractices) {

    this.college                = college;
    this.studiedCourses         = studiedCourses;
    this.studiedSocialPractices = studiedSocialPractices;
}

Transcript.prototype.fetchCourseCredits = function(allCourses) {

    var courseCredits = {};
    for (var i = 0, max = this.studiedCourses.length; i < max; i++) {

        for (var j = 0; j < allCourses.length; j++) {

            if (this.studiedCourses[i].courseId === allCourses[j].courseId
                && this.studiedCourses[i].score >= allCourses[j].passLine) {

                if (!courseCredits[allCourses[j].type]) {
                    courseCredits[allCourses[j].type] = 0;
                }
                courseCredits[allCourses[j].type] += allCourses[j].credit;
            }
        }
    }
    return courseCredits;
};

module.exports = Transcript;