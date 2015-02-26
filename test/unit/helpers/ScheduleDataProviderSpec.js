"use strict";

var should               = require('chai').should();
var testUtils            = require('../../utils/index');
var ScheduleDataProvider = require('../../../core/helpers/ScheduleDataProvider');

describe('schedule data provider spec', function() {

    var southHarmonSchoolReport;
    var detailStudiedCourses;
    var detailStudiedSocialPractices;
    var dataAfterReplacement;
    var southHarmonBaseline;

    beforeEach(function() {

        southHarmonSchoolReport      = testUtils.dataGiven.southHarmonSchoolReport;
        detailStudiedCourses         = testUtils.dataGiven.detailStudiedCourses;
        detailStudiedSocialPractices = testUtils.dataGiven.detailStudiedSocialPractices;
        dataAfterReplacement         = testUtils.dataGiven.dataAfterReplacement;
        southHarmonBaseline          = testUtils.dataGiven.southHarmonBaseline;
    });

    afterEach(function() {

        southHarmonSchoolReport      = null;
        detailStudiedCourses         = null;
        detailStudiedSocialPractices = null;
        dataAfterReplacement         = null;
        southHarmonBaseline          = null;
    });


    it('should fetch correct total credits', function() {

        var scheduleDataProvider = new ScheduleDataProvider();

        scheduleDataProvider
            .fetchTotalCredits(dataAfterReplacement.studiedCoursesAfterReplace)
            .should.eql({ obligatory: 6, elective: 4 });
    });

    it('should fetch correct shortage credits', function() {

        var scheduleDataProvider = new ScheduleDataProvider();
        var totalCredits = scheduleDataProvider.fetchTotalCredits(dataAfterReplacement.studiedCoursesAfterReplace);

        scheduleDataProvider
            .fetchShortageCredits(totalCredits, southHarmonBaseline)
            .should.eql({ obligatory: 24, elective: 16 });
    });

    it('should fetch correct average score', function() {

        var scheduleDataProvider = new ScheduleDataProvider();

        scheduleDataProvider
            .fetchAverageScore(dataAfterReplacement.studiedCoursesAfterReplace)
            .should.eql(Number(80).toFixed(1));
    });


    it('should fetch correct converted credits of studied social practices ', function() {

        // TODO use sinon mock
        // mock SouthHarmonReplacementRule
        function SouthHarmonReplacementRule() {}
        SouthHarmonReplacementRule.prototype.replace = function(studiedCoursesBeforeReplace, passSocialPractices) {
            return testUtils.dataGiven.dataAfterReplacement;

        };

        // mock ReplacementRuleFactory
        function ReplacementRuleFactory() {}
        ReplacementRuleFactory.createReplacementRule = function(college) {
            return new SouthHarmonReplacementRule();
        };


        var replacementRule      = ReplacementRuleFactory.createReplacementRule(southHarmonSchoolReport.college);
        var scheduleDataProvider = new ScheduleDataProvider();
        var detailCreditsInfo    = scheduleDataProvider.fetchDetailCreditsInfo(replacementRule, detailStudiedCourses, detailStudiedSocialPractices);

        var expectResult = {
            convertedSocialPracticeCredits : { obligatory: 2, elective: 2 },
            totalCredits                   : { obligatory: 6, elective: 4 },
            shortageCredits                : {}
        };

        detailCreditsInfo.should.eql(expectResult);
    });

});
