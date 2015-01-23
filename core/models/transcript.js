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

Transcript.prototype.fetchAverageScore = function() {

    var sum = 0;
    for (var i = 0, max = this.studiedCourses.length; i < max; i++) {
        sum += this.studiedCourses[i].score;
    }

    return sum / this.studiedCourses.length;
};

module.exports = Transcript;