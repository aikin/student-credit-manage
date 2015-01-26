var should      = require('chai').should();
var testUtils   = require('../../utils');
var DataWrapper = require('../../../core/helpers/DataWrapper');


describe('data  wrapper', function() {

    var allCourses;
    var studiedCourses;

    beforeEach(function() {

        allCourses     = testUtils.dataGiven.courses;
        studiedCourses = testUtils.dataGiven.southHarmonTranscript.studiedCourses;
    });

    afterEach(function() {

        allCourses            = null;
        studiedCourses = null;
    });

    it('should return correct structure studiedCourses after wrapper', function() {


        var expectResult = [
            {
                id       : 'C110',
                name     : '课程A',
                credit   : 2,
                type     : 'elective',
                passLine : 60,
                score    : 80
            },
            {
                id       : 'C113',
                name     : '课程D',
                credit   : 2,
                type     : 'obligatory',
                passLine : 60,
                score    : 50
            },
            {
                id       : 'C114',
                name     : '课程E',
                credit   : 4,
                type     : 'obligatory',
                passLine : 60,
                score    : 80
            }
        ];

        var dataWrapper = new DataWrapper();

        dataWrapper
            .wrapperObjectWithDetail(studiedCourses, allCourses)
            .should.eql(expectResult);
    });

});