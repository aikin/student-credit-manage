var should               = require('chai').should();
var testUtils            = require('../../utils/index');
var ScheduleDataProvider = require('../../../core/helpers/ScheduleDataProvider');

describe('schedule data provider spec', function() {

    var allCourses;
    var allSocialPractices;
    var southHarmonSchoolReport;

    beforeEach(function() {

        allCourses              = testUtils.dataGiven.courses;
        allSocialPractices      = testUtils.dataGiven.socialPractices;
        southHarmonSchoolReport = testUtils.dataGiven.southHarmonSchoolReport;
    });

    afterEach(function() {

        allCourses              = null;
        allSocialPractices      = null;
        southHarmonSchoolReport = null;
    });


    it('should fetch correct credits of studied courses', function() {

        var scheduleDataProvider = new ScheduleDataProvider();

        var studiedCoursesAfterWrapper = [
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

        scheduleDataProvider
            .fetchCourseCredits(studiedCoursesAfterWrapper)
            .should.eql({ obligatory: 4, elective: 2 });
    });

    it('should fetch correct average score of studied courses', function() {

        var scheduleDataProvider = new ScheduleDataProvider();

        scheduleDataProvider
            .fetchAverageScore(southHarmonSchoolReport.studiedCourses)
            .should.eql(70);
    });

    it('should fetch correct converted credits of studied social practices ', function() {

        // mock SouthHarmonReplacementRule
        function SouthHarmonReplacementRule() {}
        SouthHarmonReplacementRule.prototype.replace = function() {};

        // mock ReplacementRuleFactory
        function ReplacementRuleFactory() {}
        ReplacementRuleFactory.create = function(college) {
            return new SouthHarmonReplacementRule();
        };


        var replacementRule      = ReplacementRuleFactory.create(southHarmonSchoolReport.college);
        var scheduleDataProvider = new ScheduleDataProvider();

        // TODO have to extract data packager
        scheduleDataProvider
            .fetchConvertedSocialPracticeCredits(
                replacementRule,
                southHarmonSchoolReport.studiedCourses,
                southHarmonSchoolReport.studiedSocialPractices,
                allCourses,
                allSocialPractices )
            .should.eql({ obligatory: 2, elective: 2 });
    });
});