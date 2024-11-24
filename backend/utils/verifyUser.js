import jwt from "jsonwebtoken"
import User from "../models/userModel"

export const verifyUser= async (req, res, next)=>{
    try {
        const token = req.headers.authorization?.split('')[1]
        if (!token) {
            return res.status(401).json({message: 'Unauthorised'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(404).json({message: 'user no found'})
        }
        req.user = user
    } catch (error) {
        res.status(401).json({message: 'invalid token', error: error.message})
    }
}