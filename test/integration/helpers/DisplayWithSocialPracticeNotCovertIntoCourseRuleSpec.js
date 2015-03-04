'use strict';

var should                                           = require('chai').should();
var testUtils                                        = require('../../utils');
var DisplayWithSocialPracticeNotCovertIntoCourseRule = require('../../../core/helpers/display_rules/DisplayWithSocialPracticeNotCovertIntoCourseRule');
var CreditCalculator                                 = require('../../../core/helpers/CreditCalculator');

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
        var creditCalculator = new CreditCalculator();

        var expectResult = {
            courseCredits                 : {obligatory: 4, elective: 2},
            convertedSocialPracticeCredits: {obligatory: 2, elective: 2}
        };
        displayWithSocialPracticeNotCovertIntoCourseRule
            .generateDisplayData(creditCalculator, detailStudiedCourses, dataAfterReplacement)
            .should.eql(expectResult);
    });

});

