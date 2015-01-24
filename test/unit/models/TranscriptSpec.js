var should     = require('chai').should();
var testUtils  = require('../../utils/index');
//var Transcript = require('../../../core/models/Transcript');

xdescribe('transcript test', function() {

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

        var transcript = new Transcript(

            southHarmonTranscript.college,
            southHarmonTranscript.studiedCourses,
            southHarmonTranscript.studiedSocialPractices
        );

        transcript.fetchCourseCredits(allCourses).should.eql({ obligatory: 4, elective: 2 });
    });

    it('should fetch correct average score of studied courses', function() {

        var transcript = new Transcript(

            southHarmonTranscript.college,
            southHarmonTranscript.studiedCourses,
            southHarmonTranscript.studiedSocialPractices
        );

        transcript.fetchAverageScore().should.eql(70);
    });

    it('should fetch correct converted credits of studied social practices ', function() {

        var transcript = new Transcript(

            southHarmonTranscript.college,
            southHarmonTranscript.studiedCourses,
            southHarmonTranscript.studiedSocialPractices
        );

        // mock SouthHarmonReplacementRule
        function SouthHarmonReplacementRule() {}
        SouthHarmonReplacementRule.prototype.replace = function() {};

        // mock ReplacementRuleFactory
        function ReplacementRuleFactory() {}
        ReplacementRuleFactory.create = function(college) { return new SouthHarmonReplacementRule() };


        var replacementRule = ReplacementRuleFactory.create(transcript.college);

        transcript.fetchConvertedSocialPracticeCredits(replacementRule, allCourses, allSocialPractices).should.eql({ obligatory: 2, elective: 2 });
    });
});