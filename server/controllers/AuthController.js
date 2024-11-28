
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models')
const {OAuth2Client} = require('google-auth-library');

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

    static async googleLogin(req, res, next) {
        // console.log("headers", req.headers);
        // console.log("body", req.body);
        
        try {
            const { token } = req.headers
            const client = new OAuth2Client();
            
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "543833896847-4dmk1nsda2sr35pk6qa95hn947a62pcv.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
                
            });
            const payload = ticket.getPayload();
            // console.log(payload, "<<< ini payload");

            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    email: payload.email,
                    password: "password_google"
                },
                hooks: false
            })

            const access_token = signToken({
                id: user.id,
                email: user.email,
            })

            // console.log(access_token);
            
            res.status(200).json({ access_token })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

}

module.exports = AuthController