import { describe, afterEach, it, beforeEach } from 'node:test'
import { creteTestUser, removeTestUser } from './test-utils.js'
import supertest from 'supertest'
import { expect } from 'expect';
import { web } from '../src/app/web.js'

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
        await creteTestUser();
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

