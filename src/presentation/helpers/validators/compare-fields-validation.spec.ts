import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('any_field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      any_field: 'any_value',
      fieldToCompare: 'wrong_value'
    })

    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      any_field: 'any_value',
      fieldToCompare: 'any_value'
    })

    expect(error).toBeUndefined()
  })
})
