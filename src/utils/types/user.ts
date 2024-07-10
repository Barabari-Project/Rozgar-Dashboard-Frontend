export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    password: string;
    address: {
        line1: string;
        line2?: string;
        city: string;
        pincode: number;
    };
}