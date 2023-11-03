import express from "express";
import cors from "cors";
import mysql from "mysql2";
import mysql1 from "mysql2/promise";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

const dbConfig = {
  host: "3.143.110.232",
  user: "carbonuser",
  password: "Carbon@123",
  database: "CRBN",
  port: 3306,
};

// const port = 3001;


// const dbConfig = {
//   host: "18.219.100.56",
//   user: "carbonuser",
//   password: "Carbon@123",
//   database: "CRBN",
//   port: 3306,
// };

// Create a MySQL connection
const mysqlConnection = mysql.createConnection(dbConfig);

const pool = mysql1.createPool(dbConfig);

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected to MySQL");
  } else {
    console.error("Connection to MySQL failed:", err);
  }
});

app.get('/api/Customer', cors(), (req, res) => {
  const query = 'SELECT cust_id, first_name,last_name, email, total_carbon_footprint, number_of_trees, date_answered, zipcode FROM CRBN.Customer';
  mysqlConnection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get('/api/filterCustomer', cors(), (req, res) => {
  const { fromDate, toDate, zipcode, carbonComparison, carbonFootprintFilter, treesComparison, treesFilter } = req.query;
  let query = 'SELECT cust_id, first_name, last_name, Email, total_carbon_footprint, number_of_trees, date_answered, zipcode FROM CRBN.Customer';
  

  if (fromDate && toDate && zipcode && carbonComparison && carbonFootprintFilter && treesComparison && treesFilter) {
      const formattedFromDate = fromDate.split('/').reverse().join('-');
      const formattedToDate = toDate.split('/').reverse().join('-');
      query += ` WHERE date_answered BETWEEN STR_TO_DATE('${formattedFromDate}', '%Y-%m-%d') AND STR_TO_DATE('${formattedToDate}', '%Y-%m-%d') AND zipcode = '${zipcode}' AND total_carbon_footprint ${carbonComparison === '=' ? '=' : carbonComparison === '>' ? '>' : '<'} ${carbonFootprintFilter} AND number_of_trees ${treesComparison === '=' ? '=' : treesComparison === '>' ? '>' : '<'} ${treesFilter}`;
  }
  else if (fromDate && toDate && carbonComparison && carbonFootprintFilter && treesComparison && treesFilter) {
      const formattedFromDate = fromDate.split('/').reverse().join('-');
      const formattedToDate = toDate.split('/').reverse().join('-');
      query += ` WHERE date_answered BETWEEN STR_TO_DATE('${formattedFromDate}', '%Y-%m-%d') AND STR_TO_DATE('${formattedToDate}', '%Y-%m-%d') AND total_carbon_footprint ${carbonComparison === '=' ? '=' : carbonComparison === '>' ? '>' : '<'} ${carbonFootprintFilter} AND number_of_trees ${treesComparison === '=' ? '=' : treesComparison === '>' ? '>' : '<'} ${treesFilter}`;
  }
  else if (fromDate && toDate && zipcode) {
    const formattedFromDate = fromDate.split('/').reverse().join('-');
    const formattedToDate = toDate.split('/').reverse().join('-');
    query += ` WHERE date_answered BETWEEN STR_TO_DATE('${formattedFromDate}', '%Y-%m-%d') AND STR_TO_DATE('${formattedToDate}', '%Y-%m-%d') AND zipcode = '${zipcode}'`;
  } else if (fromDate && toDate && carbonComparison && carbonFootprintFilter) {
      const formattedFromDate = fromDate.split('/').reverse().join('-');
      const formattedToDate = toDate.split('/').reverse().join('-');
      query += ` WHERE date_answered BETWEEN STR_TO_DATE('${formattedFromDate}', '%Y-%m-%d') AND STR_TO_DATE('${formattedToDate}', '%Y-%m-%d') AND total_carbon_footprint ${carbonComparison === '=' ? '=' : carbonComparison === '>' ? '>' : '<'} ${carbonFootprintFilter}`;
  }else if (fromDate && toDate && treesComparison && treesFilter) {
      const formattedFromDate = fromDate.split('/').reverse().join('-');
      const formattedToDate = toDate.split('/').reverse().join('-');
      query += ` WHERE date_answered BETWEEN STR_TO_DATE('${formattedFromDate}', '%Y-%m-%d') AND STR_TO_DATE('${formattedToDate}', '%Y-%m-%d') AND number_of_trees ${treesComparison === '=' ? '=' : treesComparison === '>' ? '>' : '<'} ${treesFilter}`;
  }
  else if (fromDate && toDate) {
    const formattedFromDate = fromDate.split('/').reverse().join('-');
    const formattedToDate = toDate.split('/').reverse().join('-');
    query += ` WHERE date_answered BETWEEN STR_TO_DATE('${formattedFromDate}', '%Y-%m-%d') AND STR_TO_DATE('${formattedToDate}', '%Y-%m-%d')`;
  } else if (zipcode) {
    query += ` WHERE zipcode = '${zipcode}'`;
  } else if (carbonComparison && carbonFootprintFilter && treesComparison && treesFilter) {
      query += ` WHERE total_carbon_footprint ${carbonComparison === '=' ? '=' : carbonComparison === '>' ? '>' : '<'} ${carbonFootprintFilter} AND number_of_trees ${treesComparison === '=' ? '=' : treesComparison === '>' ? '>' : '<'} ${treesFilter}`;
  } else if (carbonComparison && carbonFootprintFilter) {
      query += ` WHERE total_carbon_footprint ${carbonComparison === '=' ? '=' : carbonComparison === '>' ? '>' : '<'} ${carbonFootprintFilter}`;
  } else if (treesComparison && treesFilter) {
      query += ` WHERE number_of_trees ${treesComparison === '=' ? '=' : treesComparison === '>' ? '>' : '<'} ${treesFilter}`;
  }
  else if (zipcode && carbonComparison && carbonFootprintFilter) {
      query += ` WHERE zipcode = '${zipcode}' AND total_carbon_footprint ${carbonComparison === '=' ? '=' : carbonComparison === '>' ? '>' : '<'} ${carbonFootprintFilter}`;
  } else if (zipcode && treesComparison && treesFilter) {
      query += ` WHERE zipcode = '${zipcode}' AND number_of_trees ${treesComparison === '=' ? '=' : treesComparison === '>' ? '>' : '<'} ${treesFilter}`;
  }

  mysqlConnection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Define a route to handle updating the question
app.post("/api/slider", cors(), (req, res) => {
  const { question, options } = req.body;

  // Replace this with your actual query to update the question in the database
  const sql =
    'INSERT INTO CRBN.questions (questions, enabled, type_of_question) VALUES (?, 1, "Slider")';
  mysqlConnection.query(sql, [question], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.affectedRows === 1) {
      const queId = results.insertId;

      // Insert options into the "Options" table with queId as a foreign key
      const insertOptionsSql =
        "INSERT INTO CRBN.Options (ques_id, given_option, option_type, equivalent_carbon) VALUES ?";
      const optionsData = options.map((option) => [
        queId,
        option.baseline,
        option.optiontype,
        option.carbonOffset,
      ]);

      mysqlConnection.query(
        insertOptionsSql,
        [optionsData],
        (err, optionsResults) => {
          if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Error saving options" });
          }

          res.status(201).json({
            message: "Question and options saved successfully",
            queId,
          });
        }
      );
    } else {
      res.status(500).send("Error saving the question.");
    }
  });
});

app.post("/api/dropdown", cors(), (req, res) => {
  const { question, options } = req.body;

  // Insert the question into the "questions" table
  const insertQuestionSql =
    'INSERT INTO CRBN.questions (questions, enabled, type_of_question) VALUES (?, 1, "Dropdown")';
  mysqlConnection.query(insertQuestionSql, [question], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.affectedRows === 1) {
      const queId = results.insertId;

      // Insert options into the "Options" table with queId as a foreign key
      const insertOptionsSql =
        "INSERT INTO CRBN.Options (ques_id, given_option, option_type, equivalent_carbon) VALUES ?";
      const optionsData = options.map((option) => [
        queId,
        option.dropdown,
        option.optiontype,
        option.carbonOffset,
      ]);

      mysqlConnection.query(
        insertOptionsSql,
        [optionsData],
        (err, optionsResults) => {
          if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Error saving options" });
          }

          res.status(201).json({
            message: "Question and options saved successfully",
            queId,
          });
        }
      );
    } else {
      res.status(500).send("Error saving the question.");
    }
  });
});

