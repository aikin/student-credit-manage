var should     = require('chai').should();
var testUtils  = require('../../utils');
var Transcript = require('../../../core/models/Transcript');

describe('transcript test', function() {

    var southHarmonTranscript;

    beforeEach(function() {

        southHarmonTranscript = testUtils.dataGiven.southHarmonTranscript;
    });


    it('should fetch correct studied course credits', function() {

        var transcript = new Transcript(

            southHarmonTranscript.college,
            southHarmonTranscript.studiedCourses,
            southHarmonTranscript.studiedSocialPractices
        );

        transcript.fetchCourseCredits().should.eql({ obligatory: 4, elective: 2 });
    });
});