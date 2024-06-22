const express = require("express");
require("dotenv").config();

const app = express();

const Constant = require("./src/utils/constant");
const bodyParser = require("body-parser");
const UserDAO = require("./src/dao/user-dao");
var cors = require("cors");
const multer = require("multer");
const path = require("path");
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
// const dotenv = require("dotenv");
// console.log(process.env.MONGODB_URL);
require("./database");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadStorage = multer({ storage: storage });
// const upload = multer({ dest: '/' });
app.post("/upload", uploadStorage.single("file"), (req, res) => {
  res.send({ data: req.file });
});

app.use("/bill", (req, res) => {
  res.sendFile(__dirname + "/public/bill.html");
});
app.use("/client", (req, res) => {
  res.sendFile(__dirname + "/public/client.html");
});
app.use("/salary", (req, res) => {
  res.sendFile(__dirname + "/public/salary.html");
});
app.use("/expense", (req, res) => {
  res.sendFile(__dirname + "/public/expense.html");
});
app.use("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
});
app.use("/report", (req, res) => {
  res.sendFile(__dirname + "/public/report.html");
});
app.use("/employee", (req, res) => {
  res.sendFile(__dirname + "/public/employee.html");
});
app.use("/investment", (req, res) => {
  res.sendFile(__dirname + "/public/investment.html");
});
app.use("/cartDetail", (req, res) => {
  res.sendFile(__dirname + "/public/cart.html");
});
app.use("/srPics/:name", (req, res) => {
  let fileName = req.params.name;
  res.sendFile(__dirname + `/public/uploads/${fileName}`);
});
app.use("/users", require("./src/controller/user-controller"));
app.use("/clients", require("./src/controller/client-controller"));
app.use("/client-bills", require("./src/controller/client-bill-controller"));
app.use("/salaries", require("./src/controller/salaries-controller"));
app.use("/expenses", require("./src/controller/expenses-controller"));
app.use("/investments", require("./src/controller/investment-controller"));

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

UserDAO.isUserExist({
  userName: "sivareddy@avtsl",
  password: "siva@avtsl",
}).then((result) => {
  if (result) console.log("Admin already registered");
  else {
    UserDAO.register({
      firstName: "Siva",
      lastName: "Reddy",
      email: "sivareddyega@gmail.com",
      password: "siva@avtsl",
      role: "SUPER-ADMIN",
      userName: "sivareddy@avtsl",
      salary: 6000,
      address: "INDIA",
      phone: 7878767678,
      profilePic: "profile_icon.jpeg",
    }).then((response) => {
      console.log("Admin Registered successfully");
    });
  }
});

app.listen(Constant.PORT, () => {
  console.log(`Listening to port ${Constant.PORT}`);
});
