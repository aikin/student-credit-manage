"use strict";

var should                                           = require('chai').should();
var testUtils                                        = require('../../utils');
var SchoolReport                                     = require('../../../core/models/SchoolReport');
var DataWrapper                                      = require('../../../core/helpers/DataWrapper');
var ReplacementRuleFactory                           = require('../../../core/helpers/replacement_rules/ReplacementRuleFactory');
var CreditCalculator                                 = require('../../../core/helpers/CreditCalculator');
var ScoreCalculator                                  = require('../../../core/helpers/ScoreCalculator');
var DisplayWithSocialPracticeNotCovertIntoCourseRule = require('../../../core/helpers/display_rules/DisplayWithSocialPracticeNotCovertIntoCourseRule');
var ScheduleDataProvider                             = require('../../../core/helpers/ScheduleDataProvider');
var ScheduleGenerator                                = require('../../../core/helpers/ScheduleGenerator');

describe('schedule generator test', function() {

    var allCourses;
    var allSocialPractices;
    var southHarmonSchoolReport;
    var southHarmonBaseline;

    before(function() {

        allCourses              = testUtils.dataGiven.courses;
        allSocialPractices      = testUtils.dataGiven.socialPractices;
        southHarmonSchoolReport = testUtils.dataGiven.southHarmonSchoolReport;
        southHarmonBaseline     = testUtils.dataGiven.southHarmonBaseline;
    });

    after(function() {

        allCourses              = null;
        allSocialPractices      = null;
        southHarmonSchoolReport = null;
        southHarmonBaseline     = null;
    });

    it('should return correct south harmon schedule', function() {

        var dataWrapper  = new DataWrapper();
        var schoolReport = new SchoolReport(

            southHarmonSchoolReport.college,
            southHarmonSchoolReport.studiedCourses,
            southHarmonSchoolReport.studiedSocialPractices
        );
        var detailStudiedCourses         = schoolReport.fetchDetailStudiedCourses(dataWrapper, allCourses);
        var detailStudiedSocialPractices = schoolReport.fetchDetailStudiedSocialPracticesWithReplaceableCourse(dataWrapper, allCourses, allSocialPractices);
        var coursesAfterClassify         = schoolReport.classifyStudiedCourses(dataWrapper, detailStudiedCourses);
        var passSocialPractices          = schoolReport.fetchPassSocialPractices(dataWrapper, detailStudiedSocialPractices);


        var dataAfterReplacement =
                ReplacementRuleFactory
                    .createReplacementRule(southHarmonSchoolReport.college)
                    .replace(coursesAfterClassify, passSocialPractices);

        var scheduleDataProvider = new ScheduleDataProvider(new CreditCalculator());

        var totalCredits             = scheduleDataProvider.fetchTotalCredits(dataAfterReplacement.studiedCoursesAfterReplace);
        var shortageCredits          = scheduleDataProvider.fetchShortageCredits(totalCredits, southHarmonBaseline);
        var averageScore             = scheduleDataProvider.fetchAverageScore(new ScoreCalculator(), dataAfterReplacement.studiedCoursesAfterReplace);
        var courseAndPracticeCredits = scheduleDataProvider.fetchCreditsAfterDisplayRuleHandle(new DisplayWithSocialPracticeNotCovertIntoCourseRule(), detailStudiedCourses, dataAfterReplacement);



        var scheduleGenerator = new ScheduleGenerator(

            southHarmonSchoolReport.college,
            courseAndPracticeCredits.courseCredits,
            courseAndPracticeCredits.convertedSocialPracticeCredits,
            totalCredits,
            shortageCredits,
            southHarmonBaseline.averageLine,
            averageScore
        );

        var expectSchedule    =

                '***<南哈蒙理工大学>学分明细***' +
                '----------------------' +
                '已修课程学分：' +
                '必修：4' +
                '选修：2' +
                '----------------------' +
                '社会实践：' +
                '已折算成必修课的学分：2' +
                '已折算成选修课的学分：2' +
                '----------------------' +
                '已获得的总学分：' +
                '必修：6' +
                '选修：4' +
                '离顺利毕业还差学分：' +
                '必修：24' +
                '选修：16' +
                '----------------------' +
                '顺利毕业的所有课程平均分基线：78' +
                '当前所有课程平均分：80.0' +
                '**********************';

        scheduleGenerator.generate().should.eql(expectSchedule);
    });
});