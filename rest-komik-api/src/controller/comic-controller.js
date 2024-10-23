import { ResponseError } from '../errors/response-error.js'
import comicService from '../services/comic-service.js'
import multer from "multer"

// Multer For Upload Images
// Configuration Multer
const storage = multer.memoryStorage() // Save File Temporary As Buffer
const upload = multer({storage: storage}).single('image') // Just 1 File Not Multiple

const create = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (req.file && err) {
            throw new ResponseError(400, "Failed Upload")
        }

        try {
            const result = await comicService.create(req.body, req.file)
            
            res.status(200).json({
                status: true,
                data: result
            })
        } catch (e) {
            next(e)
        }
    })
}

const update = async (req, res, next) => {
    upload(req, res, async (err) => {
        if (req.file && err) {
            throw new ResponseError(400, "Failed Upload")
        }

        try {
            const id = req.params.id
            
            const result = await comicService.update(id, req.body, req.file)
    
            res.status(200).json({
                status: true,
                data: result
            })
        } catch (e) {
            next(e)
        }
    })
}

// const get = async (req, res, next) => {
//     try {
//         const id = req.params.id
        
//         const result = await comicService.get(id)

//         res.status(200).json({
//             status: true,
//             data: result
//         })
//     } catch (e) {
//         next(e)
//     }
// }

// const searchAndAll = async (req, res, next) => {
//     try {
//         const request = {
//             name: req.query.name,
//             page: req.query.page,
//             size: req.query.size,
//         }
        
//         const result = await comicService.searchAndAll(request)

//         res.status(200).json({
//             status: true,
//             data: result.data,
//             paging: result.paging
//         })
//     } catch (e) {
//         next(e)
//     }
// }

// const remove = async (req, res, next) => {
//     try {
//         const id = req.params.id
        
//         await comicService.remove(id)

//         res.status(200).json({
//             status: true,
//             data: "OK"
//         })
//     } catch (e) {
//         next(e)
//     }
// }

export default {
    create,
    update,
    // get,
    // searchAndAll,
    // remove
}