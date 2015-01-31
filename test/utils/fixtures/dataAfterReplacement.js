module.exports = {

    studiedCoursesAfterReplace: [
        { id: 'C110', name: '课程A', credit: 2, type: 'elective',   passLine: 60, score: 80 },
        { id: 'C113', name: '课程D', credit: 2, type: 'obligatory', passLine: 60, score: 70 },   // replaced                },
        { id: 'C114', name: '课程E', credit: 4, type: 'obligatory', passLine: 60, score: 80 },
        { id: 'C111', name: '课程B', credit: 2, type: 'elective',   passLine: 60, score: 90 }    // replaced
    ],
    convertedSocialPractices: [
        {
            id                : 'SP111',
            name              : '实践2',
            replaceableCourse : { id: 'C113', name: '课程D', credit: 2, type: 'obligatory', passLine: 60 },
            passLine          : 60,
            score             : 70
        },

        {
            id                : 'SP112',
            name              : '实践3',
            replaceableCourse : { id: 'C111', name: '课程B', credit: 2, type: 'elective', passLine: 60 },
            passLine          : 60,
            score             : 90
        }
    ]
};