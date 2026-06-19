
const Document = require("../models/document");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Ask Questions
const askQuestion = async (req, res) => {

  try {

    const { question } = req.body;

    const docs = await Document.find();

    let pdfText = "";

    docs.forEach((doc) => {
      pdfText +=
        doc.content.substring(0, 1500) + "\n";
    });

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
PDF Content:

${pdfText}

Question:
${question}

Answer only using the PDF content.
`
          }
        ]
      });

    res.json({
      answer:
        completion.choices[0].message.content
    });

  } catch (error) {

    console.log("ASK ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

};

// Generate Quiz
const generateQuiz = async (req, res) => {

  try {

    const {
      questionCount,
      difficulty
    } = req.body;

    const docs = await Document.find();

    let pdfText = "";

    docs.forEach((doc) => {
      pdfText +=
        doc.content.substring(0, 1500) + "\n";
    });

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
Generate ${questionCount}
important MCQ questions.

Difficulty:
${difficulty}

Use only PDF content.

Format:

Q1.
A)
B)
C)
D)

Correct Answer:

PDF Content:

${pdfText}
`
          }
        ]
      });

    res.json({
      quiz:
        completion.choices[0].message.content
    });

  } catch (error) {

    console.log("QUIZ ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

};

// Generate Flashcards
const generateFlashcards = async (req, res) => {

  try {

    const docs = await Document.find();

    let pdfText = "";

    docs.forEach((doc) => {
      pdfText +=
        doc.content.substring(0, 1500) + "\n";
    });

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
Generate 15 flashcards.

Format:

Flashcard 1

Question:
...

Answer:
...

PDF Content:

${pdfText}
`
          }
        ]
      });

    res.json({
      flashcards:
        completion.choices[0].message.content
    });

  } catch (error) {

    console.log(
      "FLASHCARD ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }

};
const generateNotes = async (req, res) => {

  try {

    const docs = await Document.find();

    let pdfText = "";

    docs.forEach((doc) => {
      pdfText +=
        doc.content.substring(0, 3000) + "\n";
    });

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
Create detailed study notes from this PDF.

Include:

1. Summary
2. Important Concepts
3. Key Definitions
4. Key Points for Revision
5. Exam Tips

PDF Content:

${pdfText}
`
          }
        ]
      });

    res.json({
      notes:
        completion.choices[0].message.content
    });

  } catch (error) {

    console.log(
      "NOTES ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }

};

// Important Questions
const generateImportantQuestions =
async (req, res) => {

  try {

    const docs =
      await Document.find();

    let pdfText = "";

    docs.forEach((doc) => {
      pdfText +=
        doc.content.substring(0, 1500) + "\n";
    });

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `
Generate the top 20
important university
exam questions.

Use only PDF content.

PDF Content:

${pdfText}
`
          }
        ]
      });

    res.json({
      questions:
        completion.choices[0].message.content
    });

  } catch (error) {

    console.log(
      "IMPORTANT QUESTIONS ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  askQuestion,
  generateQuiz,
  generateFlashcards,
  generateNotes,
  generateImportantQuestions,
  
};