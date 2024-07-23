import QuestionType from "../enums/QuestionType";

export interface IQuestion {
    _id: string;
    title: string;
    url: string;
    number: number;
    type: QuestionType; // Using the enum here
}

export interface ITopic {
    _id: string;
    title: string;
    url: string;
    questions: IQuestion[];
}

export interface IModule {
    _id: string;
    number: number;
    title: string;
    topics: ITopic[];
}

export interface ISection {
    _id: string;
    title: string;
    number: number;
    modules: IModule[];
}

export interface ICourseDetails {
    _id: string;
    title: string;
    sections: ISection[];
    
}
