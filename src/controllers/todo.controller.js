import TodoService from '../services/todo.service';
import { RESOURCE_RETRIEVED, RESOURCE_CREATED, RESOURCE_NOT_FOUND, RESOURCE_UPDATED, RESOURCE_FAILED_TO_UPDATE, RESOURCE_WAS_DELETED, RESOURCE_FAILED_TO_DELETED } from '../utils/custom-messages.util';
import { getOffsetAndLimit } from '../utils/prepare-pagination.util';
import { sendResponse } from '../utils/response.util';
import { CREATED, NOT_FOUND, OK } from '../utils/status-codes.util';

/**
 * @description this class TodoController deals with all of the methods 
 * regarding with todo 
 */
export default class TodoController {
    /**
     * @constructor
     */
    constructor() {
        this.todoService = new TodoService();
    }

    /**
     * @param {object} req
     * @param {object} res
     * @returns {object} newSavedtodo
     * @description sends response containing the saved todo to project
     */
    saveTodo = async (req, res) => {
        const todoData = req.body;
        const { dataValues } = await this.todoService.saveAll(todoData);
        sendResponse(res, CREATED, RESOURCE_CREATED, dataValues);
    }

    /**
     * @param {object} req
     * @param {object} res
     * @returns {object} sends response to user
     * @description it sends found todos
     */
     getTodos = async (req, res) => {
        const { title, page, limit } = req.query;
        const { offset, gottenLimit } = getOffsetAndLimit(page, limit);
        const foundTodos = await this.todoService
            .getAndCountAllIncludeAssociation({ title }, offset, gottenLimit);

        if (foundTodos.count !== 0) {
            const { rows } = foundTodos;
            sendResponse(res, OK, RESOURCE_RETRIEVED, rows);
        } else {
            sendResponse(res, NOT_FOUND, RESOURCE_NOT_FOUND);
        }
    }

    /**
     * @param {object} req
     * @param {object} res
     * @returns {object} sends response to user
     * @description it sends updated todo
     */
     updateTodo = async (req, res) => {
        const { id } = req.params;
        const todoDataToUpdate = req.body;
        const updatedTodo = await this.todoService.updateBy(todoDataToUpdate, { id });
        
        if (updatedTodo[0]) {
            const { dataValues } = updatedTodo[1][0];
            sendResponse(res, OK, RESOURCE_UPDATED, dataValues);
        } else {
            sendResponse(res, NOT_FOUND, RESOURCE_FAILED_TO_UPDATE);
        }
     }

    /**
     * 
     * @param {*} req
     * @param {*} res
     * @returns {*} response
     */
    deleteTodo = async (req, res) => {
        const { id } = req.params;
        const deletedTodo = await this.todoService.temporaryDelete({ id });
        if (deletedTodo) {
            sendResponse(res, OK, RESOURCE_WAS_DELETED);
        } else {
            sendResponse(res, NOT_FOUND, RESOURCE_FAILED_TO_DELETED);
        }
    }
} 
