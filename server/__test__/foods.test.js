const request = require('supertest')
const app = require('../app')
const { hashPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { sequelize } = require('../models')
const queryInterface = sequelize.getQueryInterface()

let access_token
beforeAll(async () => {

    const users = require('../data/user.json')
    users.forEach((el) => {
        delete el.id
        el.password = hashPassword(el.password)
        el.createdAt = el.updatedAt = new Date()
    })

    const foods = require('../data/food.json')
    foods.forEach((el) => {
        delete el.id
        el.createdAt = el.updatedAt = new Date()
    })

    const categories = require('../data/category.json')
    categories.forEach((el) => {
        delete el.id
        el.createdAt = el.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Users', users, {})
    await queryInterface.bulkInsert('Categories', categories, {})
    await queryInterface.bulkInsert('Food', foods, {})

    const payload = {
        id: 1,
        email: 'john.doe@mail.com',
    }
 
    access_token = signToken(payload)

})

afterAll(async () => {

    await queryInterface.bulkDelete('Food', null, { truncate: true, cascade: true, restartIdentity: true })
    await queryInterface.bulkDelete('Categories', null, { truncate: true, cascade: true, restartIdentity: true })
    await queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true })

})


//Add
describe('POST / foods', () => {
    describe('POST / foods - Success', () => {
        it('it should be return array of object instance of foods', async () => {
            const response = await request(app)
            .post('/foods')
            .set('Authorization', `Bearer ${access_token}`)
            .send({
                name: "Lemonade",
                description: "A tangy and sweet drink made with fresh lemons.",
                ingredients: "Lemons, sugar, water, ice cubes",
                imgUrl: "https://example.com/images/lemonade.jpg",
                categoryId: 4,
                userId: 3
            })
            expect(response.status).toBe(201)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('message', 'Succes create new food')
        })
    })
    describe('POST / foods - Fail', () => {
        it('it should be return an error', async () => {
            const response = await request(app)
            .post('/foods')
            .send({
                name: "Lemonade",
                description: "A tangy and sweet drink made with fresh lemons.",
                ingredients: "Lemons, sugar, water, ice cubes",
                imgUrl: "https://example.com/images/lemonade.jpg",
                categoryId: 4,
                userId: 3
            })
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message', 'Please login first')
        })
    })
    describe('POST / foods - Fail', () => {
        it('it should be return an error', async () => {
            const response = await request(app)
            .post('/foods')
            .set('Authorization', `Bearer access_token`)
            .send({
                name: "Lemonade",
                description: "A tangy and sweet drink made with fresh lemons.",
                ingredients: "Lemons, sugar, water, ice cubes",
                imgUrl: "https://example.com/images/lemonade.jpg",
                categoryId: 4,
                userId: 3
            })
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message', 'Please login first')
        })
    })
    describe('POST / foods - Fail', () => {
        it('it should be return an error', async () => {
            const response = await request(app)
            .post('/foods')
            .set('Authorization', `Bearer ${access_token}`)
            .send({
                name: "",
                description: "A tangy and sweet drink made with fresh lemons.",
                ingredients: "Lemons, sugar, water, ice cubes",
                imgUrl: "https://example.com/images/lemonade.jpg",
                categoryId: 0,
                userId: 3
            })
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty('message', expect.any(String))
        })
    })
})

//Update
describe('PUT / foods/:id', () => {
    describe('PUT / foods/:id - Success', () => {
        it('it should be return a message success add foods', async () => {
            const response = await request(app)
            .put('/foods/5')
            .set('Authorization', `Bearer ${access_token}`)
            .send({
                name: "Lemonade",
                description: "A tangy and sweet drink made with fresh lemons.",
                ingredients: "Lemons, sugar, water, ice cubes",
                imgUrl: "https://example.com/images/lemonade.jpg",
                categoryId: 4,
                userId: 3
            })
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('message', expect.any(String))
        })
    })
    describe('PUT / foods/:id - Fail', () => {
        it('it should be return an error message', async () => {
            const response = await request(app)
            .put('/foods/5')
            .send({
                name: "Lemonade",
                description: "A tangy and sweet drink made with fresh lemons.",
                ingredients: "Lemons, sugar, water, ice cubes",
                imgUrl: "https://example.com/images/lemonade.jpg",
                categoryId: 4,
                userId: 3
            })
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message', expect.any(String))
        })
    })
    describe('PUT / foods/:id - Fail', () => {
        it('it should be return an error message', async () => {
            const response = await request(app)
            .put('/foods/5')
            .set('Authorization', `Bearer`)
            .send({
                name: "Lemonade",
                description: "A tangy and sweet drink made with fresh lemons.",
                ingredients: "Lemons, sugar, water, ice cubes",
                imgUrl: "https://example.com/images/lemonade.jpg",
                categoryId: 4,
                userId: 3
            })
            expect(response.status).toBe(401)
            expect(response.body).toHaveProperty('message', expect.any(String))
        })
    })
    describe('PUT / foods/:id - Fail', () => {
        it('it should be return an error message', async () => {
            const response = await request(app)
            .put('/foods/100')
            .set('Authorization', `Bearer ${access_token}`)
            .send({
                name: "Lemonade",
                description: "A tangy and sweet drink made with fresh lemons.",
                ingredients: "Lemons, sugar, water, ice cubes",
                imgUrl: "https://example.com/images/lemonade.jpg",
                categoryId: 4,
                userId: 3
            })
            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('message', expect.any(String))
        })
    })
})