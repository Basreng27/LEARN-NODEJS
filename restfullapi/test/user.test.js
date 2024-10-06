import supertest from 'supertest';  // Use import for ECMAScript modules
import { web } from '../src/application/web.js';
import { prismaClient } from '../src/application/database.js';
import { describe, it, afterEach } from 'node:test';  // Change to import
import { expect } from 'expect';
import { logger } from '../src/application/logging.js';

describe('POST /api/users', function () {
    // After sending data, clear the test data
    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "wandi"
            }
        });
    });

    // Regist OK
    it('should register a new user', async () => {
        const result = await supertest(web)
        .post('/api/users')
        .send({
            username: 'wandi',
            password: 'wandi',
            name: 'wandi',
        });
        
        // Expectations to match the response
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('wandi');
        expect(result.body.data.name).toBe('wandi');
        expect(result.body.data.password).toBeUndefined();  // Password should not be returned
    });
    
    // Regist Not OK
    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: '',
                password: '',
                name: '',
            });

        logger.info(result.body);

        // Expectations to match the response
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();  // Must Have errors
    });

    // Regist Duplicate
    it('should reject if username already resgistered', async () => {
        let result = await supertest(web)
        .post('/api/users')
        .send({
            username: 'wandi',
            password: 'wandi',
            name: 'wandi',
        });
        
        // Expectations to match the response
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('wandi');
        expect(result.body.data.name).toBe('wandi');
        expect(result.body.data.password).toBeUndefined();  // Password should not be returned

        result = await supertest(web)
        .post('/api/users')
        .send({
            username: 'wandi',
            password: 'wandi',
            name: 'wandi',
        });

        logger.info(result.body);
        
        // Expectations to match the response
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();  // Must Have errors
    });
});
