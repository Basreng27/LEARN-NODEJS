import { describe, it, afterEach, beforeEach } from 'node:test';
import { removeTestUser, createTestUser, removeAllTestContacts, createTestContact, getTestContact } from './test-util.js';
import supertest from 'supertest';  // Use import for ECMAScript modules
import { web } from '../src/application/web.js';
import { expect } from 'expect';

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