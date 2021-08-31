// import passport from "passport";
import passport from "../configs/passport.js";

export const login = (req, res, next) => {
        passport.authenticate("login", { session: true }, (err, user, info) => {
        if (err || !user) {
            let message = err;
            if (info) {
            message = info.message;
            }
            return res.status(401).json({
            status: "error",
            error: {
                message,
            },
            });
        }
    })
}

export const protectedRoute = async (req, res) => {
        res.status(200).json({
        status: "success",
        data: {
            msg: "Welcome",
            success: true
        },
        });
    }
