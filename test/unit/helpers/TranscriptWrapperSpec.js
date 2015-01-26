var should            = require('chai').should();
var testUtils         = require('../../utils');
var TranscriptWrapper = require('../../../core/helpers/TranscriptWrapper');


describe('transcript wrapper', function() {

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

    it('should fetch correct structure studiedCourses after wrapper', function() {

        var transcriptWrapper = new TranscriptWrapper(

            southHarmonTranscript.studiedCourses,
            southHarmonTranscript.studiedSocialPractices,
            allCourses,
            allSocialPractices
        );

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

        transcriptWrapper
            .fetchDetailStudiedCourses()
            .should.eql(expectResult);
    });

    it('should fetch correct structure studiedPractices after wrapper', function() {

        var transcriptWrapper = new TranscriptWrapper(

            southHarmonTranscript.studiedCourses,
            southHarmonTranscript.studiedSocialPractices,
            allCourses,
            allSocialPractices
        );

        var expectResult = [
            {
                id: 'SP110',
                name: '实践1',
                replaceableCourse: {
                    id       : 'C115',
                    name     : '课程F',
                    credit   : 4,
                    type     : 'obligatory',
                    passLine : 60
                },
                passLine: 60,
                score: 70
            },
            {
                id: 'SP112',
                name: '实践3',
                replaceableCourse: {
                    id       : 'C110',
                    name     : '课程A',
                    credit   : 2,
                    type     : 'elective',
                    passLine : 60
                },
                passLine: 60,
                score: 90
            }
        ];

        transcriptWrapper
            .fetchDetailStudiedPractices()
            .should.eql(expectResult);
    });

});