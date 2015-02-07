"use strict";

var should      = require('chai').should();
var testUtils   = require('../../utils');
var DataWrapper = require('../../../core/helpers/DataWrapper');

describe('data wrapper spec', function() {

    var allCourses;
    var allSocialPractices;
    var studiedCourses;
    var studiedSocialPractices;
    var detailStudiedCourses;

    beforeEach(function() {

        allCourses             = testUtils.dataGiven.courses;
        allSocialPractices     = testUtils.dataGiven.socialPractices;
        studiedCourses         = testUtils.dataGiven.southHarmonSchoolReport.studiedCourses;
        studiedSocialPractices = testUtils.dataGiven.southHarmonSchoolReport.studiedSocialPractices;
        detailStudiedCourses   = testUtils.dataGiven.detailStudiedCourses;
    });

    afterEach(function() {

        allCourses             = null;
        allSocialPractices     = null;
        studiedCourses         = null;
        studiedSocialPractices = null;
        detailStudiedCourses   = null;
    });

    it('should return correct structure studiedCourses after wrapper', function() {

        var dataWrapper  = new DataWrapper();

        dataWrapper
            .wrapperObjectWithDetail(studiedCourses, allCourses)
            .should.eql(detailStudiedCourses);
    });

    it('should wrapper social practice with replaceableCourse', function() {


        var expectResult = testUtils.dataGiven.detailStudiedSocialPractices;
        var dataWrapper  = new DataWrapper();

        var detailStudiedSocialPractices = dataWrapper.wrapperObjectWithDetail(studiedSocialPractices, allSocialPractices);

        dataWrapper
            .wrapperStudiedSocialPracticesWithDetailReplaceableCourse(detailStudiedSocialPractices, allCourses)
            .should.eql(expectResult);
    });

    it('should filter not pass info', function() {


        var expectResult = [
            { id: 'C110', name: '课程A', credit: 2, type: 'elective',   passLine: 60, score: 80 },
            { id: 'C114', name: '课程E', credit: 4, type: 'obligatory', passLine: 60, score: 80 }
        ];
        var dataWrapper  = new DataWrapper();

        dataWrapper.classifyPassAndNotPass(detailStudiedCourses).pass.should.eql(expectResult);
    });

});
