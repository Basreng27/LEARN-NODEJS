import genreService from '../services/genre-service.js'

const create = async (req, res, next) => {
    try {
        const result = await genreService.create(req.body)

        res.status(200).json({
            status: true,
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id
        
        const result = await genreService.update(id, req.body)

        res.status(200).json({
            status: true,
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const id = req.params.id
        
        const result = await genreService.get(id)

        res.status(200).json({
            status: true,
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const searchAndAll = async (req, res, next) => {
    try {
        const request = {
            name: req.query.name,
            page: req.query.page,
            size: req.query.size,
        }
        
        const result = await genreService.searchAndAll(request)

        res.status(200).json({
            status: true,
            data: result.data,
            paging: result.paging
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        
        await genreService.remove(id)

        res.status(200).json({
            status: true,
            data: "OK"
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    update,
    get,
    searchAndAll,
    remove
}