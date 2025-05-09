const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.pluralize(null);
const cors = require("cors");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const machineId = require("node-machine-id");

const configPath = path.resolve(__dirname, "helpers", "config.json");
const license = "u3Y65£,;7Y#I";

// Middleware setup and route handlers
const feedbackRoutes = require("./routes/feedback");
const requestRoutes = require("./routes/request");
const cropRoutes = require("./routes/crop");
const usersRoutes = require("./routes/users");
const harvestRoutes = require("./routes/harvest");
const rateRoutes = require("./routes/rate");
const serviceRoutes = require("./routes/service");
const croprequestRoutes = require("./routes/croprequest");

const api = process.env.API_URL || '/api/v1'; // Fallback to '/api/v1' if not set

// Get machine ID and start the app after license check
machineId.machineId().then(async (machineID) => {
  try {
    const configData = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configData);
    const storedLicense = config.license;

    if (
      storedLicense.licenseCode !== license ||
      storedLicense.deviceId !== machineID
    ) {
     console.error("Invalid license.");
     console.error("Actual Machine ID:", machineID);
     console.error("Expected Device ID:", storedLicense.deviceId);

      process.exit(1);
    }

    // Middleware
const allowedOrigins = ['https://astonishing-semifreddo-68fa5b.netlify.app'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl requests
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // if you're sending cookies or auth headers
}));

app.options('*', cors());

    app.use(express.json());
    app.use(morgan("tiny"));

    app.use("/public", express.static("public"));
    app.use(`${api}/crop`, cropRoutes);
    app.use(`${api}/request`, requestRoutes);
    app.use(`${api}/feedback`, feedbackRoutes);
    app.use(`${api}/users`, usersRoutes);
    app.use(`${api}/harvest`, harvestRoutes);
    app.use(`${api}/rate`, rateRoutes);
    app.use(`${api}/service`, serviceRoutes);
    app.use(`${api}/croprequest`, croprequestRoutes);

    // Connect to MongoDB
    mongoose
      .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        dbName: "farmer_harvest",
      })
      .then(() => console.log("Database Connection is ready..."))
      .catch((err) => console.log(err));

    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on http://0.0.0.0:${PORT}`);
    });

  } catch (err) {
    console.error("License check failed:", err);
    process.exit(1);
  }
}).catch((error) => {
  console.error("Error getting machine ID:", error);
  process.exit(1);
});
