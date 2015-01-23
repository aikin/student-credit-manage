function ScheduleGenerator(courseCredits, convertedSocialPracticeCredits, totalCredits, shortageCredits, averageBaseline, averageScore) {

    this.courseCredits                  = courseCredits;
    this.convertedSocialPracticeCredits = convertedSocialPracticeCredits;
    this.shortageCredits                = shortageCredits;
    this.totalCredits                   = totalCredits;
    this.averageBaseline                = averageBaseline;
    this.averageScore                   = averageScore;
}


ScheduleGenerator.prototype.generate = function() {

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
    return expectSchedule;
};

module.exports = ScheduleGenerator;