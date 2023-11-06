import express from "express";
import mysql from "mysql2/promise";
import cors from "cors"; // Import the cors middleware

const app = express();
const port = 3001;

const dbConfig = {
  host: "18.217.86.185",
  user: "carbonuser",
  password: "Carbon@123",
  database: "CRBN",
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

app.get("/api/getUniqueUtilities", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT DISTINCT Utility FROM utilities"
    );
    connection.release();

    const uniqueUtilities = rows.map((row) => row.Utility);
    res.json(uniqueUtilities);
  } catch (error) {
    console.error("Error fetching unique utilities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ... (previous code)

app.get("/api/getUnits", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT name FROM units_table");
    connection.release();
    const unitNames = rows.map((row) => row.name);
    res.json(unitNames);
  } catch (error) {
    console.error("Error fetching unit names:", error);
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

// API endpoint to fetch formula names

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

app.post("/api/addUnit", async (req, res) => {
  const { name, value } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.query("INSERT INTO units_table (name) VALUES (?)", [name]);
    connection.release();
    res.status(201).json({ message: "Var added successfully" });
  } catch (error) {
    console.error("Error adding Var:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

app.get("/api/question/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM questionsTable WHERE id = ?",
      [id]
    );
    connection.release();

    if (rows.length === 0) {
      res.status(404).json({ error: "Question not found" });
    } else {
      res.json(rows[0]); // Assuming that ID is unique, so there should be only one result
    }
  } catch (error) {
    console.error("Error fetching a specific question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
let connection;

app.get("/formulas", async (req, res) => {
  try {
    // Use the global connection variable
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT formulaName, var1, var2, var3, var4 FROM formulasTable"
    );
    connection.release();
    const formulaNames = rows.map((row) => ({
      formulaName: row.formulaName,
      var1: row.var1,
      var2: row.var2,
      var3: row.var3,
      var4: row.var4,
    }));
    res.json(formulaNames);
  } catch (error) {
    console.error("Error fetching formula names:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.patch("/api/updateQuestion/:id", async (req, res) => {
  const { id } = req.params;

  // Destructure the properties you want to update from the request body
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

    // Update the corresponding row in the questionsTable
    await connection.query(
      `
      UPDATE questionsTable 
      SET 
        questionContent = ?, 
        household = ?, 
        zipcode = ?, 
        questionType = ?, 
        enabled = ?, 
        choiceAns = ?, 
        choices = ?, 
        refs = ?, 
        selectedUnits = ?, 
        selectedFormulas = ?, 
        label = ?
      WHERE id = ?
      `,
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
        id,
      ]
    );

    connection.release();
    res.status(200).json({ message: "Question updated successfully" });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/utilities", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM utilities");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching utilities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/getCategories", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM Category");
    connection.release();

    const categories = rows.map((row) => ({
      categoryId: row.category_id,
      categoryName: row.category_name,
    }));

    res.json(categories);
  } catch (error) {
    console.error("Error fetching Category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/savevariables", async (req, res) => {
  const { variables } = req.body;

  try {
    const connection = await pool.getConnection();

    // Loop through the variables and update the database
    for (const { name, value } of variables) {
      await connection.query(
        "UPDATE conversion_table SET value = ? WHERE name = ?",
        [value, name]
      );
    }

    connection.release();
    res.status(200).json({ message: "Variables saved successfully" });
  } catch (error) {
    console.error("Error saving variables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update the /api/calculateFormula route in your server file

app.post("/api/calculateFormula", async (req, res) => {
  try {
    const { formulaName, zipcode, utility } = req.body;

    // Fetch the formula from the database based on the formulaName
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT var1, var2, var3, var4 FROM formulasTable WHERE formulaName = ?",
      [formulaName]
    );
    connection.release();

    if (rows.length === 0) {
      // Formula not found
      res.status(404).json({ error: "Formula not found" });
      return;
    }

    // Extract variables from the database response
    const { var1, var2, var3, var4 } = rows[0];

    // Check if var1 is present in the conversion_table, if not, parse as float
    const parsedVar1 = await getVariableValue(var1);
    // Repeat for var2, var3, and var4
    const parsedVar2 = await getVariableValue(var2);
    const parsedVar3 = await getVariableValue(var3);
    const parsedVar4 = await getVariableValue(var4);

    // Perform the calculation based on the parsed variables
    const result = (parsedVar1 * parsedVar2) / (parsedVar3 * parsedVar4);

    res.json({ result });
  } catch (error) {
    console.error("Error calculating formula:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Helper function to get the variable value from the conversion_table
const getVariableValue = async (variableName) => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query(
    "SELECT value FROM conversion_table WHERE name = ?",
    [variableName]
  );
  connection.release();

  // If the variable is present in the conversion_table, return its value, otherwise parse as float
  return rows.length > 0 ? rows[0].value : parseFloat(variableName);
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// API endpoint to fetch formula names
