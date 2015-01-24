var _ = require('lodash');

function TranscriptWrapper(studiedCourses, studiedSocialPractices, allCourses, allSocialPractices) {

    this.studiedCourses         = studiedCourses;
    this.studiedSocialPractices = studiedSocialPractices;
    this.allCourses             = allCourses;
    this.allSocialPractices     = allSocialPractices;
}

TranscriptWrapper.prototype.fetchDetailStudiedCourses = function() {

    var detailStudiedCourses = [];

    for (var i = 0, max = this.studiedCourses.length; i < max; i++) {
        for (var j = 0, allCoursesLength = this.allCourses.length; j < allCoursesLength; j++) {
            if (this.studiedCourses[i].id === this.allCourses[j].id) {

                var studiedCourse   = _.clone(this.allCourses[j]);
                studiedCourse.score = this.studiedCourses[i].score;
                detailStudiedCourses.push(studiedCourse);
            }
        }
    }
    return detailStudiedCourses;
};

module.exports = TranscriptWrapper;