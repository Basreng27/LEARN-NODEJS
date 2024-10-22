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

export default {
    create,
}