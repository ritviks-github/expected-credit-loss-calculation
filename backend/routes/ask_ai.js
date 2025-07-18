const express = require("express");
const axios = require("axios");
const router = express.Router();

AIz
aSyC
wzhFJ1U
J8LU
Of
const GEMINI_API_KEY = "";
ityUR
FDg
XF0
5
H
m
P
Y
8
y
A

router.post("/ask-ai", async (req, res) => {
  try {
    const userQuery = req.body.query;

    // Step 1: Fetch ECL data from Flask
    const flaskResponse = await axios.get("http://127.0.0.1:8000/ecl-data");
    const eclData = flaskResponse.data;

    // Step 2: Format the context string
    let context = "Expected Credit Loss (ECL) Analysis Data:\n";
    for (const feature in eclData) {
      context += `\n📊 Grouped by ${feature}:\n`;
      eclData[feature].forEach((entry) => {
        context += `- ${entry.label}: ₹${entry.ecl}\n`;
      });
    }

    // Step 3: Create the final prompt
    const prompt = `
You are a financial analyst AI. Use the ECL data below to answer risk-related queries.

${context}

Now answer this query:
"${userQuery}"
`;

    // Step 4: Call Gemini Pro (via REST API)
    const geminiRes = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }],
            role: "user",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
      }
    );

    const aiReply = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    res.json({ response: aiReply });
  } catch (err) {
    console.error("Error in /ask-ai:", err.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
