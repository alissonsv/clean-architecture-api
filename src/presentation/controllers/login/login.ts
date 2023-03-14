import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helper'
import type { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await Promise.resolve(badRequest(new MissingParamError('email')))
    }
    if (!httpRequest.body.password) {
      return await Promise.resolve(badRequest(new MissingParamError('password')))
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return await Promise.resolve(badRequest(new InvalidParamError('email')))
    }

    return await Promise.resolve(ok(''))
  }
}
