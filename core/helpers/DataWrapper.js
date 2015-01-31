"use strict";

var _ = require('lodash');

function DataWrapper() {

}

DataWrapper.prototype.wrapperObjectWithDetail = function(resealedData, dependData) {

    var dataAfterWrapper = [];

    for (var i = 0, max = resealedData.length; i < max; i++) {
        for (var j = 0, dependDataLength = dependData.length; j < dependDataLength; j++) {

            if (resealedData[i].id === dependData[j].id) {
                var cloneDetailData   = _.clone(dependData[j]);
                cloneDetailData.score = resealedData[i].score;
                dataAfterWrapper.push(cloneDetailData);
            }
        }
    }
    return dataAfterWrapper;
};

DataWrapper.prototype.wrapperStudiedSocialPracticesWithDetailReplaceableCourse = function(detailStudiedSocialPractices, allCourses) {

    for (var i = 0, max = detailStudiedSocialPractices.length; i < max; i++) {
        for (var j = 0, allCoursesLength = allCourses.length; j < allCoursesLength; j++) {

            if (detailStudiedSocialPractices[i].replaceableCourse === allCourses[j].id) {
                detailStudiedSocialPractices[i].replaceableCourse = _.clone(allCourses[j]);
            }
        }
    }

    return detailStudiedSocialPractices;
};

DataWrapper.prototype.filterNotPassInfo = function(coursesOrPractices) {

    var passData = [];
    for (var i = 0, max = coursesOrPractices.length; i < max; i++) {
        if (coursesOrPractices[i].score >= coursesOrPractices[i].passLine) {
            var pass = _.clone(coursesOrPractices[i]);
            passData.push(pass);
        }
    }
    return passData;
};

module.exports = DataWrapper;