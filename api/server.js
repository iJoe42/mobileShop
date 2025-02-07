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
app.post("/api/user/signin", UserController.signIn);

//
// company API
//
app.get("/api/company/list", CompanyController.list);

app.post("/api/company/create", CompanyController.create);

//
// product API
//
app.post("/api/buy/create", ProductController.create);

//
// port listen
//
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});