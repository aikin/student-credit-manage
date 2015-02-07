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

    beforeEach(function() {

        allCourses                   = testUtils.dataGiven.courses;
        allSocialPractices           = testUtils.dataGiven.socialPractices;
        southHarmonSchoolReport      = testUtils.dataGiven.southHarmonSchoolReport;
        detailStudiedCourses         = testUtils.dataGiven.detailStudiedCourses;
        detailStudiedSocialPractices = testUtils.dataGiven.detailStudiedSocialPractices;
    });

    afterEach(function() {

        allCourses                   = null;
        allSocialPractices           = null;
        southHarmonSchoolReport      = null;
        detailStudiedCourses         = null;
        detailStudiedSocialPractices = null;
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

        var expectResult = detailStudiedSocialPractices;

        var dataWrapper  = new DataWrapper();
        var schoolReport = new SchoolReport(

            southHarmonSchoolReport.college,
            southHarmonSchoolReport.studiedCourses,
            southHarmonSchoolReport.studiedSocialPractices
        );

        schoolReport
            .fetchPassSocialPractices(dataWrapper, expectResult)
            .should.eql(detailStudiedSocialPractices);
    });

    it('should fetch pass course', function() {

        var expectResult = {
            pass: [
                {id: 'C110', name: '课程A', credit: 2, type: 'elective',   passLine: 60, score: 80},
                {id: 'C114', name: '课程E', credit: 4, type: 'obligatory', passLine: 60, score: 80}
            ],
            notPass: [{id: 'C113', name: '课程D', credit: 2, type: 'obligatory', passLine: 60, score: 50}]
        };


        var dataWrapper  = new DataWrapper();
        var schoolReport = new SchoolReport(

            southHarmonSchoolReport.college,
            southHarmonSchoolReport.studiedCourses,
            southHarmonSchoolReport.studiedSocialPractices
        );

        schoolReport
            .classifyStudiedCourses(dataWrapper, detailStudiedCourses)
            .should.eql(expectResult);
    });

});