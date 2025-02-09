const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
    ProductController: {
        create: async (req, res) => {
            try {
                const qty = req.body.qty;

                if(qty > 1000) {
                    res.status(400).json({error: "qty must be less than 1000"});
                    return;
                } else {
                    for(let i = 0; i < qty; i++) {
                        await prisma.product.create({
                            data: {
                                serial: req.body.serial ?? "",
                                name: req.body.name,
                                release: req.body.release,
                                color: req.body.color,
                                price: req.body.price,
                                customerName: req.body.customerName,
                                customerPhone: req.body.customerPhone,
                                customerAddress: req.body.customerAddress,
                                remark: req.body.remark ?? ""
                            }
                        });
                    }
                }

                res.json({message: "SAVE Success"});
            } catch(err) {
                res.status(500).json({error: err.message});
            }
        },

        list: async (req, res) => {
            try {
                const products = await prisma.product.findMany({
                    orderBy: {
                        id: "desc"
                    },
                    where: {
                        status: {
                            not: "deleted"
                        }
                    }
                });

                res.json(products);
            } catch(err) {
                res.status(500).json({error: err.message});
            }
        },

        update: async (req, res) => {
            try {
                await prisma.product.update({
                    where: {id: req.params.id},
                    data: {
                        serial: req.body.serial ?? "",
                        name: req.body.name,
                        release: req.body.release,
                        color: req.body.color,
                        price: req.body.price,
                        customerName: req.body.customerName,
                        customerPhone: req.body.customerPhone,
                        customerAddress: req.body.customerAddress,
                        remark: req.body.remark ?? "",
                    }
                });

                res.json({message: "EDIT Success"});
            } catch(err) {
                res.status(500).json({error: err.message});
            }
        },

        remove: async (req, res) => {
            try {
                await prisma.product.update({
                    where: { id: req.params.id },
                    data : { status: "deleted" }
                });

                res.json({message: "DELETE Success!"});
            } catch(err) {
                res.status(500).json({error: err.message});
            }
        }
    }
}