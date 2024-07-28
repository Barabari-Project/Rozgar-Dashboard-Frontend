import { Gender } from "../enums/Gender";

export interface UserSubmission {
  question: string;
  link: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: Gender;
  region?: string;
  university?: string;
  degree?: string;
  organization?: string;
  topics: string[];
  submissions: UserSubmission[];
  createdAtIST: string;
  updatedAtIST: string;
}