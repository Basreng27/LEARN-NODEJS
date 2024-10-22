import { describe, afterEach, it, beforeEach } from 'node:test'
import { createTestGenre, createTestUser, removeTestGenre, removeTestUser } from './test-utils.js'
import supertest from 'supertest'
import { expect } from 'expect';
import { web } from '../src/app/web.js'

describe('POST /api/comic/genre', () => {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestGenre();
        await removeTestUser();
    })

    it('should create new genre', async () => {
        const result = await supertest(web)
            .post('/api/comic/genre')
            .set('Authorization', 'test')
            .send({
                name: 'test genre',
            })
            
        expect(result.status).toBe(200)
        expect(result.body.data.name).toBe('test genre')
    })

    it('reject if invalid', async () => {
        const result = await supertest(web)
            .post('/api/comic/genre')
            .set('Authorization', 'test')
            .send({
                name: '',
            });
                
        expect(result.status).toBe(400)
        expect(result.body.error).toBeDefined()
    })
})

describe('PUT /api/comic/genre/:id', () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestGenre();
    })

    afterEach(async () => {
        await removeTestGenre();
        await removeTestUser();
    })

    it('should update genre', async () => {
        const result = await supertest(web)
            .put('/api/comic/genre/' + 1)
            .set('Authorization', 'test')
            .send({
                name: 'test genre 2',
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(1)
        expect(result.body.data.name).toBe('test genre 2')
    })

    it('reject if invalid', async () => {
        const result = await supertest(web)
            .put('/api/comic/genre/' + 1)
            .set('Authorization', 'test')
            .send({
                name: '',
            });
                
        expect(result.status).toBe(400)
        expect(result.body.error).toBeDefined()
    })

    it('reject if genre is not found', async () => {
        const result = await supertest(web)
            .put('/api/comic/genre/' + 2)
            .set('Authorization', 'test')
            .send({
                name: '',
            });
        expect(result.status === 404 || result.status === 400).toBe(true);
        expect(result.body.error).toBeDefined()
    })
})

describe('GET /api/comic/genre/:id', () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestGenre();
    })

    afterEach(async () => {
        await removeTestGenre();
        await removeTestUser();
    })

    it('should get genre', async () => {
        const result = await supertest(web)
            .get('/api/comic/genre/' + 1)
            .set('Authorization', 'test')
            
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(1)
        expect(result.body.data.name).toBe('test genre')
    })

    it('reject if genre is not found', async () => {
        const result = await supertest(web)
            .get('/api/comic/genre/' + 2)
            .set('Authorization', 'test')
            
        expect(result.status).toBe(404);
        expect(result.body.error).toBeDefined()
    })
})
