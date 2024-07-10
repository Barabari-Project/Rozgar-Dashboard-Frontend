import { ISignUpForm } from "../types/form";

export const sanitizeSignUpFormData = (signUpFormData: ISignUpForm) => {
    signUpFormData.firstName = signUpFormData.firstName.trim();
    signUpFormData.lastName = signUpFormData.lastName.trim();
    signUpFormData.address.line1 = signUpFormData.address.line1.trim();
    signUpFormData.address.line2 = signUpFormData.address.line2?.trim();
    signUpFormData.address.city = signUpFormData.address.city.trim();
    return signUpFormData;
}