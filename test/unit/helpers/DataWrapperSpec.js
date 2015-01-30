var should      = require('chai').should();
var testUtils   = require('../../utils');
var DataWrapper = require('../../../core/helpers/DataWrapper');

describe('data wrapper spec', function() {

    var allCourses;
    var allSocialPractices;
    var studiedCourses;
    var studiedSocialPractices;

    beforeEach(function() {

        allCourses             = testUtils.dataGiven.courses;
        allSocialPractices     = testUtils.dataGiven.socialPractices;
        studiedCourses         = testUtils.dataGiven.southHarmonSchoolReport.studiedCourses;
        studiedSocialPractices = testUtils.dataGiven.southHarmonSchoolReport.studiedSocialPractices;
    });

    afterEach(function() {

        allCourses             = null;
        allSocialPractices     = null;
        studiedCourses         = null;
        studiedSocialPractices = null;
    });

    it('should return correct structure studiedCourses after wrapper', function() {


        var expectResult = testUtils.dataGiven.detailStudiedCourses;
        var dataWrapper  = new DataWrapper();

        dataWrapper
            .wrapperObjectWithDetail(studiedCourses, allCourses)
            .should.eql(expectResult);
    });

    it('should wrapper social practice with replaceableCourse', function() {


        var expectResult = testUtils.dataGiven.detailStudiedSocialPractices;
        var dataWrapper  = new DataWrapper();

        var detailStudiedSocialPractices = dataWrapper.wrapperObjectWithDetail(studiedSocialPractices, allSocialPractices);

        dataWrapper
            .wrapperStudiedSocialPracticesWithDetailReplaceableCourse(detailStudiedSocialPractices, allCourses)
            .should.eql(expectResult);
    });

});