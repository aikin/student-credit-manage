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

    var notPassStudiedCourses                      = [];
    var passStudiedCourses                         = [];
    
    var studiedCoursesAfterReplace                 = [];
    var convertedSocialPractices                   = [];
    var convertedSocialPracticesWithCreditIncrease = [];

    var studiedSocialPracticesCanReplacement = _.cloneDeep(passSocialPractices);

    for (var i = 0, max = detailStudiedCourses.length; i < max; i++) {
        if (detailStudiedCourses[i].score < detailStudiedCourses[i].passLine) {
            notPassStudiedCourses.push(_.clone(detailStudiedCourses[i]));
            continue;
        }
        passStudiedCourses.push(_.clone(detailStudiedCourses[i]));
    }


    for (var i = 0; i < studiedSocialPracticesCanReplacement.length; i++) {
        for (var j = 0, notPassStudiedCoursesLength = notPassStudiedCourses.length; j < notPassStudiedCoursesLength; j++) {

            if (studiedSocialPracticesCanReplacement[i].replaceableCourse.id === notPassStudiedCourses[j].id) {

                notPassStudiedCourses[j].score = passSocialPractices[i].score;
                convertedSocialPracticesWithCreditIncrease.push(_.cloneDeep(studiedSocialPracticesCanReplacement[i]));
                studiedSocialPracticesCanReplacement.splice(i, 1);
            }
        }
    }

    for (var i = 0, studiedSocialPracticesCanReplacementLength = studiedSocialPracticesCanReplacement.length ; i < studiedSocialPracticesCanReplacementLength; i++) {
        for (var j = 0, passStudiedCoursesLength = passStudiedCourses.length; j < passStudiedCoursesLength; j++) {

            if (studiedSocialPracticesCanReplacement[i].replaceableCourse.id === passStudiedCourses[j].id
                && passStudiedCourses[j].score > passStudiedCourses[j].score ) {

                passStudiedCourses[j].score = passSocialPractices[i].score;
                convertedSocialPractices.push(_.cloneDeep(passSocialPractices[i]));
                break;
            }

            if (studiedSocialPracticesCanReplacement[i].replaceableCourse.id !== passStudiedCourses[j].id && j === passStudiedCoursesLength - 1) {

                var newAddedCourse   = _.clone(studiedSocialPracticesCanReplacement[i].replaceableCourse);
                newAddedCourse.score = studiedSocialPracticesCanReplacement[i].score;

                passStudiedCourses.push(newAddedCourse);
                convertedSocialPracticesWithCreditIncrease.push(_.cloneDeep(studiedSocialPracticesCanReplacement[i]));
            }
        }
    }

    studiedCoursesAfterReplace = passStudiedCourses.concat(notPassStudiedCourses);


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