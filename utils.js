// Utility logic shared by server and serverless
function isAlphabetic(str) {
  return typeof str === 'string' && /^[A-Za-z]+$/.test(str);
}

function isIntegerString(str) {
  return typeof str === 'string' && /^-?\d+$/.test(str);
}

function toAlternatingCapsReversedFromUpperLetters(lettersUpperArray) {
  // lettersUpperArray is an array of strings that are already uppercase and alphabetic
  const allCharsUpper = lettersUpperArray.join('');
  const reversedChars = allCharsUpper.split('').reverse();
  // Alternate starting with UPPER at index 0
  return reversedChars.map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())).join('');
}

export function processPayload({ data, email, roll_number, full_name, dob_ddmmyyyy }) {
  const safeData = Array.isArray(data) ? data : [];

  const alphabets = [];
  const odd_numbers = [];
  const even_numbers = [];
  const special_characters = [];

  let sum = 0;

  for (const item of safeData) {
    const str = String(item);

    if (isAlphabetic(str)) {
      alphabets.push(str.toUpperCase());
    } else if (isIntegerString(str)) {
      // Keep original numeric strings for odd/even arrays
      const num = parseInt(str, 10);
      if (Math.abs(num) % 2 === 0) {
        even_numbers.push(str);
      } else {
        odd_numbers.push(str);
      }
      sum += num;
    } else {
      // Mixed / symbols / spaces, etc.
      special_characters.push(str);
    }
  }

  const concat_string = toAlternatingCapsReversedFromUpperLetters(alphabets);

  const user_id = `${String(full_name || '').trim().toLowerCase()}_${String(dob_ddmmyyyy || '').trim()}`;

  const response = {
    is_success: true,
    user_id,
    email,
    roll_number,
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: String(sum),
    concat_string
  };

  return response;
}
