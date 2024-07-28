import { urlRegex } from "../../constants/regexPatterns";
import errorMessages from "../../constants/validationErrorMessages.json";
import { IValidationErrors } from "../types/error";


export const validateLectureQuestionAssignmentLink = (link: string): IValidationErrors => {
  const tempErrors: IValidationErrors = {};

  if (!urlRegex.test(link)) {
    tempErrors.validateAssignmentLink = errorMessages.invalidLink;
  }

    if (link.length > 500) {
      tempErrors.validateAssignmentLink = errorMessages.largeLink;
    }
  return tempErrors;
}
