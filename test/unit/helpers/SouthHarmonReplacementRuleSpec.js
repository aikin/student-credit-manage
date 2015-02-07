"use strict";

var should                     = require('chai').should();
var testUtils                  = require('../../utils');
var SouthHarmonReplacementRule = require('../../../core/helpers/SouthHarmonReplacementRule');

describe('replacement rule factory spec', function() {

    var coursesAfterClassify;
    var passSocialPractices;
    var dataAfterReplacement;

    beforeEach(function() {

        coursesAfterClassify = testUtils.dataGiven.coursesAfterClassify;
        passSocialPractices  = testUtils.dataGiven.passSocialPractices;
        dataAfterReplacement = testUtils.dataGiven.dataAfterReplacement;
    });

    afterEach(function() {

        coursesAfterClassify = null;
        passSocialPractices  = null;
        dataAfterReplacement = null;
    });

    it('should correct info after replace', function() {

        var southHarmonReplacementRule = new SouthHarmonReplacementRule();
        southHarmonReplacementRule.replace(coursesAfterClassify, passSocialPractices).should.eql(dataAfterReplacement)
    });

});
