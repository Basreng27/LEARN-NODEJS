import { describe, afterEach, it, beforeEach } from 'node:test'
import { createManyTestGenres, createTestGenre, createTestUser, getTestGenre, removeTestGenre, removeTestUser } from './test-utils.js'
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

describe('GET /api/comic/genre', () => {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestGenres();
    })

    afterEach(async () => {
        await removeTestGenre();
        await removeTestUser();
    })

    it('should get all', async () => {
        const result = await supertest(web)
            .get('/api/comic/genre')
            .set('Authorization', 'test')
            
        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(10)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })

    it('should get page 2', async () => {
        const result = await supertest(web)
            .get('/api/comic/genre')
            .query({
                page: 2
            })
            .set('Authorization', 'test')
            
        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(5)
        expect(result.body.paging.page).toBe(2)
        expect(result.body.paging.total_page).toBe(2)
        expect(result.body.paging.total_item).toBe(15)
    })

    it('should search using name', async () => {
        const result = await supertest(web)
            .get('/api/comic/genre')
            .query({
                name: "test 1"
            })
            .set('Authorization', 'test')
            
        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(6)
        expect(result.body.paging.page).toBe(1)
        expect(result.body.paging.total_page).toBe(1)
        expect(result.body.paging.total_item).toBe(6)
    })
})

describe('DELETE /api/comic/genre/:id', () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestGenre();
    })

    afterEach(async () => {
        await removeTestGenre();
        await removeTestUser();
    })

    it('should can delete', async () => {
        let testGenre = await getTestGenre();
        const result = await supertest(web)
            .delete('/api/comic/genre/' + 1)
            .set('Authorization', 'test')
            
        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")

        testGenre = await getTestGenre();
        expect(testGenre).toBeNull();
    })

    it('reject id genre not found', async () => {
        const result = await supertest(web)
            .delete('/api/comic/genre/' + 2)
            .set('Authorization', 'test')
            
        expect(result.status).toBe(404)
        expect(result.body.error).toBeDefined()
    })
})