import { MissingParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'
import type { Validation } from '../../protocols/validation'

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return undefined
    }
  }

  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValue(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value ' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValue(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValue(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value ' })

    expect(error).toEqual(new Error())
  })

  test('Should not return if validation succeeds', async () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value ' })

    expect(error).toBeUndefined()
  })
})
