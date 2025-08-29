  # BFHL – Full Stack Question Paper API

  Builds a POST `/bfhl` route that:
  - Splits input `data` into `odd_numbers`, `even_numbers`, `alphabets` (uppercased), `special_characters`
  - Returns `sum` (as string) of all numbers
  - Returns `concat_string`: all alphabetical characters (after converting their tokens to UPPERCASE), reversed and alternating caps starting with UPPER
  - Always returns `user_id` as `{full_name_ddmmyyyy}` in lowercase for the name part

  ## Run locally
  ```bash
  npm install
  npm run start
  # POST http://localhost:3000/bfhl
  ```

  Example cURL:
  ```bash
  curl -X POST http://localhost:3000/bfhl \
-H "Content-Type: application/json" \
-d '{"data": ["a","1","334","4","R","$"], "full_name":"john_doe", "dob_ddmmyyyy":"17091999", "email":"john@xyz.com", "roll_number":"ABCD123"}'
  ```

  ## Deploy to Railway (easy)
  1. Create a **new Railway project** → **Deploy from GitHub**.
  2. Push this repo to GitHub.
  3. Add Environment Variables (Settings → Variables):
     - `FULL_NAME` = `your_full_name_in_lowercase_with_underscores` (e.g., `john_doe`)
     - `DOB_DDMMYYYY` = `17091999`
     - `EMAIL` = `your_email@example.com`
     - `ROLL_NUMBER` = `YOUR_ROLL_NUMBER`
  4. Railway auto-assigns `PORT`. The app listens on `process.env.PORT`.
  5. After deploy, test: `POST https://<your-railway-app>.railway.app/bfhl`

  ## Deploy to Render
  1. Create **New Web Service** → Connect your GitHub repo.
  2. Runtime: Node 18+; Build Command: `npm install`; Start Command: `npm start`.
  3. Add the same env vars as above.
  4. Test `POST https://<your-render-app>.onrender.com/bfhl`

  ## Deploy to Vercel (serverless)
  This project includes an `api/bfhl.js` serverless function and a `vercel.json` rewrite so that `/bfhl` works.
  1. `vercel` → import this repo.
  2. Set Env Vars in Vercel Project Settings:
     - `FULL_NAME`, `DOB_DDMMYYYY`, `EMAIL`, `ROLL_NUMBER`
  3. Test: `POST https://<your-vercel-project>.vercel.app/bfhl` → will route to `/api/bfhl`.

  ## Notes
  - Inputs that are *pure alphabetic* (e.g., `"ABcD"`) go into `alphabets` **uppercased**.
  - Inputs that are *pure integers* (e.g., `"334"`, `"-5"`) go into numeric arrays, preserving original strings, and are counted for `sum`.
  - Anything else (mixed, symbols, spaces) goes to `special_characters`.
  - `concat_string` is generated from the **uppercased alphabetic tokens only** (concatenated, reversed, alternating caps starting UPPER) to match the examples.
