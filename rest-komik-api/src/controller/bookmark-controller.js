import { ResponseError } from '../errors/response-error.js'
import bookmarkService from '../services/bookmark-service.js'

const create = async (req, res, next) => {
    try {
        const result = await bookmarkService.create(req.body)
        
        res.status(200).json({
            status: true,
            data: result
        })
    } catch (e) {
        next(e)
    }
}

// const update = async (req, res, next) => {
//     upload(req, res, async (err) => {
//         if (req.file && err) {
//             throw new ResponseError(400, "Failed Upload")
//         }

//         try {
//             const id = req.params.id
            
//             const result = await comicService.update(id, req.body, req.file)
    
//             res.status(200).json({
//                 status: true,
//                 data: result
//             })
//         } catch (e) {
//             next(e)
//         }
//     })
// }

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
//             type: req.query.type,
//             genre_name: req.query.genre_name,
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
    // update,
    // get,
    // searchAndAll,
    // remove
}