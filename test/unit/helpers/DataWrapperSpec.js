var should      = require('chai').should();
var testUtils   = require('../../utils');
var DataWrapper = require('../../../core/helpers/DataWrapper');

describe('data  wrapper spec', function() {

    var allCourses;
    var studiedCourses;

    beforeEach(function() {

        allCourses     = testUtils.dataGiven.courses;
        studiedCourses = testUtils.dataGiven.southHarmonSchoolReport.studiedCourses;
    });

    afterEach(function() {

        allCourses     = null;
        studiedCourses = null;
    });

    it('should return correct structure studiedCourses after wrapper', function() {


        var expectResult = testUtils.dataGiven.detailStudiedCourses;
        var dataWrapper  = new DataWrapper();

        dataWrapper
            .wrapperObjectWithDetail(studiedCourses, allCourses)
            .should.eql(expectResult);
    });

});