import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';


const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;
const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: "",
    database: "CRBN"
};

// Create a MySQL connection
const mysqlConnection = mysql.createConnection(dbConfig);

const pool = mysql.createPool(dbConfig);



mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connected to MySQL');
    } else {
        console.error('Connection to MySQL failed:', err);
    }
});

// Define a route to handle updating the question
app.post('/api/slider', cors(), (req, res) => {
    const { question, options } = req.body;

    // Replace this with your actual query to update the question in the database
    const sql = 'INSERT INTO CRBN.questions (questions, question_flag, type_of_question) VALUES (?, 1, "Slider")';
    mysqlConnection.query(sql, [question], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.affectedRows === 1) {
            const queId = results.insertId;

            // Insert options into the "Options" table with queId as a foreign key
            const insertOptionsSql = 'INSERT INTO CRBN.Options (ques_id, given_option, option_type, equivalent_carbon) VALUES ?';
            const optionsData = options.map(option => [queId, option.baseline, option.optiontype, option.carbonOffset]);

            mysqlConnection.query(insertOptionsSql, [optionsData], (err, optionsResults) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({ error: 'Error saving options' });
                }

                res.status(201).json({ message: 'Question and options saved successfully', queId });
            });
        } else {
            res.status(500).send('Error saving the question.');
        }
    });
});

app.post('/api/dropdown', cors(), (req, res) => {
    const { question, options } = req.body;

    // Insert the question into the "questions" table
    const insertQuestionSql = 'INSERT INTO CRBN.questions (questions, question_flag, type_of_question) VALUES (?, 1, "Dropdown")';
    mysqlConnection.query(insertQuestionSql, [question], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.affectedRows === 1) {
            const queId = results.insertId;

            // Insert options into the "Options" table with queId as a foreign key
            const insertOptionsSql = 'INSERT INTO CRBN.Options (ques_id, given_option, option_type, equivalent_carbon) VALUES ?';
            const optionsData = options.map(option => [queId, option.dropdown, option.optiontype, option.carbonOffset]);

            mysqlConnection.query(insertOptionsSql, [optionsData], (err, optionsResults) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({ error: 'Error saving options' });
                }

                res.status(201).json({ message: 'Question and options saved successfully', queId });
            });
        } else {
            res.status(500).send('Error saving the question.');
        }
    });
});

// Define a route to handle admin login
app.post('/api/admin/login', cors(), (req, res) => {
    const { email, password } = req.body;

    // Replace this with your actual query to check the credentials
    const sql = `SELECT * FROM CRBN.admin WHERE email = ? AND password = ?`;
    mysqlConnection.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            // Authentication successful
            return res.status(200).json({ message: 'Login successful' });
        } else {
            // Authentication failed
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Define a route to retrieve questions from the database
app.get('/api/questionsadmin', cors(), (req, res) => {
    const sql = 'SELECT * FROM CRBN.questions';

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error retrieving questions from the database' });
            return;
        }

        // Send the retrieved questions as a JSON response
        res.json(results);
    });
});

// Middleware for parsing JSON request body
app.use(express.json());

// Define a route to handle the toggle state update
app.post('/api/updateToggleState', (req, res) => {
    const { questionId, newState } = req.body;
    const sql = "UPDATE CRBN.questions SET question_flag = ? WHERE ques_id = ?;";

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, [newState, questionId], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error updating toggle state in the database' });
            return;
        }
        res.json({ message: 'Toggle state updated successfully' });
    });
});

// Define a route to retrieve Utility table from the database
app.get('/api/Utility', cors(), (req, res) => {
    const sql = 'SELECT * FROM CRBN.Utility';

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error retrieving questions from the database' });
            return;
        }

        // Send the retrieved questions as a JSON response
        res.json(results);
    });
});

// Define a route to retrieve Category table from the database
app.get('/api/Category', cors(), (req, res) => {
    const sql = 'SELECT * FROM CRBN.Category';

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error retrieving questions from the database' });
            return;
        }

        // Send the retrieved questions as a JSON response
        res.json(results);
    });
});

app.get('/api/category_name', cors(), (req, res) => {
    const sql = 'SELECT category_name FROM CRBN.Category';

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error retrieving questions from the database' });
            return;
        }

        // Send the retrieved questions as a JSON response
        res.json(results);
    });
});

