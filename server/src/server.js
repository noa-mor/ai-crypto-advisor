const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const preferenceRoutes = require("./routes/preferenceRoutes");
const voteRoutes = require("./routes/voteRoutes");
const dataRoutes = require("./routes/dataRoutes");
const healthRoute = require("./routes/healthRoute");

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", healthRoute);
app.use("/users", userRoutes);
app.use("/preferences", preferenceRoutes);
app.use("/votes", voteRoutes);
app.use("/data", dataRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
