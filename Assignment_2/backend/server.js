const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

// Stringa di connessione a MongoDB in locale
const uri = "mongodb://localhost:27017";  // Cambia questa riga per usare localhost
const client = new MongoClient(uri);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/save-responses", async (req, res) => {
    const { responses, generalInfo } = req.body; 
    const dataToSave = {
      generalInfo,
      responses,
    };

    try {
        // Connetti a MongoDB
        await client.connect();

        // Seleziona il database e la collezione
        const database = client.db("survey_db"); // Nome del database
        const collection = database.collection("responses"); // Nome della collezione

        // Inserisci i dati
        await collection.insertOne(dataToSave);

        res.status(200).json({ message: "Responses salvati con successo!" });
    } catch (err) {
        console.error("Errore durante l'inserimento dei dati:", err);
        res.status(500).json({ message: "Errore durante l'inserimento dei dati." });
    } finally {
        // Chiudi la connessione
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
