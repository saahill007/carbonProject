import express from "express";
import mysql from "mysql2/promise";
import cors from "cors"; // Import the cors middleware

const app = express();
const port = 3001;

const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "Sahil@123456",
  database: "offsetCRBN",
  port: 3306,
};

const pool = mysql.createPool(dbConfig);

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// app.use(express.json());

// API endpoint to fetch initial variable values
app.get("/api/getvardata", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT name, value FROM conversion_table"
    );
    connection.release();
    const variableValues = {};
    rows.forEach((row) => {
      variableValues[row.name] = row.value;
    });
    res.json(variableValues);
  } catch (error) {
    console.error("Error fetching variable values:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/allformulas", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT formulaName FROM formulasTable"
    );
    connection.release();
    const formulaNames = rows.map((row) => row.formulaName);
    res.json(formulaNames);
  } catch (error) {
    console.error("Error fetching formula names:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to update a variable value
app.put("/api/updatevar/:name", async (req, res) => {
  const { name } = req.params;
  const { value } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "UPDATE conversion_table SET value = ? WHERE name = ?",
      [value, name]
    );
    connection.release();
    res.json({ value });
  } catch (error) {
    console.error("Error updating variable value:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/addConversion", async (req, res) => {
  const { name, value } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO conversion_table (name, value) VALUES (?, ?)",
      [name, value]
    );
    connection.release();
    res.status(201).json({ message: "Var added successfully" });
  } catch (error) {
    console.error("Error adding Var:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.post("/api/addConversion", (req, res) => {
//   const { variableName, variableValue } = req.body;

//   // Validate the incoming data (you may want to add more validation)
//   if (typeof variableName !== "string" || variableName.trim() === "") {
//     return res
//       .status(400)
//       .json({ error: "Variable name must be a non-empty string" });
//   }

//   // Convert variableValue to a number
//   const parsedValue = parseFloat(variableValue);

//   if (isNaN(parsedValue)) {
//     return res
//       .status(400)
//       .json({ error: "Variable value must be a valid number" });
//   }

//   // Use the connection pool to execute the MySQL query
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error("Error getting MySQL connection:", err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }

//     // Insert the new row into the new_conversion_table
//     const insertQuery =
//       "INSERT INTO new_conversion_table (name, value) VALUES (?, ?)";
//     connection.query(
//       insertQuery,
//       [variableName, parsedValue], // Use parsedValue instead of variableValue
//       (insertErr, results) => {
//         connection.release(); // Release the connection back to the pool

//         if (insertErr) {
//           console.error(
//             "Error inserting into new_conversion_table:",
//             insertErr
//           );
//           return res.status(500).json({ error: "Internal Server Error" });
//         }

//         return res
//           .status(200)
//           .json({ success: true, message: "Conversion added successfully" });
//       }
//     );
//   });
// });
app.post("/api/addQuestion", async (req, res) => {
  const {
    questionContent,
    household,
    zipcode,
    questionType,
    enabled,
    choiceAns,
    choices,
    refs,
    selectedUnits,
    selectedFormulas,
    label,
  } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO questionsTable (questionContent, household, zipcode, questionType, enabled, choiceAns, choices, refs, selectedUnits, selectedFormulas, label) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        questionContent,
        household,
        zipcode,
        questionType,
        enabled,
        choiceAns,
        JSON.stringify(choices),
        JSON.stringify(refs),
        JSON.stringify(selectedUnits),
        JSON.stringify(selectedFormulas),
        label,
      ]
    );
    connection.release();
    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/addFormula", async (req, res) => {
  const { formulaName, var1, var2, var3, var4 } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO formulasTable (formulaName, var1, var2, var3, var4) VALUES (?, ?, ?, ?, ?)",
      [formulaName, var1, var2, var3, var4]
    );
    connection.release();
    res.status(201).json({ message: "Formula added successfully" });
  } catch (error) {
    console.error("Error adding formula:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/questions", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM questionsTable");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// API endpoint to fetch formula names
