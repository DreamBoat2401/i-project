
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models')

class AuthController {

    static async register(req, res, next){
        try {
            const { username, email, password } = req.body
            const newUser = await User.create({ username, email, password })

            res.status(201).json({
                status: 201,
                message: "Success create new User",
                newUser
            })
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if(!email) throw { name: "BadRequestEmail"}
            if(!password) throw { name: "BadRequestPassword" }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if(!user) throw { name: "NotFound" }
            if(!comparePassword(password, user.password)) throw { name: "LoginError" }
            
            const payload = {
                userId: user.id,
                email: user.email
            }
            // console.log(payload);

            const access_token = signToken(payload)
            // console.log(access_token);

            res.status(200).json({
                status: 200,
                message: "Success Login",
                access_token
            })

        } catch (error) {
            // console.log(error);
            next(error)
            
        }
    }

}

module.exports = AuthController