import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createAddressValidation, getAddressValidation, updateAddressValidation } from "../validation/address-validation.js";
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

// Get
const get = async (user, contactId, addressId) => {
    contactId = await checkContactMustExists(user, contactId)
    addressId = validate(getAddressValidation, addressId)

    const address = await prismaClient.address.findFirst({
        where: {
            contact_id: contactId,
            id: addressId
        },
        select: {
            id: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true,
        }
    })

    if (!address) {
        throw new ResponseError(404, "address is not found");
    }

    return address
}

// Update
const update = async (user, contactId, request) => {
    contactId = await checkContactMustExists(user, contactId);

    // Validate Address
    const address = validate(updateAddressValidation, request)
    
    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: address.id
        }
    })

    if (totalAddressInDatabase !== 1) {
        throw new ResponseError(404, "Address is not found");
    }

    return prismaClient.address.update({ // updateMany = UpdateMany With ForeigenKey contact_id, If Unique Id Just Update
        where: {
            id: address.id
        },
        data: {
            street: address.street,
            city: address.city,
            province: address.province,
            country: address.country,
            postal_code: address.postal_code,
        },
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

// Remove
const remove = async (user, contactId, addressId) => {
    contactId = await checkContactMustExists(user, contactId); // Find Contact Id
    addressId = validate(getAddressValidation, addressId) // validate Address Id
    
    // Find Address Id
    const totalAddressInDatabase = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: addressId
        }
    })

    if (totalAddressInDatabase !== 1) {
        throw new ResponseError(404, "Address is not found");
    }

    return prismaClient.address.delete({ // updateMany = UpdateMany With ForeigenKey contact_id, If Unique Id Just Update
        where: {
            id: addressId
        },
    })
}

export default {
    create,
    get,
    update,
    remove
}