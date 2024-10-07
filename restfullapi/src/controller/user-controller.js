import userService from '../service/user-service.js'

const register = async (req, res, next) => {
    try {
        // Send To Service
        const result = await userService.register(req.body)
        
        res.status(200).json({
            data: result
        })
    } catch (error) {
        // Send To Midlleware Handler If Error
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        // Send To Service
        const result = await userService.login(req.body);
        
        res.status(200).json({
            data: result
        });
    } catch (e) {
        // Send To Midlleware Handler If Error
        next(e);
    }
}

// Using "default" If Can More Than 1
export default {
    register,
    login
}
