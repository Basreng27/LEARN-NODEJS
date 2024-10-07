import { createContactValidation, getContactValidation, updateContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

// Create Contact
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

// Get Contact
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

// Create Contact
const update = async (user, request) => {
    // Validation
    const contact = validate(updateContactValidation, request)

    const totalContactInDatabase = await prismaClient.contact.count({
        where: {
            username_user: user.username,
            id: contact.id
        }
    })
    
    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "Contact is not found")
    }
    
    return prismaClient.contact.update({
        where:{
            id: contact.id,
            username_user: user.username,
        },
        data: {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone: contact.phone,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
        }
    });
}

// Delete Contact
const remove = async (user, contactId) => {
    // Validation
    contactId = validate(getContactValidation, contactId);
    
    const totalInDatabase = await prismaClient.contact.count({
        where:{
            id: contactId,
            username_user: user.username
        }
    })

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "Contact is not found")
    }

    return await prismaClient.contact.delete({
        where: {
            id: contactId
        }
    })
}

export default {
    create,
    get,
    update,
    remove
}