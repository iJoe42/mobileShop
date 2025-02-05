const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const prisma = new PrismaClient();

module.exports = { 
    UserController : {
        signIn: async (req, res) => {
            try {
                const username = req.body.username;
                const password = req.body.password;

                const user = await prisma.user.findMany({
                    where: {
                        username: username,
                        password: password
                    }
                });

                if(!user) {
                    return res.status(401).json({ message: "User not found" });
                }

                const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: "1d"});

                res.status(200).json({ token: token});

            } catch(error) {
                res.status(500).json({message: error.message});
            }
        }
    }
}