// Define a route to handle admin login
app.post("/api/admin/login", cors(), (req, res) => {
  const { email, password } = req.body;

  // Replace this with your actual query to check the credentials
  const sql = `SELECT * FROM CRBN.admin WHERE email = ? AND password = ?`;
  mysqlConnection.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length > 0) {
      // Authentication successful
      return res.status(200).json({ message: "Login successful" });
    } else {
      // Authentication failed
      return res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Define a route to retrieve questions from the database
app.get("/api/questionsadmin", cors(), (req, res) => {
  const sql = "SELECT * FROM CRBN.questions";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error retrieving questions from the database" });
      return;
    }

    // Send the retrieved questions as a JSON response
    res.json(results);
  });
});

// Middleware for parsing JSON request body
app.use(express.json());

// Define a route to handle the toggle state update
app.post("/api/updateToggleState", (req, res) => {
  const { questionId, newState } = req.body;
  const sql = "UPDATE CRBN.questions SET enabled = ? WHERE ques_id = ?;";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, [newState, questionId], (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error updating toggle state in the database" });
      return;
    }
    res.json({ message: "Toggle state updated successfully" });
  });
});

// Define a route to retrieve Utility table from the database
app.get("/api/Utility", cors(), (req, res) => {
  const sql = "SELECT * FROM CRBN.Utility";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error retrieving questions from the database" });
      return;
    }

    // Send the retrieved questions as a JSON response
    res.json(results);
  });
});

