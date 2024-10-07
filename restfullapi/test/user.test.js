import supertest from 'supertest';  // Use import for ECMAScript modules
import { web } from '../src/application/web.js';
import { describe, it, afterEach, beforeEach } from 'node:test';  // Change to import
import { expect } from 'expect';
import { logger } from '../src/application/logging.js';
import { removeTestUser, createTestUser, getTestUser } from './test-util.js';
import bcrypt from 'bcrypt'

// // Register
// describe('POST /api/users', function () {
//     // After sending data, clear the test data
//     afterEach(async () => {
//         await removeTestUser();
//     });

//     // Regist OK
//     it('should register a new user', async () => {
//         const result = await supertest(web)
//         .post('/api/users')
//         .send({
//             username: 'test',
//             password: 'test',
//             name: 'test',
//         });
        
//         // Expectations to match the response
//         expect(result.status).toBe(200);
//         expect(result.body.data.username).toBe('test');
//         expect(result.body.data.name).toBe('test');
//         expect(result.body.data.password).toBeUndefined();  // Password should not be returned
//     });
    
//     // Regist Not OK
//     it('should reject if request is invalid', async () => {
//         const result = await supertest(web)
//             .post('/api/users')
//             .send({
//                 username: '',
//                 password: '',
//                 name: '',
//             });

//         logger.info(result.body);

//         // Expectations to match the response
//         expect(result.status).toBe(400);
//         expect(result.body.errors).toBeDefined();  // Must Have errors
//     });

//     // Regist Duplicate
//     it('should reject if username already resgistered', async () => {
//         let result = await supertest(web)
//         .post('/api/users')
//         .send({
//             username: 'test',
//             password: 'test',
//             name: 'test',
//         });
        
//         // Expectations to match the response
//         expect(result.status).toBe(200);
//         expect(result.body.data.username).toBe('test');
//         expect(result.body.data.name).toBe('test');
//         expect(result.body.data.password).toBeUndefined();  // Password should not be returned

//         result = await supertest(web)
//         .post('/api/users')
//         .send({
//             username: 'test',
//             password: 'test',
//             name: 'test',
//         });

//         logger.info(result.body);
        
//         // Expectations to match the response
//         expect(result.status).toBe(400);
//         expect(result.body.errors).toBeDefined();  // Must Have errors
//     });
// });

// // Login
// describe('POST /api/users/login', function () {
//     beforeEach(async () => {
//         // Create From utils
//         await createTestUser();
//     });
    
//     afterEach(async () => {
//         // Delete From utils
//         await removeTestUser();
//     });

//     // Can Login
//     it('should can login', async () => {
//         const result = await supertest(web)
//             .post('/api/users/login')
//             .send({
//                 username: "test",
//                 password: "test"
//             });

//         logger.info(result.body);

//         expect(result.status).toBe(200);
//         expect(result.body.data.token).toBeDefined();
//         expect(result.body.data.token).not.toBe("test");
//     });

//     // Cant Login
//     it('should reject login if request is invalid', async () => {
//         const result = await supertest(web)
//             .post('/api/users/login')
//             .send({
//                 username: "",
//                 password: ""
//             });

//         logger.info(result.body);

//         expect(result.status).toBe(400);
//         expect(result.body.errors).toBeDefined();
//     });

//     // Wrong Password
//     it('should reject login if password is wrong', async () => {
//         const result = await supertest(web)
//             .post('/api/users/login')
//             .send({
//                 username: "test",
//                 password: "salah"
//             });

//         logger.info(result.body);

//         expect(result.status).toBe(401);
//         expect(result.body.errors).toBeDefined();
//     });

//     // Wrong Username 
//     it('should reject login if username is wrong', async () => {
//         const result = await supertest(web)
//             .post('/api/users/login')
//             .send({
//                 username: "salah",
//                 password: "salah"
//             });

//         logger.info(result.body);

//         expect(result.status).toBe(401);
//         expect(result.body.errors).toBeDefined();
//     });
// });

// // Get
// describe('GET /api/users/current', function () {
//     beforeEach(async () => {
//         await createTestUser();
//     });

//     afterEach(async () => {
//         await removeTestUser();
//     });

//     // Get Data
//     it('should can get current user', async () => {
//         const result = await supertest(web)
//             .get('/api/users/current')
//             .set('Authorization', 'test');

//         expect(result.status).toBe(200);
//         expect(result.body.data.username).toBe('test');
//         expect(result.body.data.name).toBe('test');
//     });

//     // Failed Get Data
//     it('should reject if token is invalid', async () => {
//         const result = await supertest(web)
//             .get('/api/users/current')
//             .set('Authorization', 'salah');

//         expect(result.status).toBe(401);
//         expect(result.body.errors).toBeDefined();
//     });
// });

// // Update
// describe('PATCH /api/users/current', function () {
//     beforeEach(async () => {
//         await createTestUser();
//     });

//     afterEach(async () => {
//         await removeTestUser();
//     });

//     // Can Update
//     it('should can update user', async () => {
//         const result = await supertest(web)
//             .patch("/api/users/current")
//             .set("Authorization", "test")
//             .send({
//                 name: "wandi",
//                 password: "testagain"
//             });

//         expect(result.status).toBe(200);
//         expect(result.body.data.username).toBe("test");
//         expect(result.body.data.name).toBe("wandi");

//         const user = await getTestUser();
//         expect(await bcrypt.compare("testagain", user.password)).toBe(true);
//     });

//     // Can Update Name
//     it('should can update user name', async () => {
//         const result = await supertest(web)
//             .patch("/api/users/current")
//             .set("Authorization", "test")
//             .send({
//                 name: "wandi"
//             });

//         expect(result.status).toBe(200);
//         expect(result.body.data.username).toBe("test");
//         expect(result.body.data.name).toBe("wandi");
//     });

//     // Can Update Password
//     it('should can update user password', async () => {
//         const result = await supertest(web)
//             .patch("/api/users/current")
//             .set("Authorization", "test")
//             .send({
//                 password: "testagain"
//             });

//         expect(result.status).toBe(200);
//         expect(result.body.data.username).toBe("test");
//         expect(result.body.data.name).toBe("test");

//         const user = await getTestUser();
//         expect(await bcrypt.compare("testagain", user.password)).toBe(true);
//     });

//     // Cannot Update
//     it('should reject if request is not valid', async () => {
//         const result = await supertest(web)
//             .patch("/api/users/current")
//             .set("Authorization", "salah")
//             .send({});

//         expect(result.status).toBe(401);
//     });
// });

describe('DELETE /api/users/logout', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    // Can Logout
    it('should can logout', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });

    //  Cant Logout
    it('should reject logout if token is invalid', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'salah');

        expect(result.status).toBe(401);
    });
});
