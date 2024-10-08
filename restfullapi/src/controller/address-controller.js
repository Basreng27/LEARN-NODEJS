import addressService from "../service/address-service.js";

// Create
const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const contactId = req.params.contactId // Get From URL Params
        
        const result = await addressService.create(user, contactId, request);
        
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

// Get
const get = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId // Get From URL Params
        const addressId = req.params.addressId;
        
        const result = await addressService.get(user, contactId, addressId);
        
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

// Update
const update = async (req, res, next) => {
    try {
        const user = req.user;
        const contactId = req.params.contactId // Get From URL Params
        const addressId = req.params.addressId // Get From URL Params
        const request = req.body;
        request.id = addressId
        
        const result = await addressService.update(user, contactId, request);
        
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update
}