// Define a route to retrieve Category table from the database
app.get("/api/Category", cors(), (req, res) => {
  const sql = "SELECT * FROM CRBN.Category";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error retrieving questions from the database" });
      return;
    }

    // Send the retrieved questions as a JSON response
    res.json(results);
  });
});

app.get("/api/category_name", cors(), (req, res) => {
  const sql = "SELECT category_name FROM CRBN.Category";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error retrieving questions from the database" });
      return;
    }

    // Send the retrieved questions as a JSON response
    res.json(results);
  });
});

// Define a route to add a question to question table
app.post("/api/newquestion", (req, res) => {
  const { question, enabled, type_of_question } = req.body;
  const sql =
    "INSERT INTO CRBN.questions (questions, enabled, type_of_question) VALUES (?, ?, ?);";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(
    sql,
    [question, enabled, type_of_question],
    (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error.message);
        res
          .status(500)
          .json({ error: "Error updating toggle state in the database" });
        return;
      }
      res.json({ message: "New Question added successfully" });
    }
  );
});

// Define a route to get a question by its content
app.post("/api/questionsfind", (req, res) => {
  const { questions } = req.body;
  const sql = "SELECT * FROM CRBN.questions WHERE questions = ?";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, [questions], (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error retrieving the question from the database" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Question not found" });
    } else {
      res.json(results[0]);
    }
  });
});

// Define a route to get a question by its content
app.post("/api/optionsfind", (req, res) => {
  const { ques_id } = req.body;
  const sql = "SELECT * FROM CRBN.Options WHERE ques_id = ?";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, [ques_id], (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error retrieving the options from the database" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "Options not found" });
    } else {
      res.json(results);
    }
  });
});

