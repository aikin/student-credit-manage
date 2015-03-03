'use strict';

var should                                           = require('chai').should();
var testUtils                                        = require('../../utils');
var DisplayWithSocialPracticeNotCovertIntoCourseRule = require('../../../core/helpers/display_rules/DisplayWithSocialPracticeNotCovertIntoCourseRule');

describe('display with social practice not covert into course spec', function() {

    var detailStudiedCourses;
    var dataAfterReplacement;

    beforeEach(function() {
        detailStudiedCourses = testUtils.dataGiven.detailStudiedCourses;
        dataAfterReplacement = testUtils.dataGiven.dataAfterReplacement;
    });

    afterEach(function() {
        detailStudiedCourses = null;
        dataAfterReplacement = null;
    });

    it('should generate correct display data about not social practice covert into course', function() {

        var displayWithSocialPracticeNotCovertIntoCourseRule = new DisplayWithSocialPracticeNotCovertIntoCourseRule();
        displayWithSocialPracticeNotCovertIntoCourseRule
            .generateDisplayData(detailStudiedCourses, dataAfterReplacement)
            .should
            .eql({
                courseCredits                 : {},
                convertedSocialPracticeCredits: {}
            });
    });

});

