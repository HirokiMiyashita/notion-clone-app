import Validator from "../validator/validate.js";

class ValidateRule {
  static getRegisterValidationRules() {
    const validationChain = [
      Validator.validator("username", 8, "名前は8文字以上です"),
      Validator.validator("password", 8, "パスワードは8文字以上です"),
      Validator.isDuplicateUsers("username"),
    ];

    return validationChain;
  }

  static getLoginValidationRules() {
    const validationChain = [
      Validator.validator("username", 8, "名前又はパスワードが間違っています"),
      Validator.validator("password", 8, "名前又はパスワードが間違っています"),
      Validator.userAlreadyExists("username"),
    ];

    return validationChain;
  }
}
export default ValidateRule;
