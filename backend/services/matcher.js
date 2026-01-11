const fuzz = require('fuzzball');

const findBestMatch = (input) => {
  const choices = ['sony xm5', 'iphone 15'];
  const result = fuzz.extract(input.toLowerCase(), choices, { scrub: true });
  
  // result[0] is [choice, score]
  if (result[0][1] > 50) {
    return result[0][0];
  }
  return 'sony xm5'; // Default for demo
};

module.exports = { findBestMatch };