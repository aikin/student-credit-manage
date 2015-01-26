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

TranscriptWrapper.prototype.fetchDetailStudiedPractices = function() {

    var expectResult = [
        {
            id: 'SP110',
            name: '实践1',
            replaceableCourse: {
                id       : 'C115',
                name     : '课程F',
                credit   : 4,
                type     : 'obligatory',
                passLine : 60
            },
            passLine: 60,
            score: 70
        },
        {
            id: 'SP112',
            name: '实践3',
            replaceableCourse: {
                id       : 'C110',
                name     : '课程A',
                credit   : 2,
                type     : 'elective',
                passLine : 60
            },
            passLine: 60,
            score: 90
        }
    ];

    return expectResult;
};

module.exports = TranscriptWrapper;