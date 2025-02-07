const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    CompanyController: {
        create: async (req, res) => {
            try {
                const payload = {
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    email: req.body.email ?? "",
                    taxCode: req.body.taxCode                        
                }
                
                const isDupedCompany = await prisma.company.findFirst();

                if(isDupedCompany) {
                    await prisma.company.update({
                        where: {id: isDupedCompany.id},
                        data: payload
                    });
                } else {
                    await prisma.company.create({
                        data: payload
                    });
                }

                res.json({message: "success!"});
            } catch(err) {
                res.status(500).json({error: err.message});
            }
        },

        list: async (req, res) => {
            try {
                const company = await prisma.company.findFirst();
                res.json(company);
            } catch(err) {
                res.status(500).json({error: err.message});
            }
        }
    }
}