import ValidationService from "../services/validation-service";

const userValidation = (username: string, password: string, passwordD: string, email?: string) => {
        ValidationService.username(username);
        ValidationService.password(password, passwordD);
        if(email) ValidationService.email(email);
}

export default userValidation;