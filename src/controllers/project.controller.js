import ProjectService from '../services/project.service';
import { RESOURCE_RETRIEVED, RESOURCE_CREATED, RESOURCE_NOT_FOUND, RESOURCE_UPDATED, RESOURCE_FAILED_TO_UPDATE, RESOURCE_WAS_DELETED, RESOURCE_FAILED_TO_DELETED } from '../utils/custom-messages.util';
import { getOffsetAndLimit } from '../utils/prepare-pagination.util';
import { sendResponse } from '../utils/response.util';
import { CREATED, NOT_FOUND, OK } from '../utils/status-codes.util';

/**
 * @description this class ProjectController deals with all of the methods 
 * regarding with project 
 */
export default class ProjectController {
    /**
     * @constructor
     */
    constructor() {
        this.projectService = new ProjectService();
    }

    /**
     * @param {object} req
     * @param {object} res
     * @returns {object} newSavedProject
     * @description sends response containing the saved project to user
     */
    saveProject = async (req, res) => {
        const projectData = req.body;
        const { dataValues } = await this.projectService.saveAll(projectData);
        sendResponse(res, CREATED, RESOURCE_CREATED, dataValues);
    }

    /**
     * @param {object} req
     * @param {object} res
     * @returns {object} sends response to user
     * @description it sends found projects
     */
     getProjects = async (req, res) => {
        const { name, page, limit } = req.query;
        const { offset, gottenLimit } = getOffsetAndLimit(page, limit);
        const foundProjects = await this.projectService
            .getAndCountAllIncludeAssociation({ name }, offset, gottenLimit);

        if (foundProjects.count !== 0) {
            const { rows } = foundProjects;
            if (rows.length !== 0) {
                sendResponse(res, OK, RESOURCE_RETRIEVED, rows);
            } else {
                sendResponse(res, NOT_FOUND, RESOURCE_NOT_FOUND);
            }
        } else {
            sendResponse(res, NOT_FOUND, RESOURCE_NOT_FOUND);
        }
    }

    /**
     * @param {object} req
     * @param {object} res
     * @returns {object} sends response to user
     * @description it sends updated project
     */
     updateProject = async (req, res) => {
        const { id } = req.params;
        const projectDataToUpdate = req.body;
        const updatedProject = await this.projectService.updateBy(projectDataToUpdate, { id });
        
        if (updatedProject[0]) {
            const { dataValues } = updatedProject[1][0];
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
    deleteProject = async (req, res) => {
        const { id } = req.params;
        const deletedProject = await this.projectService.temporaryDelete({ id });
        if (deletedProject) {
            sendResponse(res, OK, RESOURCE_WAS_DELETED);
        } else {
            sendResponse(res, NOT_FOUND, RESOURCE_FAILED_TO_DELETED);
        }
    }
} 
