import validatePositiveNumber from '../utils/validate-positive-number.js';
import setWaitingState from '../utils/set-waiting-state.js';
import makeQueryStrings from '../utils/make-query-strings.js';
import notify from '../table/table-utils/notify.js';
import getDefaultTimeoutDuration from '../utils/get-default-timeout-duration.js';

/**
 * Get all tables of logged in user.
 * @param {HTMLButtonElement} btn
 * @param {object} options - e.g. { limit: 10, skip: 20 }
 * @param {number|boolean} [showResultDuration] - time in ms OR false (response returns)
 */
async function getUserTables(btn, options, showResultDuration) {
  const queryStrings = makeQueryStrings(options, ['limit', 'skip'], 'number');
  const baseUrl = `${baseURI}tables`;
  const url = queryStrings ? `${baseUrl}?${queryStrings}` : baseUrl;

  const response = await fetch(url, { method: 'GET' });

  if (showResultDuration === false) {
    return response;

  } else {
    const duration = validatePositiveNumber(showResultDuration) || getDefaultTimeoutDuration();
    setWaitingState(true, { id: 'dashboardBlock' });

    if (response.status === 200 || response.status === 304) {
      setWaitingState(false, {id: 'dashboardBlock'});
      return response.json();

    } else {
      setWaitingState(false, {id: 'dashboardBlock'});
      notify('dashboardInfo', 'Something went wrong.', 'error', duration);
      return [];
    }
  }
}

export default getUserTables;
