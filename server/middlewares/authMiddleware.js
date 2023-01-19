import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if (!token) return res.status(403).json({ message: "Access Denied" });
        if (token.startsWith('Bearer ')) {
            token = token.slice(0, token.length).trimLeft();
        }
        const verifyUser = jwt.verify(token, process.env.JWT_SECRET)
        if (verifyUser) {
            res.user = verifyUser;
            return next();
        }
        else return res.status(403).json({ message: "Access Denied" });
    } catch (ex) {
        next(ex);
    }

}