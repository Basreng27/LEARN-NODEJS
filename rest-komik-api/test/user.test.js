import { describe, afterEach, it, beforeEach } from 'node:test'
import { createTestUser, getTestUser, removeTestUser } from './test-utils.js'
import supertest from 'supertest'
import { expect } from 'expect';
import { web } from '../src/app/web.js'
import bcrypt from 'bcrypt'

describe('POST /api/comic/regist', () => {
    afterEach(async () => {
        await removeTestUser();
    })

    it('register new user', async () => {
        const result = await supertest(web)
            .post('/api/comic/regist')
            .send({
                username: 'test',
                password: 'test',
                password_confirm: 'test',
            })

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.password).toBeUndefined()
    })

    it('reject if invalid', async () => {
        const result = await supertest(web)
            .post('/api/comic/regist')
            .send({
                username: '',
                password: '',
                password_confirm: '',
            });
                
        expect(result.status).toBe(400)
        expect(result.body.error).toBeDefined()
    })

    it('reject if password do not match', async () => {
        const result = await supertest(web)
            .post('/api/comic/regist')
            .send({
                username: 'test',
                password: 'test',
                password_confirm: 'test123',
            });
                
        expect(result.status).toBe(400)
        expect(result.body.error).toBeDefined()
    })

    it('reject if username already resgistered', async () => {
        let result = await supertest(web)
        .post('/api/comic/regist')
        .send({
            username: 'test',
            password: 'test',
            password_confirm: 'test',
        });
        
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.password).toBeUndefined();
        
        result = await supertest(web)
        .post('/api/comic/regist')
        .send({
            username: 'test',
            password: 'test',
            password_confirm: 'test',
        });

        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
    });
})

describe('POST /api/comic/login', () => {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/comic/login')
            .send({
                username: "test",
                password: "test"
            });

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe("test")
    })

    it('reject invalid request', async () => {
        const result = await supertest(web)
            .post('/api/comic/login')
            .send({
                username: "",
                password: ""
            });

        expect(result.status).toBe(400)
        expect(result.body.error).toBeDefined()
    })

    it('reject wrong password', async () => {
        const result = await supertest(web)
            .post('/api/comic/login')
            .send({
                username: "test",
                password: "test123"
            });

        expect(result.status).toBe(401)
        expect(result.body.error).toBeDefined()
    })

    it('reject wrong username', async () => {
        const result = await supertest(web)
            .post('/api/comic/login')
            .send({
                username: "test123",
                password: "test"
            });

        expect(result.status).toBe(401)
        expect(result.body.error).toBeDefined()
    })
})

describe('GET /api/comic/user/:id', () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get data', async () => {
        const result = await supertest(web)
            .get('/api/comic/user/' + 38)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(38);
        expect(result.body.data.username).toBe("test");
    })

    it('reject invalid token', async () => {
        const result = await supertest(web)
            .get('/api/comic/user/' + 38)
            .set('Authorization', 'test123');

        expect(result.status).toBe(401);
        expect(result.body.error).toBeDefined();
    })
})

describe('PATCH /api/comic/user/:id', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can update', async () => {
        const result = await supertest(web)
            .patch("/api/comic/user/" + 1)
            .set("Authorization", "test")
            .send({
                password: "testtest"
            });

        expect(result.status).toBe(200);

        const user = await getTestUser();
        expect(await bcrypt.compare("testtest", user.password)).toBe(true);
    });

    it('reject if request is not valid', async () => {
        const result = await supertest(web)
            .patch("/api/comic/user/" + 1)
            .set("Authorization", "salah")
            .send({});

        expect(result.status).toBe(401);
    });
});