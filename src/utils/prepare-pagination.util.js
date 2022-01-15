/**
 * 
 * @param {object} page number of the page
 * @param {object} limit number of the limit data on the page
 * @returns {object} offset and limit
 * @description it returns offset and limit which are the values to be used 
 * to know the delimitations of data to retrieve from the database when a user wants 
 * to retrieve projects or todos
 */
 export const getOffsetAndLimit = (page = null, limit = null) => {
    let result, offset;
    let gottenLimit = limit || 10;
    if (page) {
        offset = (page - 1) * gottenLimit;
        result = { offset, gottenLimit };
    } else {
        offset = 0;
        gottenLimit = null;
        result = { offset, gottenLimit };
    }
    
    return result;
};
