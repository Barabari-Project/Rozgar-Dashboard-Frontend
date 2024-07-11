import { emailRegex, passwordRegex } from "../../constants/regexPatterns";
import { IValidationErrors } from "../types/error";
import { ISignInForm } from "../types/form";
import errorMessages from "../../constants/validationErrorMessages.json";

export const validateSignInForm = (formData: ISignInForm): IValidationErrors => {
    let tempErrors: IValidationErrors = {};
    if (!emailRegex.test(formData.email)) {
        tempErrors.email = errorMessages.email;
    }
    if (!passwordRegex.test(formData.password)) {
        tempErrors.password = errorMessages.password;
    }
    return tempErrors;
}