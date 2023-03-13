import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    const credentials = process.env.MONGO_URL ?? ''
    await MongoHelper.connect(credentials)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Alisson',
        email: 'contato@alissonsv.com',
        password: '1234',
        passwordConfirmation: '1234'
      })
      .expect(200)
  })
})
