function Transcript(college, studiedCourses, studiedSocialPractices) {

    this.college                = college;
    this.studiedCourses         = studiedCourses;
    this.studiedSocialPractices = studiedSocialPractices;
}

module.exports = Transcript;


Transcript.prototype.fetchStudiedCoursesAfterWrapper = function(dataWrapper, allCourses) {
    return dataWrapper.wrapperObjectWithDetail(this.studiedCourses, allCourses);
};