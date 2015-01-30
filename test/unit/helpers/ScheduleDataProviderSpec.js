var should               = require('chai').should();
var testUtils            = require('../../utils/index');
var ScheduleDataProvider = require('../../../core/helpers/ScheduleDataProvider');

describe('schedule data provider spec', function() {

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


    it('should fetch correct credits of studied courses', function() {

        var scheduleDataProvider = new ScheduleDataProvider();

        scheduleDataProvider
            .fetchCourseCredits(detailStudiedCourses)
            .should.eql({ obligatory: 4, elective: 2 });
    });


    it('should fetch correct converted credits of studied social practices ', function() {

        // mock SouthHarmonReplacementRule
        function SouthHarmonReplacementRule() {}
        SouthHarmonReplacementRule.prototype.replace = function() {};

        // mock ReplacementRuleFactory
        function ReplacementRuleFactory() {}
        ReplacementRuleFactory.createReplacementRule = function(college) {
            return new SouthHarmonReplacementRule();
        };


        var replacementRule      = ReplacementRuleFactory.createReplacementRule(southHarmonSchoolReport.college);
        var scheduleDataProvider = new ScheduleDataProvider();
        var detailCreditsInfo    = scheduleDataProvider.fetchDetailCreditsInfo(replacementRule, detailStudiedCourses, detailStudiedSocialPractices)

        var expectResult = {
            convertedSocialPracticeCredits : { obligatory: 2, elective: 2 },
            totalCredits : {},
            averageScore: {}
        };

        detailCreditsInfo.should.eql(expectResult);
    });

});
