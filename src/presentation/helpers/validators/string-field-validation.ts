import { InvalidParamError } from '../../errors'
import type { Validation } from './validation'

export class StringFieldValidation implements Validation {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error | undefined {
    if (typeof input[this.fieldName] !== 'string') {
      return new InvalidParamError(this.fieldName)
    }
  }
}
