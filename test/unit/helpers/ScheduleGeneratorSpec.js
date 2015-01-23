var should            = require('chai').should();
var testUtils         = require('../../utils');
var ScheduleGenerator = require('../../../core/helpers/ScheduleGenerator');

describe('academic schedule generator test', function() {

    var courseCredits;
    var convertedSocialPracticeCredits;
    var totalCredits;
    var shortageCredits;
    var averageBaseline;
    var averageScore;

    before(function() {

    });

    it('should return correct result about studied courses credit', function() {

        var scheduleGenerator = new ScheduleGenerator(courseCredits, convertedSocialPracticeCredits, totalCredits, shortageCredits, averageBaseline, averageScore);
        var expectSchedule    =

                '***<南哈蒙理工大学>学分明细***' +
                '----------------------' +
                '已修课程学分：' +
                '必修：14' +
                '选修：2' +
                '----------------------' +
                '社会实践：' +
                '已折算成必修课的学分：4' +
                '已折算成选修课的学分：2' +
                '----------------------' +
                '已获得的总学分：' +
                '必修：14' +
                '选修：16' +
                '----------------------' +
                '顺利毕业的所有课程平均分基线：70' +
                '当前所有课程平均分：70.8' +
                '**********************';

        scheduleGenerator.generate().should.eql(expectSchedule);
    });
});


/*
 ***<南哈蒙理工大学>学分明细***
 ----------------------
 已修课程学分：
 必修：14
 选修：2
 ----------------------
 社会实践：
 已折算成必修课的学分：4
 已折算成选修课的学分：2
 ----------------------
 已获得的总学分：
 必修：14
 选修：4
 离顺利毕业还差学分：
 必修：26
 选修：16
 ----------------------
 顺利毕业的所有课程平均分基线：70
 当前所有课程平均分：70.8
 **********************
 */