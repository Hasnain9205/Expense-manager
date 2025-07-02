require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

//middleware to handle cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

ConnectDB();

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 50000;

app.get("/", (req, res) => {
  res.send("Api added successfully");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
