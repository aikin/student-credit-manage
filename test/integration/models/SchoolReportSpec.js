"use strict";

var should        = require('chai').should();
var testUtils     = require('../../utils/index');
var SchoolReport  = require('../../../core/models/SchoolReport');
var DataWrapper   = require('../../../core/helpers/DataWrapper');

describe('school report spec', function() {

    var allCourses;
    var allSocialPractices;
    var southHarmonSchoolReport;
    var detailStudiedCourses;
    var detailStudiedSocialPractices;
    var passSocialPractices;
    var coursesAfterClassify;

    beforeEach(function() {

        allCourses                   = testUtils.dataGiven.courses;
        allSocialPractices           = testUtils.dataGiven.socialPractices;
        southHarmonSchoolReport      = testUtils.dataGiven.southHarmonSchoolReport;
        detailStudiedCourses         = testUtils.dataGiven.detailStudiedCourses;
        detailStudiedSocialPractices = testUtils.dataGiven.detailStudiedSocialPractices;
        passSocialPractices          = testUtils.dataGiven.passSocialPractices;
        coursesAfterClassify         = testUtils.dataGiven.coursesAfterClassify;
    });

    afterEach(function() {

        allCourses                   = null;
        allSocialPractices           = null;
        southHarmonSchoolReport      = null;
        detailStudiedCourses         = null;
        detailStudiedSocialPractices = null;
        passSocialPractices          = null;
        coursesAfterClassify         = null;
    });


    it('should fetch detail studied courses after wrapper', function() {

        var dataWrapper  = new DataWrapper();
        var schoolReport = new SchoolReport(

            southHarmonSchoolReport.college,
            southHarmonSchoolReport.studiedCourses,
            southHarmonSchoolReport.studiedSocialPractices
        );

        schoolReport
            .fetchDetailStudiedCourses(dataWrapper, allCourses)
            .should.eql(detailStudiedCourses);
    });

    it('should fetch detail studied social practices after wrapper', function() {

        var dataWrapper  = new DataWrapper();
        var schoolReport = new SchoolReport(

            southHarmonSchoolReport.college,
            southHarmonSchoolReport.studiedCourses,
            southHarmonSchoolReport.studiedSocialPractices
        );

        schoolReport
            .fetchDetailStudiedSocialPracticesWithReplaceableCourse(dataWrapper, allCourses, allSocialPractices)
            .should.eql(detailStudiedSocialPractices);
    });

    it('should fetch pass social practices', function() {


        var dataWrapper  = new DataWrapper();
        var schoolReport = new SchoolReport(

            southHarmonSchoolReport.college,
            southHarmonSchoolReport.studiedCourses,
            southHarmonSchoolReport.studiedSocialPractices
        );

        schoolReport
            .fetchPassSocialPractices(dataWrapper, detailStudiedSocialPractices)
            .should.eql(passSocialPractices);
    });

    it('should fetch pass course', function() {

        var dataWrapper  = new DataWrapper();
        var schoolReport = new SchoolReport(

            southHarmonSchoolReport.college,
            southHarmonSchoolReport.studiedCourses,
            southHarmonSchoolReport.studiedSocialPractices
        );

        schoolReport
            .classifyStudiedCourses(dataWrapper, detailStudiedCourses)
            .should.eql(coursesAfterClassify);
    });

});