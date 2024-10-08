require('dotenv').config();
const express = require("express");
const router = require("./routes/userRouter");
const dbConfig = require('./dbConfig')
const app = express();

app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Route to render the dashboard
app.get("/", (req, res) => {
  res.render("dashboard");
});

app.use("/", router);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port: http://localhost:${PORT}`);
});
