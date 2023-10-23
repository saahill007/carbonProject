// server.js

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createConnection } from "mysql2/promise";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "Sahil@123456",
  database: "offsetCRBN",
  port: 3306,
};

app.get("/api/data", async (req, res) => {
  try {
    const connection = await createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM conversion_table");
    connection.end();

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// New endpoint to add data
app.post("/api/addData", async (req, res) => {
  const {
    questionContent,
    household,
    zipcode,
    questionType,
    enabled,
    choiceAns,
    choice1,
    choice2,
    choice3,
    choice4,
    ref1,
    ref2,
    ref3,
    ref4,
    selectedUnits,
    selectedUnitRefs,
  } = req.body;

  try {
    const connection = await createConnection(dbConfig);

    // Adjust this query based on your table structure
    await connection.execute(
      `
      INSERT INTO admin_questions (
        questionContent,
        household,
        zipcode,
        questionType,
        enabled,
        choiceAns,
        choice1,
        choice2,
        choice3,
        choice4,
        ref1,
        ref2,
        ref3,
        ref4,
        selectedUnits,
        selectedUnitRefs
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        questionContent,
        household,
        zipcode,
        questionType,
        enabled,
        choiceAns,
        choice1,
        choice2,
        choice3,
        choice4,
        ref1,
        ref2,
        ref3,
        ref4,
        selectedUnits,
        selectedUnitRefs,
      ]
    );

    connection.end();

    res.status(201).json({ message: "Data added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
