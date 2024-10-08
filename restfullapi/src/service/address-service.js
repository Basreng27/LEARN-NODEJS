import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createAddressValidation } from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

// Find Contact
const checkContactMustExists = async (user, contactId) => {
    contactId = validate(getContactValidation, contactId);

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username_user: user.username,
            id: contactId
        }
    });

    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "contact is not found");
    }

    return contactId;
}

// Create
const create = async (user, contactId, request) => {
    contactId = await checkContactMustExists(user, contactId);

    // Validate Address
    const address = validate(createAddressValidation, request)
    
    // Add ContactId
    address.contact_id = contactId

    return prismaClient.address.create({
        data: address,
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    })
}

export default {
    create
}