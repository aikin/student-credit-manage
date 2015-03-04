'use strict';

function ScoreCalculator() {

}

ScoreCalculator.prototype.calculateAverageScore = function(scoreInfo) {

    var sum = 0;
    var maxLength = scoreInfo.length;

    for (var i = 0; i < maxLength; i++) {
        sum += scoreInfo[i].score;
    }
    return (sum / maxLength).toFixed(1);
};

module.exports = ScoreCalculator;