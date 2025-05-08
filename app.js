const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.pluralize(null);
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const configPath = path.resolve(__dirname, "helpers", "config.json");
const machineId = require("node-machine-id");
let machineID;
let license = "u3Y65£,;7Y#I";

// Get the machine ID
machineId
  .machineId()
  .then((id) => {
    machineID = id;
  })
  .catch((error) => {
    console.error("Error getting machine ID:", error);
  });

// License Middleware
app.use(async (req, res, next) => {
  try {
    const configData = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configData);
    const storedLicense = config.license;

    if (
      storedLicense.licenseCode === license &&
      storedLicense.deviceId === machineID
    ) {
      next(); // Valid license
    } else {
      console.error("Invalid license.");
      res.status(403).json({ message: "Invalid license." });
    }
  } catch (error) {
    console.error("License check failed:", error);
    res.status(500).json({ message: "License check failed." });
  }
});

require("dotenv").config();

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("tiny"));

// Routes
const feedbackRoutes = require("./routes/feedback");
const requestRoutes = require("./routes/request");
const cropRoutes = require("./routes/crop");
const usersRoutes = require("./routes/users");
const harvestRoutes = require("./routes/harvest");
const rateRoutes = require("./routes/rate");
const serviceRoutes = require("./routes/service");
const croprequestRoutes = require("./routes/croprequest");

const api = process.env.API_URL;

app.use("/public", express.static("public"));
app.use(`${api}/crop`, cropRoutes);
app.use(`${api}/request`, requestRoutes);
app.use(`${api}/feedback`, feedbackRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/harvest`, harvestRoutes);
app.use(`${api}/rate`, rateRoutes);
app.use(`${api}/service`, serviceRoutes);
app.use(`${api}/croprequest`, croprequestRoutes);

// Add a default route for Render health check
app.get("/", (req, res) => {
  res.send("Backend is live.");
});

// Database connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "farmer_harvest",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
