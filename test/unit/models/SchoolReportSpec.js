var should        = require('chai').should();
var testUtils     = require('../../utils/index');
var SchoolReport  = require('../../../core/models/SchoolReport');

describe('school report spec', function() {

    var allCourses;
    var allSocialPractices;
    var southHarmonSchoolReport;

    beforeEach(function() {

        allCourses              = testUtils.dataGiven.courses;
        allSocialPractices      = testUtils.dataGiven.socialPractices;
        southHarmonSchoolReport = testUtils.dataGiven.southHarmonSchoolReport;
    });

    afterEach(function() {

        allCourses              = null;
        allSocialPractices      = null;
        southHarmonSchoolReport = null;
    });


    it('should fetch correct studied courses after wrapper', function() {

        var expectResult = testUtils.dataGiven.detailStudiedCourses;

        function DataWrapper() {}
        DataWrapper.prototype.wrapperObjectWithDetail = function(resealedData, dependData) {
            return expectResult;
        };

        var dataWrapper  = new DataWrapper();
        var schoolReport = new SchoolReport(

            southHarmonSchoolReport.college,
            southHarmonSchoolReport.studiedCourses,
            southHarmonSchoolReport.studiedSocialPractices
        );

        schoolReport
            .fetchStudiedCoursesAfterWrapper(dataWrapper, allCourses)
            .should.eql(expectResult);
    });

    it('should fetch correct studied social practices after wrapper', function() {

        var expectResult = testUtils.dataGiven.detailStudiedSocialPractices;

        function DataWrapper() {}
        DataWrapper.prototype.wrapperObjectWithDetail = function(resealedData, dependData) {
            return expectResult;
        };

        var dataWrapper  = new DataWrapper();
        var schoolReport = new SchoolReport(

            southHarmonSchoolReport.college,
            southHarmonSchoolReport.studiedCourses,
            southHarmonSchoolReport.studiedSocialPractices
        );

        schoolReport
            .fetchStudiedSocialPracticesAfterWrapper(dataWrapper, allSocialPractices)
            .should.eql(expectResult);
    });

});