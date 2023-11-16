import { InvalidParamError } from '../../errors'
import { StringFieldValidation } from './string-field-validation'

const makeSut = (): StringFieldValidation => {
  return new StringFieldValidation('any_field')
}

describe('StringField Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 123 })

    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_value' })

    expect(error).toBeUndefined()
  })
})
