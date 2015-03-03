"use strict";

var should            = require('chai').should();
var testUtils         = require('../../utils');
var ScheduleGenerator = require('../../../core/helpers/ScheduleGenerator');

describe('schedule generator test', function() {

    var southHarmonScheduleData;
    var college;
    var courseCredits;
    var convertedSocialPracticeCredits;
    var totalCredits;
    var shortageCredits;
    var averageBaseline;
    var averageScore;

    before(function() {

        southHarmonScheduleData        = testUtils.dataGiven.southHarmonSchedule;
        college                        = southHarmonScheduleData.college;
        courseCredits                  = southHarmonScheduleData.courseCredits;
        convertedSocialPracticeCredits = southHarmonScheduleData.convertedSocialPracticeCredits;
        totalCredits                   = southHarmonScheduleData.totalCredits;
        shortageCredits                = southHarmonScheduleData.shortageCredits;
        averageBaseline                = southHarmonScheduleData.averageBaseline;
        averageScore                   = southHarmonScheduleData.averageScore;
    });

    it('should return correct south harmon schedule', function() {

        var scheduleGenerator = new ScheduleGenerator(

            college,
            courseCredits,
            convertedSocialPracticeCredits,
            totalCredits,
            shortageCredits,
            averageBaseline,
            averageScore
        );

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
                '选修：4' +
                '离顺利毕业还差学分：' +
                '必修：26' +
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

/*
 Given 成绩单
 课程A：2学分
 实践A：可置换课程A
 实践B：可置换课程B

 备注：
 * 课程A为2学分
 * 课程B为2学分

 Then 打印
 |----|第1种|第2种|第3种|第4种|

 已修 |  0  |  4  |  4  |  2  |

 实践 |  4  |  0  |  2  |  4  |
 */