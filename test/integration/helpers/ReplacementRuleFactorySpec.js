'use strict';

var should                     = require('chai').should();
var testUtils                  = require('../../utils');
var ReplacementRuleFactory     = require('../../../core/helpers/ReplacementRuleFactory');
var HarmonReplacementRule      = require('../../../core/helpers/HarmonReplacementRule');
var SouthHarmonReplacementRule = require('../../../core/helpers/SouthHarmonReplacementRule');

describe('replacement rule factory spec', function() {

    var college;

    beforeEach(function() {

        college = testUtils.dataGiven.college;
    });

    afterEach(function() {

        college = null;
    });

    it('should create replacement rule for south harmon', function() {

        var replacementRule = ReplacementRuleFactory.createReplacementRule(college.SOUTH_HARMON);
        replacementRule.should.to.instanceOf(SouthHarmonReplacementRule);
    });

    it('should create replacement rule for harmon', function() {

        var replacementRule = ReplacementRuleFactory.createReplacementRule(college.HARMON);
        replacementRule.should.to.instanceOf(HarmonReplacementRule);
    });

});

