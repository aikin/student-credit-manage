"use strict";

function SchoolReport(college, studiedCourses, studiedSocialPractices) {

    this.college                = college;
    this.studiedCourses         = studiedCourses;
    this.studiedSocialPractices = studiedSocialPractices;
}


SchoolReport.prototype.fetchDetailStudiedCourses = function(dataWrapper, allCourses) {

    return dataWrapper.wrapperObjectWithDetail(this.studiedCourses, allCourses);
};

SchoolReport.prototype.fetchDetailStudiedSocialPracticesWithReplaceableCourse = function(dataWrapper, allCourses, allSocialPractices) {

    var detailStudiedSocialPractices = dataWrapper.wrapperObjectWithDetail(this.studiedSocialPractices, allSocialPractices);
    return dataWrapper.wrapperStudiedSocialPracticesWithDetailReplaceableCourse(detailStudiedSocialPractices, allCourses)
};

SchoolReport.prototype.fetchPassSocialPractices = function(dataWrapper, detailStudiedSocialPractices) {

    return dataWrapper.classifyPassAndNotPass(detailStudiedSocialPractices).pass;
};

SchoolReport.prototype.classifyStudiedCourses = function(dataWrapper, detailStudiedCourses) {

    return dataWrapper.classifyPassAndNotPass(detailStudiedCourses);
};

module.exports = SchoolReport;
