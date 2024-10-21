import { describe, afterEach, it } from 'node:test'
import { removeTestUser } from './test-utils.js'
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
})

