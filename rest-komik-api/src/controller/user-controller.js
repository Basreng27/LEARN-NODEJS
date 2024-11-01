import userService from '../services/user-service.js'

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body)

        res.status(200).json({
            status: true,
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)

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
        
        const result = await userService.get(id)

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
        
        const result = await userService.update(id, req.body)
        
        res.status(200).json({
            status: true,
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const logout = async (req, res, next) => {
    try {
        const id = req.params.id

        await userService.logout(id)

        res.status(200).json({
            status: true,
            data: "OK"
        })
    } catch (e) {
        next(e)
    }
}

export default {
    register,
    login,
    get,
    update,
    logout
}