import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from "../validation/contact-validation.js"
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

// Search Contact
const search = async (user, request) => {
    request = validate(searchContactValidation, request)

    // Like Pagination
    // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;

    const filters = [];

    filters.push({
        username_user: user.username
    })
    
    // Filter If Exist
    if (request.name) {
        filters.push({
            OR: [ // Or Query
                {
                    first_name: {
                        contains: request.name
                    }
                },
                {
                    last_name: {
                        contains: request.name
                    }
                }
            ]
        })
    }

    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        })
    }

    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone // "contains" = like
            }
        })
    }

    const contacts = await prismaClient.contact.findMany({
        where:{
            AND: filters // More Than 1 Find
        },
        take: request.size, // Size
        skip: skip
    })

    const totalItem = await prismaClient.contact.count({
        where: {
            AND: filters
        }
    })

    return {
        data: contacts,
        paging: {
            page: request.page,
            total_item: totalItem,
            total_page: Math.ceil(totalItem / request.size)
        }
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}