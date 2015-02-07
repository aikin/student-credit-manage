"use strict";

var should                     = require('chai').should();
var testUtils                  = require('../../utils');
var SouthHarmonReplacementRule = require('../../../core/helpers/SouthHarmonReplacementRule');

describe('replacement rule factory spec', function() {

    var detailStudiedCourses;
    var passSocialPractices;
    var dataAfterReplacement;

    beforeEach(function() {

        detailStudiedCourses = testUtils.dataGiven.detailStudiedCourses;
        passSocialPractices  = testUtils.dataGiven.detailStudiedSocialPractices;
        dataAfterReplacement = testUtils.dataGiven.dataAfterReplacement;
    });

    afterEach(function() {

        detailStudiedCourses = null;
        passSocialPractices  = null;
        dataAfterReplacement = null;
    });

    it('should correct info after replace', function() {

        var southHarmonReplacementRule = new SouthHarmonReplacementRule();
        southHarmonReplacementRule.replace(detailStudiedCourses, passSocialPractices).should.eql(dataAfterReplacement)
    });

});
