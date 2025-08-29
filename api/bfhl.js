// Vercel Serverless Function entry
import { processPayload } from '../utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed. Use POST.' });
  }
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
}
