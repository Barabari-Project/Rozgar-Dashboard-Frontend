// src/validators/validateSignUpForm.ts

import { addressRegex, emailRegex, nameRegex, passwordRegex, phoneRegex, pincodeRegex } from "../../constants/regexPatterns";
import { IValidationErrors } from "../types/error";
import { ISignUpForm } from "../types/form";
import errorMessages from "../../constants/validationErrorMessages.json";

export const validateSignUpForm = (formData: ISignUpForm): IValidationErrors => {
    let tempErrors: IValidationErrors = {};
    
    if (!phoneRegex.test(formData.phoneNumber)) {
        tempErrors.phoneNumber = errorMessages.phoneNumber;
    }
    if (!nameRegex.test(formData.firstName)) {
        tempErrors.firstName = errorMessages.firstName;
    }
    if (!nameRegex.test(formData.lastName)) {
        tempErrors.lastName = errorMessages.lastName;
    }
    if (!emailRegex.test(formData.email)) {
        tempErrors.email = errorMessages.email;
    }
    if (!passwordRegex.test(formData.password)) {
        tempErrors.password = errorMessages.password;
    }
    if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = errorMessages.confirmPassword;
    }
    if (!addressRegex.test(formData.address.line1)) {
        tempErrors.line1 = errorMessages.line1;
    }
    if (formData.address.line2 && !addressRegex.test(formData.address.line2)) {
        tempErrors.line2 = errorMessages.line2;
    }
    if (!addressRegex.test(formData.address.city)) {
        tempErrors.city = errorMessages.city;
    }
    if (!pincodeRegex.test(formData.address.pincode)) {
        tempErrors.pincode = errorMessages.pincode;
    }

    return tempErrors;
};
