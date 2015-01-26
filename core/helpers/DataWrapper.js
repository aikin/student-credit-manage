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

module.exports = DataWrapper;