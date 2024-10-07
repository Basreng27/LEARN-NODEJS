import { logger } from "../application/logging.js";
import contactService from "../service/contact-service.js";

// Create
const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;

        const result = await contactService.create(user, request);
        
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

// Get
const get = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId; // Get Contact Id Prim Param URL

        const result = await contactService.get(user, contactId);
        
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

// Update
const update = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId;
        const request = req.body;
        
        // Add Id
        request.id = contactId
        
        const result = await contactService.update(user, request);
        
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

// Remove
const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId; // Get Contact Id Prim Param URL
        
        await contactService.remove(user, contactId);
        
        res.status(200).json({
            data: "OK"
        })
    } catch (e) {
        next(e);
    }
}

// Search
const search = async (req, res, next) => {
    try {
        logger.info(req.query) // Debug

        const user = req.user;
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        };
        
        const result = await contactService.search(user, request);
        
        res.status(200).json({
            data: result.data,
            paging: result.paging
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}