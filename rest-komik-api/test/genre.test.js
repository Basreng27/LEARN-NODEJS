import { describe, afterEach, it, beforeEach } from 'node:test'
import { createTestUser, removeTestGenre, removeTestUser } from './test-utils.js'
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