// Define a route to add new question and its options by its content
app.post("/api/question/multiplechoice", cors(), (req, res) => {
  const { question, enabled, type_of_question, options } = req.body;
  const sql =
    "INSERT INTO CRBN.questions (questions, enabled, type_of_question) VALUES (?, ?, ?);";

  mysqlConnection.query(
    sql,
    [question, enabled, type_of_question],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("New Question added successfully");
      }

      if (results.affectedRows === 1) {
        const queId = results.insertId;

        // Insert options into the "Options" table with queId as a foreign key
        const insertOptionsSql =
          "INSERT INTO Options (ques_id, given_option, option_type, equivalent_carbon) VALUES ?";
        const optionsData = options.map((option) => [
          queId,
          option.option,
          option.optiontype,
          option.carbonOffset,
        ]);

        mysqlConnection.query(
          insertOptionsSql,
          [optionsData],
          (err, optionsResults) => {
            if (err) {
              console.error("Database query error:", err);
              return res.status(500).json({ error: "Error saving options" });
            }

            res.status(201).json({
              message: "Question and options saved successfully",
              queId,
            });
          }
        );
      } else {
        res.status(500).send("Error saving the question.");
      }
    }
  );
});

// Define a route to add new question and its options by its content
app.post("/api/question/fillintheblank", cors(), (req, res) => {
  const { question, carbonOffsetValue, answer, selectedTextType } = req.body;
  const sql =
    "INSERT INTO CRBN.questions (questions, enabled, type_of_question) VALUES (?, 0, 'Fill in the blank');";

  mysqlConnection.query(sql, [question], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("New Question added successfully");
    }

    if (results.affectedRows === 1) {
      const queId = results.insertId;

      // Insert options into the "Options" table with queId as a foreign key
      const insertOptionsSql =
        "INSERT INTO Options (ques_id, given_option, option_type, equivalent_carbon) VALUES (?, ?, ?, ?)";

      mysqlConnection.query(
        insertOptionsSql,
        [queId, answer, selectedTextType, carbonOffsetValue],
        (err, optionsResults) => {
          if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: "Error saving options" });
          }
          res.status(201).json({
            message: "Question and options saved successfully",
            queId,
          });
        }
      );
    } else {
      res.status(500).send("Error saving the question.");
    }
  });
});

// Define a route to retrieve admin table from the database
app.get("/api/admin_main", cors(), (req, res) => {
  const sql = "SELECT * FROM CRBN.admin where flag=1";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error retrieving questions from the database" });
      return;
    }
    // Send the retrieved questions as a JSON response
    res.json(results);
  });
});

// Define a route to retrieve admin table for the add new admin from the database
app.get("/api/admin_add", cors(), (req, res) => {
  const sql = "SELECT * FROM CRBN.admin";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error retrieving questions from the database" });
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

  const sql = "UPDATE admin SET flag = ? , password = ? WHERE Email = ?";
  mysqlConnection.query(sql, [flag, password, Email], (error, result) => {
    if (error) {
      console.error("Error updating flag and password :", error);
      res.status(500).json({ error: "Error updating flag and password " });
    } else {
      console.log("Flag and password updated successfully.");
      res.json({ message: "Flag and password updated successfully" });
    }
  });
});

app.delete("/api/admins/delete", (req, res) => {
  const { adminIds } = req.body;

  if (!adminIds || !Array.isArray(adminIds)) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const sql = "UPDATE CRBN.admin SET flag = 0 WHERE admin_id IN (?)";

  // Execute the SQL query using the MySQL connection and the list of adminIds
  mysqlConnection.query(sql, [adminIds], (error, result) => {
    if (error) {
      console.error("Error deleting admin records:", error);
      res.status(500).json({ error: "Error deleting admin records" });
    } else {
      console.log("Admins deleted successfully.");
      res.json({ message: "Admins deleted successfully" });
    }
  });
});

