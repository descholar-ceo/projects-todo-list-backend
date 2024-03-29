/**
 * 
 * @param {object} whereCondition 
 * @returns {boolean} true
 * @function
 * @description it evaluates if the whereCondition is valid and returns true 
 * otherwise it returns false
 */
const validateWhereCondition = whereCondition => {
  let isWhereConditionValid = true;
        const whereConditionValues = Object.keys(whereCondition);
        whereConditionValues.forEach((currVal) => {
            if (!whereCondition[currVal]) isWhereConditionValid = false;
        });
  return isWhereConditionValid;
};

/**
 * @class
 * @classdesc this class contains all methods which we need to interact with our database
 * to use it, there are two ways of accessing the methods of this class
 * 
 * 1. The first way is : 
 * just inherit it, with the class you want to use its methods, 
 * 
 * 2. The second way is to import it and instantiate with the new keyword
 * }
 *
 */
class CrudRepository {
    /**
     * @constructor
     */
    constructor() {
        this.model = {};
        this.associateTable = [];
    }

     /**
     * @param {object} inputData
     * @returns {object} savedData
     * @method
     * @description it takes the data that you want to save as argument and 
     * it returns the saved data
     */
  saveAll = async (inputData) => {
    return await this.model.create(inputData, { returning: true });
  }
    
    /**
     * @param {object} whereCondition
     * @param {integer} offset
     * @param {integer} limit
     * @returns {object} all
     * @description This function getAlls
     */
  getAndCountAllIncludeAssociation = async (whereCondition, offset, limit) => {
    const inclusion = this.associateTable.map(table => ({ model: table }));
      const isWhereConditionValid = validateWhereCondition(whereCondition);
        const result = isWhereConditionValid ? await this.model.findAndCountAll({
            where: whereCondition,
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            include: inclusion
        }) : await this.model.findAndCountAll({
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            include: inclusion
        });
        return result;
    }

  /**
   * @param {object} dataToUpdate
   * @param {object} whereCondition
   * @returns {object} updatedData
   * @method
   * @description it gets the data to update as argument and where condition and it returns the
   * updated data, 
   * 
   * note: the dataToUpdate should be an JSON object and whereCondition should be JSON object
   */
  updateBy = async (dataToUpdate, whereCondition) => {
    const updatedData = await this.model.update(dataToUpdate, {
      where: whereCondition, returning: true,
    });
    return updatedData;
  }

  /**
   * @param {object} whereCondition
   * @returns {string} deleteEntry
   * @method
   * @description it takes the whereCondition as argument and it deletes the entry from a model
   * note: A whereCondition should be a JSON object. eg: {id:3}
   */
  temporaryDelete = async (whereCondition) => {
    const deletedEntry = await this.model.destroy({ where: whereCondition });
    return deletedEntry;
  }
}

export default CrudRepository;
