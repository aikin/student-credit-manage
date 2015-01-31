"use strict";

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
        SouthHarmonReplacementRule.prototype.replace = function(studiedCoursesBeforeReplace, passSocialPractices) {
            module.exports = [
                {
                    id                : 'SP111',
                    name              : '实践2',
                    replaceableCourse : {
                        id       : 'C113',
                        name     : '课程D',
                        credit   : 2,
                        type     : 'obligatory',
                        passLine : 60
                    },
                    passLine          : 60,
                    score             : 70
                },

                {
                    id                : 'SP112',
                    name              : '实践3',
                    replaceableCourse : {
                        id       : 'C111',
                        name     : '课程B',
                        credit   : 2,
                        type     : 'elective',
                        passLine : 60
                    },
                    passLine          : 60,
                    score             : 90
                }
            ];

            module.exports = [
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
                },
                {
                    id       : 'C115',
                    name     : '课程F',
                    credit   : 4,
                    type     : 'obligatory',
                    passLine : 60
                },
                {
                    id       : 'C111',
                    name     : '课程B',
                    credit   : 2,
                    type     : 'elective',
                    passLine : 60
                }
            ];

        };

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
            totalCredits                   : {},
            shortageCredits                : {}
        };

        detailCreditsInfo.should.eql(expectResult);
    });

});
