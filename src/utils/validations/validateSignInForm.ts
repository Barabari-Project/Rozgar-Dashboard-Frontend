import { passwordRegex, phoneRegex } from "../../constants/regexPatterns";
import { IValidationErrors } from "../types/error";
import { ISignInForm } from "../types/form";
import errorMessages from "../../constants/validationErrorMessages.json";

export const validateSignInForm = (formData: ISignInForm): IValidationErrors => {
    let tempErrors: IValidationErrors = {};
    if (!phoneRegex.test(formData.phoneNumber)) {
        tempErrors.phoneNumber = errorMessages.phoneNumber;
    }
    if (!passwordRegex.test(formData.password)) {
        tempErrors.password = errorMessages.password;
    }
    return tempErrors;
}