"use strict";

var util            = require('util');
var _               = require('lodash');
var ReplacementRule = require('./ReplacementRule');

function SouthHarmonReplacementRule() {
    ReplacementRule.apply(this, arguments);
}

util.inherits(SouthHarmonReplacementRule, ReplacementRule);

SouthHarmonReplacementRule.prototype._replaceNotPassCourses = function(studiedSocialPracticesCanReplacement, notPassCourses) {

    var convertedSocialPracticesWithCreditIncrease = [];
    for (var i = 0; i < studiedSocialPracticesCanReplacement.length; i++) {
        for (var j = 0; j < notPassCourses.length; j++) {

            if (studiedSocialPracticesCanReplacement[i].replaceableCourse.id === notPassCourses[j].id) {

                notPassCourses[j].score = studiedSocialPracticesCanReplacement[i].score;
                convertedSocialPracticesWithCreditIncrease.push(_.cloneDeep(studiedSocialPracticesCanReplacement[i]));
                studiedSocialPracticesCanReplacement.splice(i, 1);
            }
        }
    }

    return convertedSocialPracticesWithCreditIncrease;
};

SouthHarmonReplacementRule.prototype._replacePassCourses = function(socialPracticesCanReplacement, passCourses, convertedSocialPractices, convertedSocialPracticesWithCreditIncrease) {

    for (var i = 0, socialPracticesCanReplacementLength = socialPracticesCanReplacement.length; i < socialPracticesCanReplacementLength; i++) {
        for (var j = 0, passCoursesLength = passCourses.length; j < passCoursesLength; j++) {

            if (socialPracticesCanReplacement[i].replaceableCourse.id === passCourses[j].id
                && passCourses[j].score > passCourses[j].score) {

                passCourses[j].score = socialPracticesCanReplacement[i].score;
                convertedSocialPractices.push(_.cloneDeep(socialPracticesCanReplacement[i]));
                break;
            }

            if (socialPracticesCanReplacement[i].replaceableCourse.id !== passCourses[j].id && j === passCoursesLength - 1) {

                var newAddedCourse = _.clone(socialPracticesCanReplacement[i].replaceableCourse);
                newAddedCourse.score = socialPracticesCanReplacement[i].score;

                passCourses.push(newAddedCourse);
                convertedSocialPracticesWithCreditIncrease.push(_.cloneDeep(socialPracticesCanReplacement[i]));
            }
        }
    }
};
SouthHarmonReplacementRule.prototype.replace = function(coursesAfterClassify, passSocialPractices) {

    // TODO more level

    var notPassCourses                = _.cloneDeep(coursesAfterClassify.notPass);
    var passCourses                   = _.cloneDeep(coursesAfterClassify.pass);
    var socialPracticesCanReplacement = _.cloneDeep(passSocialPractices);
    
    var studiedCoursesAfterReplace                 = [];
    var convertedSocialPractices                   = [];
    var convertedSocialPracticesWithCreditIncrease = [];

    convertedSocialPracticesWithCreditIncrease = this._replaceNotPassCourses(socialPracticesCanReplacement, notPassCourses);

    this._replacePassCourses(socialPracticesCanReplacement, passCourses, convertedSocialPractices, convertedSocialPracticesWithCreditIncrease);

    studiedCoursesAfterReplace = passCourses.concat(notPassCourses);


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