import {NextFunction, Request, Response} from "express";

function requestLogger(req: Request,
                       res: Response,
                       next: NextFunction) {
    console.log(`Method:: ${req.method} url:: ${req.url}`);
    console.log(`Body:: ${JSON.stringify(req.body)}`);
    next()
}

export default requestLogger;