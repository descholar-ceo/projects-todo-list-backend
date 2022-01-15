/**
 * @param {object} res
 * @param {integer} code
 * @param {string} message
 * @param {string} data
 * @returns {object} response
 * @description Returns a response
 */
export const sendResponse = (res, code, message, data = null) => res.status(code).json({
    message,
    data
  });