app.get("/api/admin/:adminId", (req, res) => {
  const { adminId } = req.params;
  // Perform a query to retrieve the name and email based on the admin_id
  const query =
    "SELECT admin_id , Name, Email FROM CRBN.admin WHERE admin_id = ?";
  mysqlConnection.query(query, [adminId], (error, rows) => {
    if (error) {
      console.error(
        `Error fetching admin data for admin ID ${adminId}:`,
        error
      );
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (rows.length === 0) {
        res.status(404).json({ error: "Admin not found" });
      } else {
        res.json(rows[0]);
      }
    }
  });
});

app.post("/api/update_admin/:adminId", (req, res) => {
  const adminId = req.params.adminId;
  console.log("adminID:", adminId);
  const { Name, Email } = req.body;
  console.log("name", Name);
  console.log("Email", Email);

  const query = "UPDATE CRBN.admin SET Name = ?, Email = ? WHERE admin_id = ?";
  const values = [Name, Email, adminId];

  mysqlConnection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating admin data: " + error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Admin data updated successfully" });
    }
  });
});

// Define a route to retrieve admin table for the add new admin from the database
app.get("/api/category_add", cors(), (req, res) => {
  const sql = "SELECT category_name FROM CRBN.Category";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error retrieving questions from the database" });
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

app.get("/api/category/:categoryId", (req, res) => {
  const { categoryId } = req.params;
  // Perform a query to retrieve the name and email based on the category_id
  const query =
    "SELECT category_id , category_name FROM CRBN.Category WHERE category_id = ?";
  mysqlConnection.query(query, [categoryId], (error, rows) => {
    if (error) {
      console.error(
        `Error fetching admin data for admin ID ${categoryId}:`,
        error
      );
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (rows.length === 0) {
        res.status(404).json({ error: "Admin not found" });
      } else {
        res.json(rows[0]);
      }
    }
  });
});

app.post("/api/update_category/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;
  console.log("categoryID:", categoryId);
  const { category_name, Email } = req.body;
  console.log("name", category_name);

  const query =
    "UPDATE CRBN.Category SET category_name = ? WHERE category_id = ?";
  const values = [category_name, categoryId];

  mysqlConnection.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating admin data: " + error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Admin data updated successfully" });
    }
  });
});

app.post("/api/send-email", async (req, res) => {
  const { subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "carbonoffset08@gmail.com",
      pass: "vjbv uaeq cpro lsub",
    },
  });

  try {
    mysqlConnection.query(
      "SELECT Email FROM CRBN.Customer",
      (error, results, fields) => {
        if (error) {
          console.error("Error querying the database:", error);
          res.status(500).send("Failed to fetch customer emails");
          return;
        }

        const customerEmails = results.map((row) => row.Email); // Ensure the field name matches your database structure

        customerEmails.forEach((customerEmail) => {
          const mailOptions = {
            from: "carbonoffset08@gmail.com",
            to: customerEmail, // Set the recipient's email address
            subject: subject,
            text: body,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              // If the email was sent successfully, insert a record into the notifications table
              const notificationData = {
                customer_Emailid: customerEmail,
                notification_subject: subject,
                notification_message: body,
              };

              mysqlConnection.query(
                "INSERT INTO CRBN.notification SET ?",
                notificationData,
                (error) => {
                  if (error) {
                    console.error("Error inserting notification:", error);
                  }
                }
              );
            }
          });
        });

        res.status(200).send("Emails sent successfully");
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send emails");
  }
});

// API route to fetch the total number of inquiries with flag 1
app.get("/api/getTotalFlagOneInquiries", (req, res) => {
  // Query the database to get the total count of inquiries with flag 1
  const query = `SELECT COUNT(*) AS totalFlagOneInquiries FROM CRBN.enquiry WHERE enquiry_flag = 1;`;

  mysqlConnection.query(query, (error, rows) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // Extract the total count from the result
      const totalFlagOneInquiries = rows[0].totalFlagOneInquiries;
      res.json({ total: totalFlagOneInquiries });
    }
  });
});

