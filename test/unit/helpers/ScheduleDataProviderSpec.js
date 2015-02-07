"use strict";

var should               = require('chai').should();
var testUtils            = require('../../utils/index');
var ScheduleDataProvider = require('../../../core/helpers/ScheduleDataProvider');

describe('schedule data provider spec', function() {

    var southHarmonSchoolReport;
    var detailStudiedCourses;
    var detailStudiedSocialPractices;

    beforeEach(function() {

        southHarmonSchoolReport      = testUtils.dataGiven.southHarmonSchoolReport;
        detailStudiedCourses         = testUtils.dataGiven.detailStudiedCourses;
        detailStudiedSocialPractices = testUtils.dataGiven.detailStudiedSocialPractices;
    });

    afterEach(function() {

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
