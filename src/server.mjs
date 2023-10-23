import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser'; // Add this line to parse JSON request bodies
import nodemailer from 'nodemailer';


const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;
const dbConfig = {
    HOST: '127.0.0.1',
    USER: 'root',
    PASSWORD: "",
    DB: "carbon"
};

// Create a MySQL connection
const mysqlConnection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

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
app.get('/api/questions', cors(), (req, res) => {
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
    const sql = 'SELECT * FROM CarbnOffset.Category';

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
    const sql = 'SELECT category_name FROM CarbnOffset.Category';

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
    const sql = 'SELECT category_name FROM CarbnOffset.Category';

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
    const sql = "INSERT INTO CarbnOffset.Category (category_name) VALUES (?)";
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
    const query = 'SELECT category_id , category_name FROM CarbnOffset.category WHERE category_id = ?';
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

    const query = 'UPDATE CarbnOffset.Category SET category_name = ? WHERE category_id = ?';
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
        mysqlConnection.query('SELECT Email FROM carbon.customer', (error, results, fields) => {
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


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

