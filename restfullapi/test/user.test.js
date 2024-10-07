import supertest from 'supertest';  // Use import for ECMAScript modules
import { web } from '../src/application/web.js';
import { describe, it, afterEach, beforeEach } from 'node:test';  // Change to import
import { expect } from 'expect';
import { logger } from '../src/application/logging.js';
import { removeTestUser, createTestUser } from './test-util.js';

// Register
describe('POST /api/users', function () {
    // After sending data, clear the test data
    afterEach(async () => {
        await removeTestUser();
    });

    // Regist OK
    it('should register a new user', async () => {
        const result = await supertest(web)
        .post('/api/users')
        .send({
            username: 'test',
            password: 'test',
            name: 'test',
        });
        
        // Expectations to match the response
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
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
            username: 'test',
            password: 'test',
            name: 'test',
        });
        
        // Expectations to match the response
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.password).toBeUndefined();  // Password should not be returned

        result = await supertest(web)
        .post('/api/users')
        .send({
            username: 'test',
            password: 'test',
            name: 'test',
        });

        logger.info(result.body);
        
        // Expectations to match the response
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();  // Must Have errors
    });
});

// Login
describe('POST /api/users/login', function () {
    beforeEach(async () => {
        // Create From utils
        await createTestUser();
    });
    
    afterEach(async () => {
        // Delete From utils
        await removeTestUser();
    });

    // Can Login
    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "test"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    // Cant Login
    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "",
                password: ""
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    // Wrong Password
    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "salah"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    // Wrong Username 
    it('should reject login if username is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "salah",
                password: "salah"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

// Get
describe('GET /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
    });

    it('should reject if token is invalid', async () => {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'salah');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});