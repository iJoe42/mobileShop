const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
    ProductController: {
        create: async (req, res) => {
            try {
                await prisma.product.create({
                    data: {
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

                res.json({message: "success"});
            } catch(err) {
                res.status(500).json({error: err.message});
            }
        }
    }
}