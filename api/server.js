const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

//
// controllers
//
const { UserController } = require("./controller/UserController");
const { CompanyController } = require("./controller/CompanyController");
const { ProductController } = require("./controller/ProductController");
const { SellController } = require("./controller/SellController");
const { ServiceController } = require("./controller/ServiceController");

//
// middleware
//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//
// routes
//
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

//
// user API
//
app.get("/api/user/info", UserController.info);
app.post("/api/user/signin", UserController.signIn);
app.put("/api/user/update", UserController.update);
app.get("/api/user/list", UserController.list);

//
// company API
//
app.get("/api/company/list", CompanyController.list);
app.post("/api/company/create", CompanyController.create);

//
// product API
//
app.get("/api/buy/list", ProductController.list);
app.post("/api/buy/create", ProductController.create);
app.put("/api/buy/update/:id", ProductController.update);
app.delete("/api/buy/remove/:id", ProductController.remove); // "soft delete", change status to "deleted"

//
// sell API
//
app.post("/api/sell/create", SellController.create);
app.get("/api/sell/list", SellController.list);
app.delete("/api/sell/remove/:id", SellController.remove);
app.get("/api/sell/confirm", SellController.confirm);

//
// service API
//
app.post("/api/service/create", ServiceController.create);
app.get("/api/service/list", ServiceController.list);
app.put("/api/service/update/:id", ServiceController.update);
app.delete("/api/service/remove/:id", ServiceController.remove);

//
// port listen
//
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});