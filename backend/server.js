const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const ideaRoutes = require("./routes/ideaRoutes");
const { initializeDB } = require("./models/ideaModel");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

// Security
app.use(helmet());
app.use(express.json());
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: "Too many requests, try again later.",
//   })
// );

// Routes
app.use("/api/ideas", ideaRoutes);

// Health check
app.get("/", (req, res) => res.send({ status: "ok" }));

// Error handler middleware
app.use(errorHandler);

initializeDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
});
