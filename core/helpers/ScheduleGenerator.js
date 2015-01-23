function ScheduleGenerator(college, courseCredits, convertedSocialPracticeCredits, totalCredits, shortageCredits, averageBaseline, averageScore) {

    this.college                        = college;
    this.courseCredits                  = courseCredits;
    this.convertedSocialPracticeCredits = convertedSocialPracticeCredits;
    this.shortageCredits                = shortageCredits;
    this.totalCredits                   = totalCredits;
    this.averageBaseline                = averageBaseline;
    this.averageScore                   = averageScore;
}


ScheduleGenerator.prototype.generate = function() {

    var expectSchedule =

            '***<' + this.college + '>学分明细***' +
            '----------------------' +
            '已修课程学分：' +
            '必修：' + this.courseCredits.obligatory +
            '选修：' + this.courseCredits.elective +
            '----------------------' +
            '社会实践：' +
            '已折算成必修课的学分：' + this.convertedSocialPracticeCredits.obligatory +
            '已折算成选修课的学分：' + this.convertedSocialPracticeCredits.elective +
            '----------------------' +
            '已获得的总学分：' +
            '必修：' + this.totalCredits.obligatory +
            '选修：' + this.totalCredits.elective +
            '离顺利毕业还差学分：' +
            '必修：' + this.shortageCredits.obligatory +
            '选修：' + this.shortageCredits.elective +
            '----------------------' +
            '顺利毕业的所有课程平均分基线：' + this.averageBaseline +
            '当前所有课程平均分：' + this.averageScore +
            '**********************';
    return expectSchedule;
};

module.exports = ScheduleGenerator;