"use strict";

var util            = require('util');
var _               = require('lodash');
var ReplacementRule = require('./ReplacementRule');

function SouthHarmonReplacementRule() {
    ReplacementRule.apply(this, arguments);
}

util.inherits(SouthHarmonReplacementRule, ReplacementRule);

SouthHarmonReplacementRule.prototype.replace = function(detailStudiedCourses, passSocialPractices) {

    // TODO more level

    var studiedCoursesAfterReplace                 = _.cloneDeep(detailStudiedCourses);
    var convertedSocialPractices                   = [];
    var convertedSocialPracticesWithCreditIncrease = [];

    for (var i = 0, passSocialPracticesLength = passSocialPractices.length ; i < passSocialPracticesLength; i++) {
        for (var j = 0, studiedCoursesAfterReplaceLength = studiedCoursesAfterReplace.length; j < studiedCoursesAfterReplaceLength; j++) {

            if (passSocialPractices[i].replaceableCourse.id === studiedCoursesAfterReplace[j].id
                && passSocialPractices[i].score > studiedCoursesAfterReplace[j].score
                && studiedCoursesAfterReplace[j].score > studiedCoursesAfterReplace[j].passLine
            ) {

                studiedCoursesAfterReplace[j].score = passSocialPractices[i].score;
                convertedSocialPractices.push(_.cloneDeep(passSocialPractices[i]));
                break;
            }

            if (passSocialPractices[i].replaceableCourse.id === studiedCoursesAfterReplace[j].id
                && passSocialPractices[i].score > studiedCoursesAfterReplace[j].score
                && studiedCoursesAfterReplace[j].score < studiedCoursesAfterReplace[j].passLine
            ) {

                studiedCoursesAfterReplace[j].score = passSocialPractices[i].score;
                convertedSocialPracticesWithCreditIncrease.push(_.cloneDeep(passSocialPractices[i]));
                break;
            }

            if (passSocialPractices[i].replaceableCourse.id !== studiedCoursesAfterReplace[j].id && j === studiedCoursesAfterReplaceLength - 1) {

                var newAddedCourse   = _.clone(passSocialPractices[i].replaceableCourse);
                newAddedCourse.score = passSocialPractices[i].score;

                studiedCoursesAfterReplace.push(newAddedCourse);
                convertedSocialPracticesWithCreditIncrease.push(_.cloneDeep(passSocialPractices[i]))
            }

        }
    }

    return {
        studiedCoursesAfterReplace                : studiedCoursesAfterReplace,
        convertedSocialPractices                  : convertedSocialPractices,
        convertedSocialPracticesWithCreditIncrease: convertedSocialPracticesWithCreditIncrease
    };
};

/*  1. 只刷分 不会增加学分
 *
 *  2. 同时刷分和增加了学分
 *  3. 添加置换新的课程
 *
 */

module.exports = SouthHarmonReplacementRule;