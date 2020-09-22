const Logger = require('../scripts/utils/logger');
const allowedVariance = 5;

const compareReports = (newFile, extFile, averagePerfScore) => {
  if (newFile && extFile) {
    Logger.warn('comparision Started');
    const newPerfScore = (newFile.categories.performance.score) * 100;
    const extPerfScore = (extFile.categories.performance.score) * 100;
    const diffInScore = Math.abs(extPerfScore - newPerfScore);
    // Returns true if difference between new performance score and previous performance score is greater than the allowed varaince(5).
    // Returns true if new performance score is greater than previous performance score OR if it is less than average score.
    if (newPerfScore < averagePerfScore || diffInScore > allowedVariance) {
      Logger.error('Lighthouse Comparision Report');
      Logger.error(`Previous perf score :${extPerfScore} Current perf score :${newPerfScore}`);
      return true;
    }

    // Returns false if score is same
    if (newPerfScore === extPerfScore) {
      return false;
    }
  }
  return false;
};

module.exports = {
  compareReports,
};