// Define a route to add a question to question table
app.post('/api/newquestion', (req, res) => {
    const { question, question_flag, type_of_question } = req.body;
    const sql = "INSERT INTO CRBN.questions (questions, question_flag, type_of_question) VALUES (?, ?, ?);";

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, [question, question_flag, type_of_question], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error updating toggle state in the database' });
            return;
        }
        res.json({ message: 'New Question added successfully' });
    });
});

// Define a route to get a question by its content
app.post('/api/questionsfind', (req, res) => {
    const { questions } = req.body;
    const sql = "SELECT * FROM CRBN.questions WHERE questions = ?";

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, [questions], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error retrieving the question from the database' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Question not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// Define a route to get a question by its content
app.post('/api/optionsfind', (req, res) => {
    const { ques_id } = req.body;
    const sql = "SELECT * FROM CRBN.Options WHERE ques_id = ?";

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, [ques_id], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error retrieving the options from the database' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Options not found' });
        } else {
            res.json(results);
        }
    });
});

// Define a route to add new question and its options by its content
app.post('/api/question/multiplechoice', cors(), (req, res) => {
    const { question, question_flag, type_of_question, options } = req.body;
    const sql = "INSERT INTO CRBN.questions (questions, question_flag, type_of_question) VALUES (?, ?, ?);";

    mysqlConnection.query(sql, [question, question_flag, type_of_question], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('New Question added successfully');
        }

        if (results.affectedRows === 1) {
            const queId = results.insertId;

            // Insert options into the "Options" table with queId as a foreign key
            const insertOptionsSql = 'INSERT INTO Options (ques_id, given_option, option_type, equivalent_carbon) VALUES ?';
            const optionsData = options.map(option => [queId, option.option, option.optiontype, option.carbonOffset]);

            mysqlConnection.query(insertOptionsSql, [optionsData], (err, optionsResults) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({ error: 'Error saving options' });
                }

                res.status(201).json({ message: 'Question and options saved successfully', queId });
            });
        } else {
            res.status(500).send('Error saving the question.');
        }
    });
});

// Define a route to add new question and its options by its content
app.post('/api/question/fillintheblank', cors(), (req, res) => {
    const { question, carbonOffsetValue, answer, selectedTextType } = req.body;
    const sql = "INSERT INTO CRBN.questions (questions, question_flag, type_of_question) VALUES (?, 0, 'Fill in the blank');";

    mysqlConnection.query(sql, [question], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('New Question added successfully');
        }

        if (results.affectedRows === 1) {
            const queId = results.insertId;

            // Insert options into the "Options" table with queId as a foreign key
            const insertOptionsSql = 'INSERT INTO Options (ques_id, given_option, option_type, equivalent_carbon) VALUES (?, ?, ?, ?)';

            mysqlConnection.query(insertOptionsSql, [queId, answer, selectedTextType, carbonOffsetValue], (err, optionsResults) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({ error: 'Error saving options' });
                }
                res.status(201).json({ message: 'Question and options saved successfully', queId });
            });
        } else {
            res.status(500).send('Error saving the question.');
        }
    });
});



// Define a route to retrieve admin table from the database
app.get('/api/admin_main', cors(), (req, res) => {
    const sql = 'SELECT * FROM CRBN.admin where flag=1';

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error retrieving questions from the database' });
            return;
        }
        // Send the retrieved questions as a JSON response
        res.json(results);
    });
});

// Define a route to retrieve admin table for the add new admin from the database
app.get('/api/admin_add', cors(), (req, res) => {
    const sql = 'SELECT * FROM CRBN.admin';

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error retrieving questions from the database' });
            return;
        }
        // Send the retrieved questions as a JSON response
        res.json(results);
    });
});

// Define a route to save new admin data
app.post("/api/new_admin_add", (req, res) => {
    const { Name, Email, password } = req.body;
    const sql = "INSERT INTO CRBN.admin (Name, Email, password) VALUES (?, ?, ?)";
    const values = [Name, Email, password];

    mysqlConnection.query(sql, values, (error, result) => {
        if (error) {
            console.error("Error saving admin data:", error);
            res.status(500).json({ error: "Error saving admin data" });
        } else {
            console.log("Admin data saved successfully.");
            res.json({ message: "Admin data saved successfully" });
        }
    });
});


