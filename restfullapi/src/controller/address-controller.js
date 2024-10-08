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

export default {
    create
}