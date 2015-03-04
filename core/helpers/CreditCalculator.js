'use strict';

function CreditCalculator() {

}

CreditCalculator.prototype.calculateCourseCredit = function(courses) {

    var courseCredits = {obligatory: 0, elective: 0};

    for (var item in courses) {
        if (courses[item].score >= courses[item].passLine) {
            courseCredits[courses[item].type] += courses[item].credit;
        }
    }
    return courseCredits;
};

CreditCalculator.prototype.calculateSocialPracticeCredit = function(socialPractices) {

    var convertedSocialPracticeCredits = {obligatory: 0, elective: 0};

    for (var i = 0, max = socialPractices.length; i < max; i++) {
        convertedSocialPracticeCredits[socialPractices[i].replaceableCourse.type] += socialPractices[i].replaceableCourse.credit;
    }
    return convertedSocialPracticeCredits;
};

CreditCalculator.prototype.calculateShortageCredit = function(totalCredits, baseline) {

    var shortageCredits = { obligatory: 0, elective: 0 };

    shortageCredits.obligatory = baseline.creditLine.obligatory - totalCredits.obligatory;
    shortageCredits.elective   = baseline.creditLine.elective - totalCredits.elective;
    return shortageCredits;
};

module.exports = CreditCalculator;