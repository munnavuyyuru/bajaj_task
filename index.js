const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const FULL_NAME = "venkata_bhargav";
const DOB = "19112002";
const EMAIL = "venkatabhargav072@gmail.com";
const ROLL_NUMBER = "22BCE9108";

function isNumber(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function isAlphabet(char) {
  return /^[a-zA-Z]+$/.test(char);
}

function isSpecialChar(char) {
  return !isNumber(char) && !isAlphabet(char);
}

const processData = (data) => {
  const evenNumbers = [];
  const oddNumbers = [];
  const alphabets = [];
  const specialCharacters = [];
  let sum = 0;
  let alphaChars = [];

  data.forEach((item) => {
    const str = String(item);

    if (isNumber(str)) {
      const num = parseFloat(str);
      sum += num;
      if (num % 2 === 0) {
        evenNumbers.push(str);
      } else {
        oddNumbers.push(str);
      }
    } else if (isAlphabet(str)) {
      const upperCase = str.toUpperCase();
      alphabets.push(upperCase);
      alphaChars.push(...upperCase.split(""));
    } else if (isSpecialChar(str)) {
      specialCharacters.push(str);
    }
  });

  let concatString = "";
  alphaChars.reverse().forEach((char, index) => {
    concatString += index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
  });

  return {
    evenNumbers,
    oddNumbers,
    alphabets,
    specialCharacters,
    sum: sum.toString(),
    concatString,
  };
};

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input.",
      });
    }

    const processedData = processData(data);

    const response = {
      is_success: true,
      user_id: `${FULL_NAME.toLowerCase()}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      even_numbers: processedData.evenNumbers,
      odd_numbers: processedData.oddNumbers,
      alphabets: processedData.alphabets,
      special_characters: processedData.specialCharacters,
      sum: processedData.sum,
      concat_string: processedData.concatString,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("Error processing request:", error);
  }
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    msg: "API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
