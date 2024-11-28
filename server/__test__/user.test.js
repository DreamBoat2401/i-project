const request = require('supertest')
const app = require('../app')
const { hashPassword } =require('../helpers/bcrypt')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()

const users = require('../data/user.json')

beforeAll(async() => {
    users.forEach((el) => {
        delete el.id
        el.password = hashPassword(el.password)
        el.createdAt = el.updatedAt = new Date ()
    })
    await queryInterface.bulkInsert('Users', users, {})
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })
})

describe('POST / login', () => {
    describe('POST / login - Success', () => {
        it('it should be return access token', async () => {
            const response = await request(app)
            .post('/login')
            .send({
                email: "john.doe@mail.com",
                password: "12345"
            })
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('access_token', expect.any(String))
        })
    })
    describe('POST / login - Fail', () => {
        it('should be return error message not input email', async () => {
            const response = await request(app)
            .post('/login')
            .send({
                email: "",
                password: "hashed_password_456"
            })
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message', "Please input email")
        })
    })
    describe('POST / login - Fail', () => {
        it('should be return error message not input password', async () => {
            const response = await request(app)
            .post('/login')
            .send({
                email: "janedoe@example.com",
                password: ""
            })
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message', "Please input password")
        })
    })
    describe('POST / login - Fail', () => {
        it('should be return error message email not found', async () => {
            const response = await request(app)
            .post('/login')
            .send({
                email: "ewocxvnvjl@example.com",
                password: "hashed_password_456"
            })
            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('message', 'Data not found')
        })
    })
    describe('POST / login - Fail', () => {
        it('should be return error message invalid password', async () => {
            const response = await request(app)
            .post('/login')
            .send({
                email: "janedoe@example.com",
                password: "fufufafa"
            })
            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('message', 'Data not found')
        })
    })
})


