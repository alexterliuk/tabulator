/**
 * Return positive number or provided defaultValue, or false.
 * @param {number} val - any value
 * @param {number} [defaultVal]
 * @returns {boolean|number} - false or number > 0
 */
function validatePositiveNumber(val, defaultVal) {
  const valid = typeof val === 'number' && Number.isFinite(val) && val > 0 && val;
  return valid || !!defaultVal && defaultVal;
}

export default validatePositiveNumber;
