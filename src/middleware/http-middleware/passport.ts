import ApiError from "../../exteptions/api-exceptions";
import TokenService from "../../services/token-service";

const passport = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader)
            return next(ApiError.unauthorizedError());

        const access_token = authHeader.split(' ')[1];
        if(!access_token)
            return next(ApiError.unauthorizedError());

        const userData = TokenService.validateAccess(access_token);
        if(!userData)
            return next(ApiError.unauthorizedError());

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.unauthorizedError());
    }
}
export default passport;