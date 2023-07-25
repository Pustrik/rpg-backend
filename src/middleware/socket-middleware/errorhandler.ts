import SocketService, {SocketResponse} from "../../services/socket-service";
import ApiError from "../../exteptions/api-exceptions";

const errorHandler = (handler, socket) => {
    const handleError = (err) => {
        console.error('error', '',  {
            message: 'Error Handler Socket',
            body: {
                inFunction: Object(handler).name,
                secretKey: undefined,
                publicKey: undefined
            },
            err
        });
        if(!(err instanceof ApiError)) {
            return SocketService.sendMessage('error', [socket]);
        }
        SocketService.sendMessage(err.message as SocketResponse, [socket]);
    };

    return (...args) => {
        try {
            const ret = handler.apply(this, args);
            if (ret && typeof ret.catch === "function") {
                ret.catch(handleError);
            }
        } catch (e) {
            handleError(e);
        }
    };
};

export default errorHandler;