// Define a route to update the flag
app.post("/api/update_flag", (req, res) => {
    const { Email, password, flag } = req.body;
    console.log("Received Password:", password);

    const sql = 'UPDATE admin SET flag = ? , password = ? WHERE Email = ?';
    mysqlConnection.query(sql, [flag, password, Email], (error, result) => {
        if (error) {
            console.error('Error updating flag and password :', error);
            res.status(500).json({ error: 'Error updating flag and password ' });
        } else {
            console.log('Flag and password updated successfully.');
            res.json({ message: 'Flag and password updated successfully' });
        }
    });
});

app.delete('/api/admins/delete', (req, res) => {
    const { adminIds } = req.body;

    if (!adminIds || !Array.isArray(adminIds)) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    const sql = 'UPDATE CRBN.admin SET flag = 0 WHERE admin_id IN (?)';

    // Execute the SQL query using the MySQL connection and the list of adminIds
    mysqlConnection.query(sql, [adminIds], (error, result) => {
        if (error) {
            console.error('Error deleting admin records:', error);
            res.status(500).json({ error: 'Error deleting admin records' });
        } else {
            console.log('Admins deleted successfully.');
            res.json({ message: 'Admins deleted successfully' });
        }
    });
});

app.get('/api/admin/:adminId', (req, res) => {
    const { adminId } = req.params;
    // Perform a query to retrieve the name and email based on the admin_id
    const query = 'SELECT admin_id , Name, Email FROM CRBN.admin WHERE admin_id = ?';
    mysqlConnection.query(query, [adminId], (error, rows) => {
        if (error) {
            console.error(`Error fetching admin data for admin ID ${adminId}:`, error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (rows.length === 0) {
                res.status(404).json({ error: 'Admin not found' });
            } else {
                res.json(rows[0]);
            }
        }
    });
});


app.post('/api/update_admin/:adminId', (req, res) => {
    const adminId = req.params.adminId;
    console.log("adminID:", adminId);
    const { Name, Email } = req.body;
    console.log("name", Name);
    console.log("Email", Email)

    const query = 'UPDATE CRBN.admin SET Name = ?, Email = ? WHERE admin_id = ?';
    const values = [Name, Email, adminId];

    mysqlConnection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error updating admin data: ' + error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.status(200).json({ message: 'Admin data updated successfully' });
        }
    });
});

// Define a route to retrieve admin table for the add new admin from the database
app.get('/api/category_add', cors(), (req, res) => {
    const sql = 'SELECT category_name FROM CRBN.Category';

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error retrieving questions from the database' });
            return;
        }
        // Send the retrieved questions as a JSON response
        res.json(results);
    });
});

// Define a route to save new admin data
app.post("/api/new_add_category", (req, res) => {
    const { category_name } = req.body;
    const sql = "INSERT INTO CRBN.Category (category_name) VALUES (?)";
    const values = [category_name];

    mysqlConnection.query(sql, values, (error, result) => {
        if (error) {
            console.error("Error saving admin data:", error);
            res.status(500).json({ error: "Error saving admin data" });
        } else {
            console.log("Admin data saved successfully.");
            res.json({ message: "Admin data saved successfully" });
        }
    });
});

app.get('/api/category/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    // Perform a query to retrieve the name and email based on the category_id
    const query = 'SELECT category_id , category_name FROM CRBN.category WHERE category_id = ?';
    mysqlConnection.query(query, [categoryId], (error, rows) => {
        if (error) {
            console.error(`Error fetching admin data for admin ID ${categoryId}:`, error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (rows.length === 0) {
                res.status(404).json({ error: 'Admin not found' });
            } else {
                res.json(rows[0]);
            }
        }
    });
});

app.post('/api/update_category/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    console.log("categoryID:", categoryId);
    const { category_name, Email } = req.body;
    console.log("name", category_name)

    const query = 'UPDATE CRBN.Category SET category_name = ? WHERE category_id = ?';
    const values = [category_name, categoryId];

    mysqlConnection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error updating admin data: ' + error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.status(200).json({ message: 'Admin data updated successfully' });
        }
    });
});

