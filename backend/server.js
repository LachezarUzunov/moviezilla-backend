const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;
const app = express();

// Allows to send raw json, body parser
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello");
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
