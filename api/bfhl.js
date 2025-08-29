import express from 'express';
import cors from 'cors';
import { processPayload } from './utils.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'BFHL API is running', route: '/bfhl' });
});

// Core route per spec
app.post('/bfhl', (req, res) => {
  try {
    const { data, email, roll_number, full_name, dob_ddmmyyyy } = req.body || {};

    const result = processPayload({
      data,
      email: email || process.env.EMAIL || 'your_email@example.com',
      roll_number: roll_number || process.env.ROLL_NUMBER || 'YOUR_ROLL_NUMBER',
      full_name: full_name || process.env.FULL_NAME || 'john_doe',
      dob_ddmmyyyy: dob_ddmmyyyy || process.env.DOB_DDMMYYYY || '17091999'
    });

    return res.status(200).json(result);
  } catch (err) {
    return res.status(200).json({
      is_success: false,
      error: err?.message || 'Unexpected error',
      user_id: null,
      email: null,
      roll_number: null,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: ""
    });
  }
});

// ✅ New GET /bfhl route (before listen)
app.get("/bfhl", (req, res) => {
  res.json({
    message: "Welcome to BFHL API 🚀. Use POST /bfhl with JSON body to test."
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
