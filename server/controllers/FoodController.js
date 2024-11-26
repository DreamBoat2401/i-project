const { Food } = require('../models')

class FoodController {

    static async read(req, res, next) {
        try {
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

}

module.exports = FoodController