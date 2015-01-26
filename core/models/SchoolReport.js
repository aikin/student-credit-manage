function SchoolReport(college, studiedCourses, studiedSocialPractices) {

    this.college                = college;
    this.studiedCourses         = studiedCourses;
    this.studiedSocialPractices = studiedSocialPractices;
}


SchoolReport.prototype.fetchStudiedCoursesAfterWrapper = function(dataWrapper, allCourses) {
    return dataWrapper.wrapperObjectWithDetail(this.studiedCourses, allCourses);
};

SchoolReport.prototype.fetchStudiedSocialPracticesAfterWrapper = function(dataWrapper, allSocialPractices) {
    return dataWrapper.wrapperObjectWithDetail(this.studiedSocialPractices, allSocialPractices);
};

module.exports = SchoolReport;
