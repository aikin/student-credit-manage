"use strict";

var should                     = require('chai').should();
var testUtils                  = require('../../utils');
var ReplacementRuleFactory     = require('../../../core/helpers/ReplacementRuleFactory');
var SouthHarmonReplacementRule = require('../../../core/helpers/SouthHarmonReplacementRule');

describe('replacement rule factory spec', function() {

    var southHarmonSchoolReport;

    beforeEach(function() {

        southHarmonSchoolReport = testUtils.dataGiven.southHarmonSchoolReport;
    });

    afterEach(function() {

        southHarmonSchoolReport = null;
    });

    it('should create replacement rule for south harmon', function() {

        var replacementRule = ReplacementRuleFactory.createReplacementRule(southHarmonSchoolReport.college);
        replacementRule.should.to.instanceOf(SouthHarmonReplacementRule);
    });

});
