const { Food } = require('../models')
const { GoogleGenerativeAI } = require('@google/generative-ai')

class FoodController {

    static async read(req, res, next) {
        try {
            console.log("berhasil masuk ke read foods");
            
            const foods = await Food.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
            // console.log(foods);

            res.status(200).json({
                status: 200,
                message: "Success read foods",
                foods
            })
            
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async readDetail(req, res, next) {
        try {
            const { id } = req.params

            const foods = await Food.findByPk(id)

            if (!foods) throw { name: "NotFound", id}

            res.status(200).json({
                status: 200,
                message: `Success read foods with id ${foods.id}`,
                foods
            })
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const { name, description, ingredients, imgUrl, categoryId, userId } = req.body
            // console.log(req.body);
            const foods = await Food.create({ name, description, ingredients, imgUrl, categoryId, userId })
            // console.log(foods);

            res.status(201).json({
                status: 201,
                message: "Succes create new food",
                foods
            })
            
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params

        const foods = await Food.findByPk(id)

        if(!foods) throw { name: "NotFound" }

        const { name, description, ingredients, imgUrl, categoryId, userId } = req.body

        await foods.update({ name, description, ingredients, imgUrl, categoryId, userId })

        res.status(200).json({
            status: 200,
            message: `Success update foods with id ${foods.id}`,
            foods
        })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params
            const foods = await Food.findByPk(id)

            if(!foods) throw { name: "NotFound", id }

            await foods.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                status: 200,
                message: `Success delete foods with id ${foods.id}`
            })
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async recommendation(req, res, next) {
        try {
            const genAi = new GoogleGenerativeAI('AIzaSyAXxkylolfZa-n1YkDyutVrlXQbCdElxzg')
            const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' })

            const prompt = 'Kasih saya 10 rekomendasi makanan apa yang paling ngehits ini di kategori Appetizers, Main Course, Desserts, Beverages, Snacks, setiap kali anda mengirim, jangan kirimkan yang sama dan tolong kelompokan berdasarkan kategori di atas dan berikan dalam bentuk json tanpa tag json dan tanpa enter'
            const result = await model.generateContent(prompt)
            const response = await result.response
            const text = JSON.parse(response.text())
            console.log(text);
               

            res.status(200).json({
                message: 'Success generate content',
                text
            })
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = FoodController