app.post('/api/send-email', async (req, res) => {
    const { subject, body } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'carbonoffset08@gmail.com',
            pass: 'vjbv uaeq cpro lsub',
        },
    });

    try {
        mysqlConnection.query('SELECT Email FROM CRBN.customer', (error, results, fields) => {
            if (error) {
                console.error('Error querying the database:', error);
                res.status(500).send('Failed to fetch customer emails');
                return;
            }

            const customerEmails = results.map((row) => row.Email); // Ensure the field name matches your database structure

            customerEmails.forEach((customerEmail) => {
                const mailOptions = {
                    from: 'carbonoffset08@gmail.com',
                    to: customerEmail, // Set the recipient's email address
                    subject: subject,
                    text: body,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                    }
                });
            });

            res.status(200).send('Emails sent successfully');
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send emails');
    }
});



// Define a route to retrieve questions with a specific flag from the database
app.get('/api/questionsuser', cors(),(req, res) => {
    const sql = 'SELECT * FROM CRBN.questions WHERE question_flag = 1';

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error retrieving questions from the database' });
            return;
        }

        // Send the retrieved questions as a JSON response
        res.json(results);
    });
});

app.get('/api/questions/:id', cors(), async (req, res) => {
    try {
        const questionId = req.params.id;  // Get the ID from the route parameter
        const [results] = await mysqlConnection.promise().query("SELECT * FROM CRBN.questions WHERE ques_id = ?", [questionId]);
        if (results.length > 0) {
            res.json(results[0]); // Send back the specific question
        } else {
            res.status(404).send('Question not found');
        }
    } catch (error) {
        console.error('Error fetching specific question:', error);
        res.status(500).send('Server error');
    }
});

app.post('/api/ContactUs', cors(), (req, res) => {
    const { email, query, firstName, lastName } = req.body;

    // 1) Adding query to the Enquiry table
    const insertEnquirySql = 'INSERT INTO CRBN.Enquiry (enquiry_question, enquiry_flag) VALUES (?, ?)';
    mysqlConnection.query(insertEnquirySql, [query, 1], (err, result) => {
        if (err) {
            console.error('Error inserting into Enquiry table:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const enquiryId = result.insertId;

        // 2) Inserting a new entry into the Customer table
        const insertCustomerSql = `INSERT INTO CRBN.Customer (date_answered, session_id, first_name, last_name, email, total_carbon_footprint, answers, number_of_trees, enquiry_id) 
        VALUES (CURDATE(), "N/A", ?, ?, ?, 0, "N/A", 0, ?)`;
        mysqlConnection.query(insertCustomerSql, [firstName, lastName, email, enquiryId], (err, insertResult) => {
            if (err) {
                console.error('Error inserting into Customer table:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            return res.status(200).json({ message: 'Enquiry and Customer added successfully' });
        });
    });
});

// API for random fact fetching
app.get('/api/randomfact', async (req, res) => {
    try {
        const [rows, fields] = await mysqlConnection.promise().query("SELECT fact FROM CRBN.facts ORDER BY RAND() LIMIT 1;");
        
        if (rows && rows.length > 0) {
            return res.json(rows[0]);
        } else {
            return res.status(404).json({ message: "No fact found" });
        }
    } catch (error) {
        console.error("Error fetching random fact:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
// Route to calculate total number of qustions to display progress bar percentage in each question page
app.get('/api/totalquestions', cors(), async (req, res) => {
    try {
        const [results] = await mysqlConnection.promise().query("SELECT COUNT(*) as total FROM CRBN.questions Where question_flag=1");
        if (results.length > 0) {
            res.json(results[0].total);
        } else {
            res.status(404).send('No questions found');
        }
    } catch (error) {
        console.error('Error fetching total number of questions:', error);
        res.status(500).send('Server error');
    }
});


// Define a route to retrieve utility data based on the zipcode
app.get('/api/utility/:zipcode', cors(), (req, res) => {
    const zipcode = req.params.zipcode; // Extract zipcode from the request parameters

    // SQL query to fetch utility data for the given zipcode
    const sql = 'SELECT * FROM CRBN.Utility WHERE Zipcode = ?';

    // Execute the SQL query using the MySQL connection
    mysqlConnection.query(sql, [zipcode], (error, results) => {
        if (error) {
            console.error('Error executing SQL query:', error.message);
            res.status(500).json({ error: 'Error retrieving utility data from the database' });
            return;
        }

        // If results are found, return them, otherwise, return a 404 with an error message
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Utility not found for the given zipcode' });
        }
    });
});

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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

