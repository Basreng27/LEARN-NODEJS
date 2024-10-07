import { prismaClient } from "../application/database.js";

// Auth To Get Token
export const authMiddleware = async (req, res, next) => {
    // From Header Auth
    const token = req.get('Authorization');

    // If Doesn't Have Token
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end() // end() = return False
    } else { // Have Token
        const user = await prismaClient.user.findFirst({
            where: {
                token: token,
            }
        })

        // If User Doesn't Have Token
        if (!user) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end() // end() = return False
        } else {
            // Send User To Request
            req.user = user;

            next()
        }
    }
}