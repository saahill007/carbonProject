import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bodyParser from 'body-parser'; // Add this line to parse JSON request bodies

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;
const dbConfig = {
    HOST: '127.0.0.1',
    USER: 'root',
    PASSWORD: "Saiteja17@",
    DB: 'CarbnOffset',
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
    const sql = 'INSERT INTO CarbnOffset.questions (questions, question_flag, type_of_question) VALUES (?, 1, "Slider")';
    mysqlConnection.query(sql, [question], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.affectedRows === 1) {
        const queId = results.insertId;
  
        // Insert options into the "Options" table with queId as a foreign key
        const insertOptionsSql = 'INSERT INTO CarbnOffset.Options (ques_id, given_option, option_type, equivalent_carbon) VALUES ?';
        const optionsData = options.map(option => [queId, option.dropdown, "Slider", option.carbonOffset]);
  
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
    const insertQuestionSql = 'INSERT INTO CarbnOffset.questions (questions, question_flag, type_of_question) VALUES (?, 1, "Dropdown")';
    mysqlConnection.query(insertQuestionSql, [question], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.affectedRows === 1) {
        const queId = results.insertId;
  
        // Insert options into the "Options" table with queId as a foreign key
        const insertOptionsSql = 'INSERT INTO CarbnOffset.Options (ques_id, given_option, option_type, equivalent_carbon) VALUES ?';
        const optionsData = options.map(option => [queId, option.dropdown, "Dropdown", option.carbonOffset]);
  
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
app.get('/api/questions', cors(),(req, res) => {
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
app.get('/api/Utility', cors(),(req, res) => {
    const sql = 'SELECT * FROM CarbnOffset.Utility';

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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
