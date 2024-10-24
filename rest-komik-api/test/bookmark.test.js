import { describe, afterEach, it, beforeEach } from 'node:test'
import { createTestComic, createTestGenre, createTestUser, removeTestBookmark, removeTestComic, removeTestGenre, removeTestUser } from './test-utils.js'
import supertest from 'supertest'
import { expect } from 'expect';
import { web } from '../src/app/web.js'

describe('POST /api/comic/bookmark', () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestGenre();
        await createTestComic();
    });

    afterEach(async () => {
        await removeTestBookmark();
        await removeTestComic();
        await removeTestGenre();
        await removeTestUser();
    });

    it('should create new bookmark', async () => {
        const result = await supertest(web)
            .post('/api/comic/bookmark')
            .set('Authorization', 'test')
            .send({
                user_id: 1,
                comic_id: 1,
                last_chapter: 10,
                updated_at: new Date('2024-10-25')
            });
        
        expect(result.status).toBe(200);
        expect(result.body.data.last_chapter).toBe(10);
        
        expect(result.body.data.user_id.id).toBe(1);
        expect(result.body.data.user_id.username).toBe("test");

        expect(result.body.data.comic_id.name).toBe('test');
        expect(result.body.data.comic_id.type).toBe('Manhwa');
        expect(result.body.data.comic_id.image).toBeNull();
        
        expect(result.body.data.comic_id.genre.id).toBe(1);
        expect(result.body.data.comic_id.genre.name).toBe('test genre');
    });

    it('reject if invalid', async () => {
        const result = await supertest(web)
            .post('/api/comic/bookmark')
            .set('Authorization', 'test')
            .send({
                user_id: 1,
                comic_id: 1,
                last_chapter: null,
                updated_at: new Date('2024-10-25')
            });

        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
    });

    it('reject if user not found', async () => {
        const result = await supertest(web)
            .post('/api/comic/bookmark')
            .set('Authorization', 'test')
            .send({
                user_id: 2,
                comic_id: 1,
                last_chapter: 10,
                updated_at: new Date('2024-10-25')
            });

        expect(result.status).toBe(404);
        expect(result.body.error).toBeDefined();
    });

    it('reject if comic not found', async () => {
        const result = await supertest(web)
            .post('/api/comic/bookmark')
            .set('Authorization', 'test')
            .send({
                user_id: 1,
                comic_id: 2,
                last_chapter: 10,
                updated_at: new Date('2024-10-25')
            });
            
        expect(result.status).toBe(404);
        expect(result.body.error).toBeDefined();
    });
})

// describe('PATCH /api/comic/bookmark/:id', () => {
//     beforeEach(async () => {
//         await createTestUser();
//         await createTestGenre();
//         await createTestComic();
//     })

//     afterEach(async () => {
//         await removeTestComic();
//         await removeTestGenre();
//         await removeTestUser();
//     })

//     it('should update comic with image upload', async () => {
//         // Simulation Image
//         const imagesDir = path.join(__dirname, 'rest-komik-api/test/images'); // Path Image
//         const imagePath = path.join(imagesDir, 'test.png');
//         const imageBuffer = Buffer.from('test image data'); // Simulation Data
        
//         // Path Is Exist
//         if (!fs.existsSync(imagesDir)) {
//             fs.mkdirSync(imagesDir, { recursive: true }); // Create
//         }
        
//         // Save Temporary
//         fs.writeFileSync(imagePath, imageBuffer);

//         const result = await supertest(web)
//             .patch('/api/comic/bookmark/' + 1)
//             .set('Authorization', 'test')
//             .attach('image', imagePath)
//             .field('name', 'test 2')
//             .field('type', 'Manga')
//             .field('genre_id', 1);
            
//         expect(result.status).toBe(200);
//         expect(result.body.data.name).toBe('test 2');
//         expect(result.body.data.type).toBe('Manga');
        
//         expect(result.body.data.genre.id).toBe(1);
//         expect(result.body.data.genre.name).toBe('test genre');

//         // Varification Images
//         expect(result.body.data.image).toBeDefined();
//         expect(result.body.data.image).not.toBeNull();

//         // Image Is Buffer
//         expect(result.body.data.image.type).toBe('Buffer');

//         // Delete Temporary Image
//         try {
//             fs.unlinkSync(imagePath);
//         } catch (err) {
//             console.error('Error deleting temporary image file:', err);
//         }
//     });

//     it('should update comic without image upload', async () => {
//         const result = await supertest(web)
//             .patch('/api/comic/bookmark/' + 1)
//             .set('Authorization', 'test')
//             .send({
//                 name: 'test 2',
//                 type: 'Manga',
//                 genre_id: 1,
//             });
            
