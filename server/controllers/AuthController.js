
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models')
const {OAuth2Client} = require('google-auth-library');
const cloudinary = require('../utils/cloudinary')

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
      static async upload(req, res, next) {
        try {
          const { userId } = req.loginInfo;
    
          let user = await User.findByPk(userId);
    
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
    
          if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
          }
    
          const imageInBase64 = req.file.buffer.toString("base64");
          const data64 = `data:${req.file.mimetype};base64,${imageInBase64}`;
    
          const upload = await cloudinary.uploader.upload(data64, {
            public_id: `user_${userId}__profile`,
            tags: ["profile"],
          });
    
          await user.update({ profileImage: upload.secure_url });
    
          res.status(201).json({
            message: "Success updating profile picture",
            profileImage: upload.secure_url,
          });
        } catch (error) {
          console.error("Error updating profile picture:", error);
          next(error);
        }
      }

      static async getUserProfile(req, res, next) {
        try {
          const { userId } = req.loginInfo; // Retrieve userId from login info
    
          // Find user in the database by their ID
          const user = await User.findByPk(userId, {
            attributes: ["email", "profileImage"], // Select only email and profileImage
          });
    
          // Check if the user exists
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
    
          // Send user profile data as response
          res.status(200).json({
            message: "User profile retrieved successfully",
            email: user.email,
            profileImage: user.profileImage,
          });
        } catch (error) {
          console.error("Error retrieving user profile:", error);
          next(error);
        }
      }

        
    
}

module.exports = AuthController