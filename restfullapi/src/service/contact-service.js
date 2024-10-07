import { createContactValidation, getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

// Create COntact
const create = async (user, request) => {
    // Validation
    const contact = validate(createContactValidation, request)

    // Add Username
    contact.username_user = user.username;

    return prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
        }
    });
}

const get = async (user, contactId) => {
    // Validation
    contactId = validate(getContactValidation, contactId);

    const contact = await prismaClient.contact.findFirst({
        where:{
            id: contactId,
            username_user: user.username
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
        }
    })

    if (!contact) {
        throw new ResponseError(404, "Contact is not found")
    }

    return contact
}

export default {
    create,
    get
}