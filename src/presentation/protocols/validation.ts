export interface Validation {
  validate: (input: any) => undefined | Error
}
