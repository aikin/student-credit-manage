"use strict";

var should                                           = require('chai').should();
var testUtils                                        = require('../../utils/index');
var ScheduleDataProvider                             = require('../../../core/helpers/ScheduleDataProvider');
var CreditCalculator                                 = require('../../../core/helpers/CreditCalculator');
var ScoreCalculator                                  = require('../../../core/helpers/ScoreCalculator');
var DisplayWithSocialPracticeNotCovertIntoCourseRule = require('../../../core/helpers/display_rules/DisplayWithSocialPracticeNotCovertIntoCourseRule');

describe('schedule data provider spec', function() {

    var detailStudiedCourses;
    var dataAfterReplacement;
    var southHarmonBaseline;
    var scheduleDataProvider;

    beforeEach(function() {

        detailStudiedCourses = testUtils.dataGiven.detailStudiedCourses;
        dataAfterReplacement = testUtils.dataGiven.dataAfterReplacement;
        southHarmonBaseline  = testUtils.dataGiven.southHarmonBaseline;
        scheduleDataProvider = new ScheduleDataProvider(new CreditCalculator());
    });

    afterEach(function() {

        detailStudiedCourses = null;
        dataAfterReplacement = null;
        southHarmonBaseline  = null;
        scheduleDataProvider = null;
    });


    it('should fetch correct total credits', function() {

        scheduleDataProvider
            .fetchTotalCredits(dataAfterReplacement.studiedCoursesAfterReplace)
            .should.eql({ obligatory: 6, elective: 4 });
    });

    it('should fetch correct shortage credits', function() {

        var totalCredits = scheduleDataProvider.fetchTotalCredits(dataAfterReplacement.studiedCoursesAfterReplace);

        scheduleDataProvider
            .fetchShortageCredits(totalCredits, southHarmonBaseline)
            .should.eql({ obligatory: 24, elective: 16 });
    });

    it('should fetch correct average score', function() {

        scheduleDataProvider
            .fetchAverageScore(new ScoreCalculator(), dataAfterReplacement.studiedCoursesAfterReplace)
            .should.eql(Number(80).toFixed(1));
    });


    it('should fetch correct credits after display rule handle', function() {

        var expectResult = {
            courseCredits                 : {obligatory: 4, elective: 2},
            convertedSocialPracticeCredits: {obligatory: 2, elective: 2}
        };
        scheduleDataProvider.fetchCreditsAfterDisplayRuleHandle(new DisplayWithSocialPracticeNotCovertIntoCourseRule(), detailStudiedCourses, dataAfterReplacement)
            .should.eql(expectResult);
    });

});
