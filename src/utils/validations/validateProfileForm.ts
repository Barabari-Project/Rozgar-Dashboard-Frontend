import { emailRegex, nameRegex, string50CharRegex, phoneRegex } from "../../constants/regexPatterns";
import { IValidationErrors } from "../types/error";
import { IUser } from "../types/user";
import errorMessages from "../../constants/validationErrorMessages.json";

export const validateProfileForm = (data: IUser): IValidationErrors => {
    const tempErrors: IValidationErrors = {};
    
    if (!phoneRegex.test(data.phoneNumber)) {
        tempErrors.phoneNumber = errorMessages.phoneNumber;
    }
    if (!nameRegex.test(data.firstName)) {
        tempErrors.firstName = errorMessages.firstName;
    }
    if (!nameRegex.test(data.lastName)) {
        tempErrors.lastName = errorMessages.lastName;
    }
    if (!emailRegex.test(data.email)) {
        tempErrors.email = errorMessages.email;
    }
    if(!string50CharRegex.test(data.university)){
        tempErrors.university = errorMessages.university;
    }
    if(!string50CharRegex.test(data.degree)){
        tempErrors.degree = errorMessages.degree;
    }
    if(!string50CharRegex.test(data.region)){
        tempErrors.region = errorMessages.region;
    }
    if(!string50CharRegex.test(data.gender)){
        tempErrors.gender = errorMessages.gender;
    }
    if(!string50CharRegex.test(data.organisationName)){
        tempErrors.organisationName = errorMessages.organisationName;
    }

    return tempErrors;
};