//         expect(result.status).toBe(200);
//         expect(result.body.data.name).toBe('test 2');
//         expect(result.body.data.type).toBe('Manga');
        
//         expect(result.body.data.genre.id).toBe(1);
//         expect(result.body.data.genre.name).toBe('test genre');
//     });
    
//     it('reject if comic not found', async () => {
//         const result = await supertest(web)
//             .patch('/api/comic/bookmark/' + 2)
//             .set('Authorization', 'test')
//             .send({
//                 name: 'test 2',
//                 type: 'Manga',
//                 genre_id: 1,
//             });
            
//         expect(result.status).toBe(404);
//         expect(result.body.error).toBeDefined();
//     });

//     it('reject if genre not found', async () => {
//         const result = await supertest(web)
//             .patch('/api/comic/bookmark/' + 1)
//             .set('Authorization', 'test')
//             .send({
//                 name: 'test 2',
//                 type: 'Manga',
//                 genre_id: 2,
//             });
            
//         expect(result.status).toBe(404);
//         expect(result.body.error).toBeDefined();
//     });
// })

// describe('GET /api/comic/bookmark/:id', () => {
//     beforeEach(async () => {
//         await createTestUser();
//         await createTestGenre();
//         await createTestComic();
//     })

//     afterEach(async () => {
//         await removeTestComic();
//         await removeTestGenre();
//         await removeTestUser();
//     })

//     it('should get comic', async () => {
//         const result = await supertest(web)
//             .get('/api/comic/bookmark/' + 1)
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(200)
//         expect(result.body.data.id).toBe(1)
//         expect(result.body.data.name).toBe('test')
//         expect(result.body.data.image).toBeNull()
//         expect(result.body.data.type).toBe('Manhwa')
//         expect(result.body.data.genre.id).toBe(1)
//         expect(result.body.data.genre.name).toBe('test genre')
//     })

//     it('reject if comic is not found', async () => {
//         const result = await supertest(web)
//             .get('/api/comic/bookmark/' + 2)
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(404);
//         expect(result.body.error).toBeDefined()
//     })
// })

// describe('GET /api/comic/bookmark', () => {
//     beforeEach(async () => {
//         await createTestUser();
//         await createTestGenre();
//         await createManyTestComics();
//     })

//     afterEach(async () => {
//         await removeTestComic();
//         await removeTestGenre();
//         await removeTestUser();
//     })

//     it('should get all', async () => {
//         const result = await supertest(web)
//             .get('/api/comic/bookmark')
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(200)
//         expect(result.body.data.length).toBe(10)
//         expect(result.body.paging.page).toBe(1)
//         expect(result.body.paging.total_page).toBe(2)
//         expect(result.body.paging.total_item).toBe(15)
//     })

//     it('should get page 2', async () => {
//         const result = await supertest(web)
//             .get('/api/comic/bookmark')
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
//             .get('/api/comic/bookmark')
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

//     it('should search using type', async () => {
//         const result = await supertest(web)
//             .get('/api/comic/bookmark')
//             .query({
//                 type: "Manhwa"
//             })
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(200)
//         expect(result.body.data.length).toBe(10)
//         expect(result.body.paging.page).toBe(1)
//         expect(result.body.paging.total_page).toBe(2)
//         expect(result.body.paging.total_item).toBe(15)
//     })

//     it('should search using genre name', async () => {
//         const result = await supertest(web)
//             .get('/api/comic/bookmark')
//             .query({
//                 genre_name: "test"
//             })
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(200)
//         expect(result.body.data.length).toBe(10)
//         expect(result.body.paging.page).toBe(1)
//         expect(result.body.paging.total_page).toBe(2)
//         expect(result.body.paging.total_item).toBe(15)
//     })
// })

// describe('DELETE /api/comic/bookmark/:id', () => {
//     beforeEach(async () => {
//         await createTestUser();
//         await createTestGenre();
//         await createTestComic();
//     })

//     afterEach(async () => {
//         await removeTestComic();
//         await removeTestGenre();
//         await removeTestUser();
//     })

//     it('should can delete', async () => {
//         let testComic = await getTestComic();
//         const result = await supertest(web)
//             .delete('/api/comic/bookmark/' + 1)
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(200)
//         expect(result.body.data).toBe("OK")

//         testComic = await getTestComic();
//         expect(testComic).toBeNull();
//     })

//     it('reject id genre not found', async () => {
//         const result = await supertest(web)
//             .delete('/api/comic/bookmark/' + 2)
//             .set('Authorization', 'test')
            
//         expect(result.status).toBe(404)
//         expect(result.body.error).toBeDefined()
//     })
// })