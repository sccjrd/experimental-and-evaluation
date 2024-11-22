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

app.use(cors());
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

    const data = await collection.find({}).toArray();
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Nessun dato trovato per l'esportazione." });
    }

    const keys = Object.keys(data[0]);
    const csvFilePath = path.join(__dirname, "responses.csv");
    const fileStream = fs.createWriteStream(csvFilePath);

    // Scrivi l'intestazione del CSV
    fileStream.write(keys.join(",") + "\n");

    // Scrivi i dati del CSV
    data.forEach((doc) => {
      const row = keys.map((key) => JSON.stringify(doc[key] || "")).join(",");
      fileStream.write(row + "\n");
    });

    fileStream.end();
    fileStream.on("finish", () => {
      res.download(csvFilePath, "responses.csv", (err) => {
        if (err) {
          console.error("Errore durante il download:", err);
          return res.status(500).send("Errore durante il download del file.");
        }
      });
    });
  } catch (err) {
    console.error("Errore durante l'inserimento dei dati:", err);
    res.status(500).json({ message: "Errore durante l'inserimento dei dati." });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
