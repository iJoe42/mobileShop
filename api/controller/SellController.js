const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    SellController: {
        create: async (req, res) => {
            try {
                const serial = req.body.serial;
                const product = await prisma.product.findFirst({
                    where: {
                        serial: serial,
                        status: "instock"
                    }
                });

                // product not found
                if(!product) {
                    res.status(400).json({message: "Product not found!"});
                    return;
                } else {
                    await prisma.sell.create({
                        data: {
                            productId: product.id,
                            price: req.body.price,
                            payDate: new Date()
                        }
                    });
                    
                    res.json({message: "CREATE SELL Success!"})
                }
            } catch(error) {
                res.status(500).json({error: error.message});
            }
        },

        list: async (req, res) => {
            try {
                const sells = await prisma.sell.findMany({
                    where: {
                        status: "pending"
                    },
                    orderBy: {
                        id: "desc"
                    },
                    select: {
                        id: true,
                        price: true,
                        product: {
                            select: {
                                serial: true,
                                name: true
                            }
                        }
                    }
                });

                res.json(sells);
            } catch (error) {
                res.status(500).json({error: error.message})
            }
        },

        remove: async (req, res) => {
            try {
                await prisma.sell.delete({
                    where: {
                        id: req.params.id
                    }
                });

                res.json({message: "DELETE Success!"});
            } catch (error) {
                res.status(500).json({error: error.message});
            }
        },

        confirm: async (req, res) => {
            try {
                const sells = await prisma.sell.findMany({
                    where: {
                        status: "pending"
                    }
                });

                // update product
                for(const sell of sells) {
                    await prisma.product.update({
                        where: {
                            id: sell.productId
                        },
                        data: {
                            status: "sold"
                        }
                    });
                }

                await prisma.sell.updateMany({
                    where: {
                        status: "pending"
                    },
                    data: {
                        status: "paid",
                        payDate: new Date()
                    }
                });
                res.json({message: "CONFIRM Success!"});
            } catch (error) {
                res.status(500).json({error: error.message});
            }
        }
    }
}