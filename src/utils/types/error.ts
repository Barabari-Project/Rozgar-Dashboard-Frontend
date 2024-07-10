import { Action } from "../../enums/actionEnum";

export interface IValidationErrors {
    [key: string]: string | undefined;
}

export interface IBackEndError {
    statusCode: number;
    message: string;
    action: Action
}