const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// async function run() {
// //   const prompt = "write a story about vikings and how they used to sail?";
// //   const result = await model.generateContent(prompt);
// //   const response = await result.response;
// //   const text = response.text();
// //   console.log(text);
// }

function fileToGenerativePath(path, mimetype) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType: mimetype,
    },
  };
}

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const prompt = "what is the difference between these pictures?";
  const imageParts = [
    fileToGenerativePath("rahul.jpg", "image/jpeg"),
    fileToGenerativePath("rahulGroup.jpg", "image/jpeg"),
  ];
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
