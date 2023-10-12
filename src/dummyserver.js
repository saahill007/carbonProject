import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3002; // Changed the port to 3002

app.use(cors());
app.use(bodyParser.json());

// Dummy data to store utilities
let utilities = [
  {
    id: 1,
    name: "Utility 1",
    reference: "REF-001",
    city: "City1",
    zipCode: "12345",
    disabled: false,
  },
  {
    id: 2,
    name: "Utility 2",
    reference: "REF-002",
    city: "City2",
    zipCode: "67890",
    disabled: false,
  },
  {
    id: 3,
    name: "Utility 3",
    reference: "REF-001",
    city: "City1",
    zipCode: "12345",
    disabled: false,
  },
  {
    id: 4,
    name: "Utility 4",
    reference: "REF-002",
    city: "City2",
    zipCode: "67890",
    disabled: false,
  },
  {
    id: 5,
    name: "Utility 5",
    reference: "REF-001",
    city: "City1",
    zipCode: "12345",
    disabled: false,
  },
  {
    id: 6,
    name: "Utility 6",
    reference: "REF-002",
    city: "City2",
    zipCode: "67890",
    disabled: false,
  },
];

// Get all utilities
app.get("/api/utilities", (req, res) => {
  res.json(utilities);
});

// Add a new utility
app.post("/api/addUtility", (req, res) => {
  const { name, reference, city, zipCode } = req.body;
  const newUtility = {
    id: utilities.length + 1,
    name,
    reference,
    city,
    zipCode,
    disabled: false,
  };
  utilities.push(newUtility);
  res.json({ message: "Utility added successfully", id: newUtility.id });
});

// Update a utility (disable/enable)
app.put("/api/updateUtility/:id", (req, res) => {
  const { id } = req.params;
  const { disabled, name, reference, city, zipCode } = req.body;
  const index = utilities.findIndex((utility) => utility.id == id);

  if (index !== -1) {
    utilities[index] = {
      ...utilities[index],
      disabled,
      name,
      reference,
      city,
      zipCode,
    };
    res.json({
      message: "Utility updated successfully",
      utility: utilities[index],
    });
  } else {
    res.status(404).json({ message: "Utility not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
