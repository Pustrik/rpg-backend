import ApiError from "../exteptions/api-exceptions";
const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default class ValidationService {
    static password(pass: string, passDuplicate?: string) {
        if(passDuplicate && pass != passDuplicate)
            throw ApiError.badRequest('Пароли не совпадают');
        if(pass.length < 4 || pass.length > 24)
            throw ApiError.badRequest('Не верная длинна пароля');
    }

    static username(username: string) {
        if(username.length < 4 || username.length > 14)
            throw ApiError.badRequest('Не верная длинна юзернейма');
    }

    static email(email: string) {
        if(!expression.test(email))
            throw ApiError.badRequest('Не верная почта');
    }
}