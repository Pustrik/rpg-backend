"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requestLogger(req, res, next) {
    console.log(`Method:: ${req.method} url:: ${req.url}`);
    console.log(`Body:: ${JSON.stringify(req.body)}`);
    next();
}
exports.default = requestLogger;
//# sourceMappingURL=requesthandler.js.map