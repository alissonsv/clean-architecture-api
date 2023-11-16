import type { Validation } from '../../protocols/validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error | undefined {
    for (const validations of this.validations) {
      const error = validations.validate(input)
      if (error) {
        return error
      }
    }
  }
}
