require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");
const fs = require("fs");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const app = express();
const PORT = process.env.PORT || 3001;

if (!process.env.CORS_ORIGIN) {
  console.error("Error: CORS_ORIGIN is not defined in environment variables.");
}

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173"],
  })
);
app.use(bodyParser.json());

app.post("/save-responses", async (req, res) => {
  const { responses, generalInfo } = req.body;
  const dataToSave = {
    generalInfo,
    responses,
  };

  try {
    await client.connect();
    const database = client.db("survey_db");
    const collection = database.collection("responses");
    await collection.insertOne(dataToSave);

    res.status(200).json({ message: "Responses saved successfully." });
  } catch (err) {
    console.error("Error during data insertion:", err);
    res.status(500).json({ message: "Error during data insertion." });
  } finally {
    await client.close();
  }
});

app.get("/responses-count", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("survey_db");
    const collection = database.collection("responses");
    const count = await collection.countDocuments();

    res.status(200).json({ count });
  } catch (err) {
    console.error("Error retrieving response count:", err);
    res.status(500).json({ message: "Error retrieving response count." });
  } finally {
    await client.close();
  }
});

// Remove or comment out this line in production
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// Export the app for Vercel
module.exports = app;
