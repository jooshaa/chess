import { JwtService } from "../utils/jwt.js";

export async function authToken (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error("No authorization header");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("token not found");
        }

        const user = await JwtService.verifyAccessToken(token);
        if (!user) {
            throw new Error("Invalid token");
        }

        req.user = user; // eto dlya togo chtobi postavit udobstva dlya sledushego
        console.log(user);
        
        next();
    } catch (err) {
        next(err);
    }
};