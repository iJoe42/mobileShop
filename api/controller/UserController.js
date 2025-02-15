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
        },

        info: async (req, res) => {
            try {
                const headers = req.headers.authorization;
                const token = headers.split(" ")[1];
                const decoded = jwt.verify(token, process.env.SECRET_KEY);

                const user = await prisma.user.findFirst({
                    where: {id: decoded.id},
                    select: {
                        username: true,
                        name: true,
                        level: true
                    }
                });

                res.json(user);
            } catch(err) {
                res.status(500).json({error: err.message});
            }
        },

        update: async (req, res) => {
            try {
                const headers = req.headers.authorization;
                const token = headers.split(" ")[1];
                const decoded = jwt.verify(token, process.env.SECRET_KEY);

                const oldUser = await prisma.user.findFirst({
                    where: {id: decoded.id}
                });
                const newPassword = req.body.password !== undefined ? req.body.password : oldUser.password; // if req.body.password is undefined, use old password

                await prisma.user.update({
                    where: {id: oldUser.id},
                    data: {
                        name: req.body.name,
                        username: req.body.username,
                        password: newPassword,
                    }
                });

                res.json({message: "User info updated!"});
                }
            catch(err) {
                res.status(500).json({error: err.message});
            }
        },

        list: async (req, res) => {
            try {
                const users = await prisma.user.findMany({
                    where: {
                        status: "active"
                    },
                    orderBy: {
                        id: "desc"
                    }
                });

                res.json(users);
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }
    }
}