
const express = require("express");

const router = express.Router();


const {
  askQuestion,
  generateQuiz,
  generateFlashcards,
  generateNotes,
  generateImportantQuestions
  
} = require("../controllers/chatController");
// Ask AI Questions
router.post(
  "/ask",
  askQuestion
);

// Generate Quiz
router.post(
  "/quiz",
  generateQuiz
);

// Generate Flashcards
router.post(
  "/flashcards",
  generateFlashcards
);

// Generate Important Questions
router.post(
  "/important-questions",
  generateImportantQuestions
);

router.post(
  "/notes",
  generateNotes
);
module.exports = router;
