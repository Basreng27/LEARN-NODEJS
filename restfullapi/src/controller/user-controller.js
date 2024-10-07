import userService from '../service/user-service.js'

// For Register
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

// For Login
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

// For Get Data
const get = async (req, res, next) => {
    try {
        // Send To Service
        const username = req.user.username;

        const result = await userService.get(username);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

// For Update 
const update = async (req, res, next) => {
    try {
        const username = req.user.username;
        const request = req.body;

        request.username = username

        const result = await userService.update(request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

// For Get Data
const logout = async (req, res, next) => {
    try {
        // Send To Service
        await userService.logout(req.user.username);

        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

// Using "default" If Can More Than 1
export default {
    register,
    login,
    get,
    update,
    logout
}
