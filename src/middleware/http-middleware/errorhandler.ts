import ApiError from "../../exteptions/api-exceptions";
import {NextFunction, Request, Response} from "express";

const errorLoggerHttp = (error: Error & Partial<ApiError>,
                          req: Request,
                          res: Response,
                          next: NextFunction) => {
    if(!(error instanceof ApiError)) {
        console.error('\x1b[31m', 'Server error', error);
        return next(error);
    }
    console.error( '\x1b[31m', 'error', {
        message: 'Error Handler Http',
        action: `Method:: ${req.method} url:: ${req.url}`,
        body: {
            ...req.body,
            secretKey: undefined,
            publicKey: undefined
        },
        error
    });
    return next(error);
}

const errorResponderHttp = (error: Error & Partial<ApiError>,
                            req: Request,
                            res: Response,
                            next: NextFunction) => {
    if(!(error instanceof ApiError))
        return res.status(500).json({message: 'Непредвиденная ошибка'});
    return res.status(error.status).json({message: error.message, errors: error.errors});
}

export {errorLoggerHttp, errorResponderHttp};