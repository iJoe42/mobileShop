const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

// controllers
const { UserController } = require("./controller/UserController");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.post("/api/user/signin", UserController.signIn);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});