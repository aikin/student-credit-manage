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


    it('should fetch detail studied courses after wrapper', function() {

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
            .fetchDetailStudiedCourses(dataWrapper, allCourses)
            .should.eql(expectResult);
    });

    it('should fetch detail studied social practices after wrapper', function() {

        var expectResult = testUtils.dataGiven.detailStudiedSocialPractices;

        function DataWrapper() {}
        DataWrapper.prototype.wrapperObjectWithDetail = function(resealedData, dependData) {
            return [
                {id: 'SP110', name: '实践1', replaceableCourse: 'C115', passLine: 60},
                {id: 'SP112', name: '实践3', replaceableCourse: 'C111', passLine: 60 }
            ];
        };

        DataWrapper.prototype.wrapperStudiedSocialPracticesWithDetailReplaceableCourse = function() {
            return expectResult;
        };

        var dataWrapper  = new DataWrapper();
        var schoolReport = new SchoolReport(

            southHarmonSchoolReport.college,
            southHarmonSchoolReport.studiedCourses,
            southHarmonSchoolReport.studiedSocialPractices
        );

        schoolReport
            .fetchDetailStudiedSocialPracticesWithReplaceableCourse(dataWrapper, allCourses, allSocialPractices)
            .should.eql(expectResult);
    });

});