// API route to fetch the next customer inquiry
app.get("/api/goToNextInquiry", (req, res) => {
  // Get the current customer's `enquiry_id`
  const currentEnquiryId = req.query.enquiryId;

  // Query the database to find the next customer inquiry
  const query = `SELECT enquiry_id, firstname, enquiry_question, email
    FROM CRBN.enquiry
    WHERE enquiry_flag = 1 AND enquiry_id > ? 
    ORDER BY enquiry_id ASC
    LIMIT 1;
  `;

  mysqlConnection.query(query, [currentEnquiryId], (error, rows) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (rows.length === 0) {
        // If there are no matching customer inquiries, fetch the last question
        const lastQuestionQuery = `SELECT enquiry_id, firstname, enquiry_question, email
                FROM CRBN.enquiry
                WHERE enquiry_flag = 1
                ORDER BY enquiry_id DESC
                LIMIT 1;
                `;

        mysqlConnection.query(
          lastQuestionQuery,
          (lastQuestionError, lastQuestionRows) => {
            if (lastQuestionError) {
              console.error("Error fetching last question:", lastQuestionError);
              res.status(500).json({ error: "Internal server error" });
            } else if (lastQuestionRows.length === 0) {
              res.json({ message: "No more matching customer inquiries" });
            } else {
              res.json(lastQuestionRows[0]);
            }
          }
        );
      } else {
        res.json(rows[0]);
      }
    }
  });
});

// API route to fetch the previous customer inquiry
app.get("/api/goToPreviousInquiry", (req, res) => {
  // Get the current customer's `enquiry_id`
  const currentEnquiryId = req.query.enquiryId;

  // Query the database to find the previous customer inquiry
  const query = `SELECT enquiry_id, firstname, enquiry_question, email
    FROM CRBN.enquiry
    WHERE enquiry_flag = 1 AND enquiry_id < ?
    ORDER BY enquiry_id DESC
    LIMIT 1;
  `;

  mysqlConnection.query(query, [currentEnquiryId], (error, rows) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (rows.length === 0) {
        res.json({ message: "No previous matching customer inquiries" });
      } else {
        res.json(rows[0]);
      }
    }
  });
});

// Extend the /api/sendCustomerEnquiryEmail route
app.post("/api/sendCustomerEnquiryEmail", (req, res) => {
  const { ID, to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "carbonoffset08@gmail.com",
      pass: "vjbv uaeq cpro lsub",
    },
  });

  const mailOptions = {
    from: "carbonoffset08@gmail.com",
    to,
    subject,
    text,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "Email sent successfully" });

      // Update the flag of the customer inquiry to 0 and store the response sent
      const query = `
                UPDATE CRBN.enquiry SET enquiry_flag = 0, enquiry_response = ?  WHERE enquiry_id = ?`;

      mysqlConnection.query(query, [text, ID], (updateError, updateResults) => {
        if (updateError) {
          console.error("Error updating customer inquiry:", updateError);
        }
        // Handle success or failure here
      });
    }
  });
});

// Define a route to retrieve questions with a specific flag from the database
app.get("/api/questionsuser", cors(), (req, res) => {
  const sql = "SELECT * FROM CRBN.questionsTable WHERE enabled = 1 ORDER BY label, id";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error retrieving questions from the database" });
      return;
    }

    // Send the retrieved questions as a JSON response
    res.json(results);
  });
});

app.get("/api/questions/:id", cors(), async (req, res) => {
  try {
    const questionId = req.params.id; // Get the ID from the route parameter
    const [results] = await mysqlConnection
      .promise()
      .query("SELECT * FROM CRBN.questionsTable WHERE ques_id = ?", [questionId]);
    if (results.length > 0) {
      res.json(results[0]); // Send back the specific question
    } else {
      res.status(404).send("Question not found");
    }
  } catch (error) {
    console.error("Error fetching specific question:", error);
    res.status(500).send("Server error");
  }
});

