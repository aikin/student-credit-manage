"use strict";

var util            = require('util');
var _               = require('lodash');
var ReplacementRule = require('./ReplacementRule');

function SouthHarmonReplacementRule() {
    ReplacementRule.apply(this, arguments);
}

util.inherits(SouthHarmonReplacementRule, ReplacementRule);

// TODO private function have same structural must refactor
SouthHarmonReplacementRule.prototype._replaceNotPassCourses = function(socialPracticesCanReplacement, notPassCourses) {

    var convertedSocialPracticesWithCreditIncrease = [];
    for (var i = 0; i < socialPracticesCanReplacement.length; i++) {
        for (var j = 0; j < notPassCourses.length; j++) {

            if (socialPracticesCanReplacement[i].replaceableCourse.id === notPassCourses[j].id) {

                notPassCourses[j].score = socialPracticesCanReplacement[i].score;
                convertedSocialPracticesWithCreditIncrease.push(_.cloneDeep(socialPracticesCanReplacement[i]));
                socialPracticesCanReplacement.splice(i, 1);
                i--;
            }
        }
    }

    return convertedSocialPracticesWithCreditIncrease;
};

SouthHarmonReplacementRule.prototype._replacePassCoursesWithOnlyScoreIncrease = function(socialPracticesCanReplacement, passCourses) {

    var convertedSocialPracticesWithOnlyScoreIncrease = [];
    for (var i = 0; i < socialPracticesCanReplacement.length; i++) {
        for (var j = 0; j < passCourses.length; j++) {

            if (socialPracticesCanReplacement[i].replaceableCourse.id === passCourses[j].id
                && passCourses[j].score > passCourses[j].score) {

                passCourses[j].score = socialPracticesCanReplacement[i].score;
                convertedSocialPracticesWithOnlyScoreIncrease.push(_.cloneDeep(socialPracticesCanReplacement[i]));
                socialPracticesCanReplacement.splice(i, 1);
                i--;
            }
        }
    }
    return convertedSocialPracticesWithOnlyScoreIncrease;
};

SouthHarmonReplacementRule.prototype._replaceSocialPracticeWithNewCourse = function(socialPracticesCanReplacement, passCourses) {

    var convertedSocialPracticesWithCreditIncrease = [];
    for (var i = 0; i < socialPracticesCanReplacement.length; i++) {
        for (var j = 0, passCoursesLength = passCourses.length; j < passCoursesLength; j++) {

            if (socialPracticesCanReplacement[i].replaceableCourse.id !== passCourses[j].id && j === passCoursesLength - 1) {

                var newAddedCourse = _.clone(socialPracticesCanReplacement[i].replaceableCourse);
                newAddedCourse.score = socialPracticesCanReplacement[i].score;

                passCourses.push(newAddedCourse);
                convertedSocialPracticesWithCreditIncrease.push(_.cloneDeep(socialPracticesCanReplacement[i]));
                socialPracticesCanReplacement.splice(i, 1);
                i--;
            }
        }
    }
    return convertedSocialPracticesWithCreditIncrease;
};

SouthHarmonReplacementRule.prototype.replace = function(coursesAfterClassify, passSocialPractices) {

    var notPassCourses                = _.cloneDeep(coursesAfterClassify.notPass);
    var passCourses                   = _.cloneDeep(coursesAfterClassify.pass);
    var socialPracticesCanReplacement = _.cloneDeep(passSocialPractices);

    var convertedSocialPracticesWithCreditIncrease    = this._replaceNotPassCourses(socialPracticesCanReplacement, notPassCourses).concat(this._replaceSocialPracticeWithNewCourse(socialPracticesCanReplacement, passCourses));
    var convertedSocialPracticesWithOnlyScoreIncrease = this._replacePassCoursesWithOnlyScoreIncrease(socialPracticesCanReplacement, passCourses);
    var studiedCoursesAfterReplace                    = passCourses.concat(notPassCourses);

    return {
        studiedCoursesAfterReplace                   : studiedCoursesAfterReplace,
        convertedSocialPracticesWithOnlyScoreIncrease: convertedSocialPracticesWithOnlyScoreIncrease,
        convertedSocialPracticesWithCreditIncrease   : convertedSocialPracticesWithCreditIncrease
    };
};

/*  1. 只刷分 不会增加学分
 *
 *  2. 同时刷分和增加了学分
 *  3. 添加置换新的课程
 *
 */

module.exports = SouthHarmonReplacementRule;