import { describe, it, afterEach, beforeEach } from 'node:test';
import { removeTestUser, createTestUser, removeAllTestContacts, createTestContact, getTestContact, createManyTestContacts } from './test-util.js';
import supertest from 'supertest';  // Use import for ECMAScript modules
import { web } from '../src/application/web.js';
import { expect } from 'expect';
import { logger } from '../src/application/logging.js';

// Create Contact
describe('POST /api/contacts', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })
    
    // Create Contqct
    it('should can create new contact', async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set('Authorization', 'test')
            .send({
                first_name: "test",
                last_name: "test",
                email: "test@test.com",
                phone: "08090000000"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.first_name).toBe("test");
        expect(result.body.data.last_name).toBe("test");
        expect(result.body.data.email).toBe("test@test.com");
        expect(result.body.data.phone).toBe("08090000000");
    });

    // Cant Create Contact
    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post("/api/contacts")
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "test",
                email: "test",
                phone: "0809000000043534534543534534543535345435435"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

// Get Contact
describe('GET /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    // Can Get Contact
    it('should can get contact', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe(testContact.first_name);
        expect(result.body.data.last_name).toBe(testContact.last_name);
        expect(result.body.data.email).toBe(testContact.email);
        expect(result.body.data.phone).toBe(testContact.phone);
    });

    // Contact Id Not Found
    it('should return 404 if contact id is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get("/api/contacts/" + (testContact.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

// Update
describe('PUT /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    // Update Exsist 
    it('should can update existing contact', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "Wandi",
                last_name: "Wandi",
                email: "wandi@test.com",
                phone: "09999999"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testContact.id);
        expect(result.body.data.first_name).toBe("Wandi");
        expect(result.body.data.last_name).toBe("Wandi");
        expect(result.body.data.email).toBe("wandi@test.com");
        expect(result.body.data.phone).toBe("09999999");
    });

    // Reject
    it('should reject if request is invalid', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "",
                email: "Wandi",
                phone: ""
            });

        expect(result.status).toBe(400);
    });

    // Not Found
    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .put('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test')
            .send({
                first_name: "Wandi",
                last_name: "Wandi",
                email: "wandi@test.com",
                phone: "09999999"
            });

        expect(result.status).toBe(404);
    });
});

// Delete
describe('DELETE /api/contacts/:contactId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    // Can Delete
    it('should can delete contact', async () => {
        let testContact = await getTestContact();
        const result = await supertest(web)
            .delete('/api/contacts/' + testContact.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testContact = await getTestContact();
        expect(testContact).toBeNull();
    });

    // Cannt Delete
    it('should reject if contact is not found', async () => {
        let testContact = await getTestContact();
        const result = await supertest(web)
            .delete('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

// Search
describe('GET /api/contacts', function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestContacts();
    })

    afterEach(async () => {
        await removeAllTestContacts();
        await removeTestUser();
    })

    // Without Params
    it('should can search without parameter', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    // Page Number 2
    it('should can search to page 2', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                page: 2
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    // Using Name
    it('should can search using name', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                name: "test 1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    // Using Email
    it('should can search using email', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                email: "test1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    // Using Phone
    it('should can search using phone', async () => {
        const result = await supertest(web)
            .get('/api/contacts')
            .query({
                phone: "0809000001"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });
});