app.post("/api/ContactUs", cors(), (req, res) => {
  const { email, query, firstName, lastName } = req.body;

  // 1) Adding query to the Enquiry table
  const insertEnquirySql =
    "INSERT INTO CRBN.enquiry (enquiry_question, enquiry_flag) VALUES (?, ?)";
  mysqlConnection.query(insertEnquirySql, [query, 1], (err, result) => {
    if (err) {
      console.error("Error inserting into Enquiry table:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const enquiryId = result.insertId;

    // 2) Inserting a new entry into the Customer table
    const insertCustomerSql = `INSERT INTO CRBN.Customer (date_answered, session_id, first_name, last_name, email, total_carbon_footprint, answers, number_of_trees, enquiry_id) 
        VALUES (CURDATE(), "N/A", ?, ?, ?, 0, "N/A", 0, ?)`;
    mysqlConnection.query(
      insertCustomerSql,
      [firstName, lastName, email, enquiryId],
      (err, insertResult) => {
        if (err) {
          console.error("Error inserting into Customer table:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res
          .status(200)
          .json({ message: "Enquiry and Customer added successfully" });
      }
    );
  });
});

// API for random fact fetching
app.get("/api/randomfact/:index", async (req, res) => {
  try {
    const questionIndex = req.params.index;
    const [rows] = await mysqlConnection.promise().query("SELECT fact FROM CRBN.facts ORDER BY RAND() LIMIT 1;");
    // console.log(rows);  // log the entire result

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
app.get("/api/totalquestions", cors(), async (req, res) => {
  try {
    const [results] = await mysqlConnection
      .promise()
      .query(
        "SELECT COUNT(*) as total FROM CRBN.questionsTable Where enabled=1"
      );
    if (results.length > 0) {
      res.json(results[0].total);
    } else {
      res.status(404).send("No questions found");
    }
  } catch (error) {
    console.error("Error fetching total number of questions:", error);
    res.status(500).send("Server error");
  }
});

// Route to calculate total number of qustions to display progress bar percentage in each question page
app.get('/api/totalquestions', cors(), async (req, res) => {
    try {
        const [results] = await mysqlConnection.promise().query("SELECT COUNT(*) as total FROM CRBN.questionsTable Where enabled=1");
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
app.get("/api/utility/:zipcode", cors(), (req, res) => {
  const zipcode = req.params.zipcode; // Extract zipcode from the request parameters

  // SQL query to fetch utility data for the given zipcode
  const sql = "SELECT * FROM CRBN.Utility WHERE Zipcode = ?";

  // Execute the SQL query using the MySQL connection
  mysqlConnection.query(sql, [zipcode], (error, results) => {
    if (error) {
      console.error("Error executing SQL query:", error.message);
      res
        .status(500)
        .json({ error: "Error retrieving utility data from the database" });
      return;
    }

    // If results are found, return them, otherwise, return a 404 with an error message
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res
        .status(404)
        .json({ error: "Utility not found for the given zipcode" });
    }
  });
});

app.get("/api/getvardata", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT name, value FROM CRBN.conversion_table"
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

app.get("/api/data", async (req, res) => {
    try {
      const connection = await createConnection(dbConfig);
      const [rows] = await connection.execute("SELECT * FROM CRBN.conversion_table");
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
        INSERT INTO CRBN.admin_questions (
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
  
  app.get("/api/getUniqueUtilities", async (req, res) => {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        "SELECT DISTINCT Utility FROM CRBN.utilities"
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
      const [rows] = await connection.query("SELECT name FROM CRBN.units_table");
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
        "SELECT formulaName FROM CRBN.formulasTable"
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
        "UPDATE CRBN.conversion_table SET value = ? WHERE name = ?",
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
        "INSERT INTO CRBN.conversion_table (name, value) VALUES (?, ?)",
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
      await connection.query("INSERT INTO CRBN.units_table (name) VALUES (?)", [name]);
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
        "INSERT INTO CRBN.questionsTable (questionContent, household, zipcode, questionType, enabled, choiceAns, choices, refs, selectedUnits, selectedFormulas, label) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        "INSERT INTO CRBN.formulasTable (formulaName, var1, var2, var3, var4) VALUES (?, ?, ?, ?, ?)",
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
      const [rows] = await connection.query("SELECT * FROM CRBN.questionsTable");
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
        "SELECT * FROM CRBN.questionsTable WHERE id = ?",
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
        UPDATE CRBN.questionsTable 
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
      const [rows] = await connection.query("SELECT * FROM CRBN.utilities");
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
      const [rows] = await connection.query("SELECT * FROM CRBN.Category");
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

  app.post('/api/calculateFootprint', cors(), async (req, res) => {
    const answers = req.body; // Array or object containing question IDs and user answers
    console.log("Received answers:", answers);

    let totalCarbonFootprint = 0;

    try {
        for (let answer of answers) {
            const ques_id = answer.ques_id;
            const userValue = answer.value; 
            console.log("Querying for ques_id:", ques_id);


            // Fetch ref (constant or formula) for the question
            const [results] = await mysqlConnection.promise().query("SELECT refs FROM CRBN.questionsTable WHERE ques_id = ?", [ques_id]);
            if(results.length === 0) {
                console.error(`No data found for ques_id: ${ques_id}`);
                continue;  // Skip the rest of this iteration and proceed to next ques_id in the loop
            }
            console.log("Results from database:", results);
            const refValue = parseFloat(results[0].refs);

            // Calculate carbon footprint for this answer
            const carbonValue = refValue * userValue; // Modify this line if refs stores complex data

            totalCarbonFootprint += Math.ceil(carbonValue);
        }

        const CO2_PER_TREE_PER_YEAR = 48;
        const totalTreesRequired = Math.ceil(totalCarbonFootprint / CO2_PER_TREE_PER_YEAR);

        res.json({
            carbonFootprint: totalCarbonFootprint,
            numberOfTrees: totalTreesRequired
        });
    } catch (error) {
        console.error("Error calculating values:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to handle "Forgot Password" request
app.post('/api/forgotpassword', cors(), async (req, res) => {
    const { email } = req.body;
    // Check if the email exists in the 'admin' table
    const sql = `SELECT * FROM CRBN.admin WHERE email = ?`;
    try {
        const [user] = await mysqlConnection.promise().query(sql, [email]);

        if (!user || user.length === 0) {
            // Email not found in the 'admin' table
            return res.status(404).json({ error: 'Email not found' });
        }

        // Generate a password reset token
        const resetToken = generateResetToken();

        // Store the reset token in the database along with the email (for validation)
        const updateTokenSql = `UPDATE CRBN.admin SET reset_token = ? WHERE email = ?`;
        await mysqlConnection.promise().query(updateTokenSql, [resetToken, email]);

        // Send a password reset email with a link to a reset page
        const resetLink = `http://example.com/reset-password?token=${resetToken}`;
        await sendPasswordResetEmail(email, resetLink);

        return res.status(200).json({ message: 'Password reset email sent. Check your inbox.' });
    }
    catch (error) {
        console.error('Error processing password reset:', error);
        return res.status(500).json({ error: 'Error resetting password. Please try again later.' });
    }
});

// Helper function to generate a random reset token
function generateResetToken() {
    // Generate a random 32-character token
    return crypto.randomBytes(16).toString('hex');
}

// Helper function to send a password reset email
async function sendPasswordResetEmail(email, resetLink) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Replace with your email service provider
        auth: {
            user: 'carbonoffset08@gmail.com', // Replace with your email address
            pass: 'vjbv uaeq cpro lsub', // Replace with your email password
        },
    });
    const mailOptions = {
        from: 'carbonoffset08@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click on the following link to reset your password: ${resetLink}`,
    };

    return transporter.sendMail(mailOptions);
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
