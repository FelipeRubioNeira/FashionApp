/**
 * FormValidation type that is returned by the form validation on viewModels then the validation its not related to bussines 
 */
type FormValidation = {
    isValid: boolean,
    message: string,
}

export type {
    FormValidation
}