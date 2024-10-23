import { describe, afterEach, it, beforeEach } from 'node:test'
import { createManyTestGenres, createTestGenre, createTestUser, getTestGenre, removeTestComic, removeTestGenre, removeTestUser } from './test-utils.js'
import supertest from 'supertest'
import { expect } from 'expect';
import fs from 'fs';
import path from 'path';
import { web } from '../src/app/web.js'

// const __dirname = path.dirname(new URL(import.meta.url).pathname.replace(/%20/g, ' '));
const __dirname = path.resolve(); // Path

describe('POST /api/comic', () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestGenre();
    });

    afterEach(async () => {
        await removeTestComic();
        await removeTestUser();
        await removeTestGenre();
    });

    it('should create new comic with image upload', async () => {
        // Simulation Image
        const imagesDir = path.join(__dirname, 'rest-komik-api/test/images'); // Path Image
        const imagePath = path.join(imagesDir, 'test.png');
        const imageBuffer = Buffer.from('test image data'); // Simulation Data
        
        // Path Is Exist
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true }); // Create
        }
        
        // Save Temporary
        fs.writeFileSync(imagePath, imageBuffer);

        const result = await supertest(web)
            .post('/api/comic')
            .set('Authorization', 'test')
            .attach('image', imagePath)
            .field('name', 'test')
            .field('type', 'Manhwa')
            .field('genre_id', 1);
        
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.type).toBe('Manhwa');
        
        expect(result.body.data.genre.id).toBe(1);
        expect(result.body.data.genre.name).toBe('test genre');

        // Varification Images
        expect(result.body.data.image).toBeDefined();
        expect(result.body.data.image).not.toBeNull();

        // Image Is Buffer
        expect(result.body.data.image.type).toBe('Buffer');

        // Delete Temporary Image
        try {
            fs.unlinkSync(imagePath);
        } catch (err) {
            console.error('Error deleting temporary image file:', err);
        }
    });

    it('should create new comic withouth image', async () => {
        const result = await supertest(web)
            .post('/api/comic')
            .set('Authorization', 'test')
            .send({
                name: 'test',
                type: 'Manhwa',
                genre_id: 1,
            });
            
        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.type).toBe('Manhwa');
        expect(result.body.data.image).toBeNull();
        
        expect(result.body.data.genre.id).toBe(1);
        expect(result.body.data.genre.name).toBe('test genre');
    });

    it('reject if invalid', async () => {
        const result = await supertest(web)
            .post('/api/comic')
            .set('Authorization', 'test')
            .send({
                name: '',
                type: '',
                genre_id: null,
            });

        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
    });
})

// describe('PUT /api/comic/:id', () => {
//     beforeEach(async () => {
//         await createTestUser();
//         await createTestGenre();
//     })

//     afterEach(async () => {
//         await removeTestGenre();
//         await removeTestUser();
//     })

//     it('should update genre', async () => {
//         const result = await supertest(web)
//             .put('/api/comic/' + 1)
//             .set('Authorization', 'test')
//             .send({
//                 name: 'test genre 2',
//             })

//         expect(result.status).toBe(200)
//         expect(result.body.data.id).toBe(1)
//         expect(result.body.data.name).toBe('test genre 2')
//     })

//     it('reject if invalid', async () => {
//         const result = await supertest(web)
//             .put('/api/comic/' + 1)
//             .set('Authorization', 'test')
//             .send({
//                 name: '',
//             });
                
//         expect(result.status).toBe(400)
//         expect(result.body.error).toBeDefined()
//     })

//     it('reject if genre is not found', async () => {
//         const result = await supertest(web)
//             .put('/api/comic/' + 2)
//             .set('Authorization', 'test')
//             .send({
//                 name: '',
//             });
//         expect(result.status === 404 || result.status === 400).toBe(true);
//         expect(result.body.error).toBeDefined()
//     })
// })

// describe('GET /api/comic/:id', () => {
//     beforeEach(async () => {
//         await createTestUser();
//         await createTestGenre();
//     })

//     afterEach(async () => {
//         await removeTestGenre();
//         await removeTestUser();
//     })

//     it('should get genre', async () => {
//         const result = await supertest(web)
//             .get('/api/comic/' + 1)
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(200)
//         expect(result.body.data.id).toBe(1)
//         expect(result.body.data.name).toBe('test genre')
//     })

//     it('reject if genre is not found', async () => {
//         const result = await supertest(web)
//             .get('/api/comic/' + 2)
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(404);
//         expect(result.body.error).toBeDefined()
//     })
// })

// describe('GET /api/comic', () => {
//     beforeEach(async () => {
//         await createTestUser();
//         await createManyTestGenres();
//     })

//     afterEach(async () => {
//         await removeTestGenre();
//         await removeTestUser();
//     })

//     it('should get all', async () => {
//         const result = await supertest(web)
//             .get('/api/comic')
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(200)
//         expect(result.body.data.length).toBe(10)
//         expect(result.body.paging.page).toBe(1)
//         expect(result.body.paging.total_page).toBe(2)
//         expect(result.body.paging.total_item).toBe(15)
//     })

//     it('should get page 2', async () => {
//         const result = await supertest(web)
//             .get('/api/comic')
//             .query({
//                 page: 2
//             })
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(200)
//         expect(result.body.data.length).toBe(5)
//         expect(result.body.paging.page).toBe(2)
//         expect(result.body.paging.total_page).toBe(2)
//         expect(result.body.paging.total_item).toBe(15)
//     })

//     it('should search using name', async () => {
//         const result = await supertest(web)
//             .get('/api/comic')
//             .query({
//                 name: "test 1"
//             })
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(200)
//         expect(result.body.data.length).toBe(6)
//         expect(result.body.paging.page).toBe(1)
//         expect(result.body.paging.total_page).toBe(1)
//         expect(result.body.paging.total_item).toBe(6)
//     })
// })

// describe('DELETE /api/comic/:id', () => {
//     beforeEach(async () => {
//         await createTestUser();
//         await createTestGenre();
//     })

//     afterEach(async () => {
//         await removeTestGenre();
//         await removeTestUser();
//     })

//     it('should can delete', async () => {
//         let testGenre = await getTestGenre();
//         const result = await supertest(web)
//             .delete('/api/comic/' + 1)
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(200)
//         expect(result.body.data).toBe("OK")

//         testGenre = await getTestGenre();
//         expect(testGenre).toBeNull();
//     })

//     it('reject id genre not found', async () => {
//         const result = await supertest(web)
//             .delete('/api/comic/' + 2)
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(404)
//         expect(result.body.error).toBeDefined()
//     })
// })