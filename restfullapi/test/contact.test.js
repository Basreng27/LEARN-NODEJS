import { describe, it, afterEach, beforeEach } from 'node:test';
import { removeTestUser, createTestUser, removeAllTestContacts } from './test-util.js';
import supertest from 'supertest';  // Use import for ECMAScript modules
import { web } from '../src/application/web.js';
import { expect } from 'expect';

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