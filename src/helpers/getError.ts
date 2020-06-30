import get from 'lodash/get';

/**
 * A helper that returns an error if present in Graph QL raw data response
 * @param {Object} rawData - Graph QL query raw response data
 * @returns {String} error
 */
function getError(rawData: any): string {
  const rawErrors = get(rawData, 'errors', []);
  const error = rawErrors
    .map((err) => get(err, 'message', ''))
    .filter(Boolean)
    .join('\n');
  return error;
}

export default getError;
