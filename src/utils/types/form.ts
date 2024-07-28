export interface ISignUpForm {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: IAddress;
}

export interface IAddress {
    line1: string;
    line2?: string | null;
    city: string;
    pincode: string;
}

export interface ISignInForm{
    phoneNumber: string;
    password: string;
}

