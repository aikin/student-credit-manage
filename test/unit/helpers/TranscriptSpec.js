var should     = require('chai').should();
var testUtils  = require('../../utils');
var Transcript = require('../../../core/models/Transcript');

describe('transcript test', function() {

    var allCourses;
    var allSocialPractices;
    var southHarmonTranscript;

    beforeEach(function() {

        allCourses = testUtils.dataGiven.courses;
        allSocialPractices = testUtils.dataGiven.socialPractices;
        southHarmonTranscript = testUtils.dataGiven.southHarmonTranscript;
    });

    afterEach(function() {

        allCourses            = null;
        allSocialPractices    = null;
        southHarmonTranscript = null;
    });


    it('should fetch correct studied course credits', function() {

        var transcript = new Transcript(

            southHarmonTranscript.college,
            southHarmonTranscript.studiedCourses,
            southHarmonTranscript.studiedSocialPractices
        );

        transcript.fetchCourseCredits(allCourses).should.eql({ obligatory: 4, elective: 2 });
    });
});