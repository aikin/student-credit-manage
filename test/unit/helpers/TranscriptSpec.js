var should      = require('chai').should();
var testUtils   = require('../../utils');
var Transcript  = require('../../../core/models/Transcript.js');

describe('transcript spec', function() {

    var allCourses;
    var allSocialPractices;
    var southHarmonTranscript;

    beforeEach(function() {

        allCourses            = testUtils.dataGiven.courses;
        allSocialPractices    = testUtils.dataGiven.socialPractices;
        southHarmonTranscript = testUtils.dataGiven.southHarmonTranscript;
    });

    afterEach(function() {

        allCourses            = null;
        allSocialPractices    = null;
        southHarmonTranscript = null;
    });


    it('should fetch correct  credits of studied courses', function() {

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

        function DataWrapper() {}
        DataWrapper.prototype.wrapperObjectWithDetail = function(resealedData, dependData) {
            return expectResult;
        };

        var dataWrapper = new DataWrapper();

        var transcript = new Transcript(

            southHarmonTranscript.college,
            southHarmonTranscript.studiedCourses,
            southHarmonTranscript.studiedSocialPractices
        );

        transcript
            .fetchStudiedCoursesAfterWrapper(dataWrapper, allCourses)
            .should.eql(expectResult);
    });

    it('should fetch correct  credits of studied courses', function() {

        var expectResult = [
            {
                id                : 'SP110',
                name              : '实践1',
                replaceableCourse : 'C115',
                passLine          : 60,
                score             : 70
            },
            {
                id                : 'SP112',
                name              : '实践3',
                replaceableCourse : 'C111',
                passLine          : 60,
                score             : 90
            }
        ];

        function DataWrapper() {}
        DataWrapper.prototype.wrapperObjectWithDetail = function(resealedData, dependData) {
            return expectResult;
        };

        var dataWrapper = new DataWrapper();

        var transcript = new Transcript(

            southHarmonTranscript.college,
            southHarmonTranscript.studiedCourses,
            southHarmonTranscript.studiedSocialPractices
        );

        transcript
            .fetchStudiedSocialPracticesAfterWrapper(dataWrapper, allSocialPractices)
            .should.eql(expectResult);
    });

});