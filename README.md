# 📚 Study Assistant AI

An AI-powered Study Assistant built with **React + Node.js + Azure OpenAI**.

Users can paste study notes or simply enter a topic, and the application automatically generates:

- 📖 Flashcards
- 📝 Multiple Choice Quiz
- 🔄 Retry Wrong Answers
- 🌙 Dark / Light Theme

The AI returns structured JSON which is parsed and rendered into interactive UI components.

---

# Features

✅ Generate Flashcards

- AI creates question-answer flashcards.
- Flip cards to reveal answers.
- Navigate next/previous cards.

---

✅ Interactive Quiz

- AI generates MCQ questions.
- Four options for every question.
- Instant answer selection.
- Progress bar.
- Navigate previous/next.

---

✅ Retry Wrong Answers

Incorrectly answered questions are stored.

Users can review only incorrect answers without regenerating the entire study set.

---

✅ Error Handling

The application safely handles:

- Invalid JSON
- Empty AI response
- Network failure
- Timeout
- Backend errors
- Validation failures

No crashes occur.

---

✅ Loading State

Animated loading screen while AI generates study material.

---

✅ Dark / Light Theme

One-click theme switching.

Theme is applied across:

- Navbar
- Prompt Input
- Flashcards
- Quiz
- Error Screen

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Lucide Icons

### Backend

- Node.js
- Express.js

### AI

Azure OpenAI GPT-4o

---

# Folder Structure

study-assistant-ai

frontend/

src/

components/

api/

types/

utils/

App.tsx

backend/

controllers/

routes/

services/

validators/

utils/

server.js

---

# Installation

## 1 Clone repository

git clone https://github.com/yourusername/study-assistant-ai.git

cd study-assistant-ai

---

## 2 Install Frontend

cd frontend

npm install

---

## 3 Install Backend

cd ../backend

npm install

---

## 4 Create .env

Create a .env file inside backend.

Example:

PORT=3001

NODE_ENV=development

AZURE_OPENAI_ENDPOINT=https://YOUR_RESOURCE.openai.azure.com

AZURE_OPENAI_API_KEY=YOUR_API_KEY

AZURE_OPENAI_DEPLOYMENT=gpt-4o

AZURE_OPENAI_API_VERSION=2024-10-21

---

## 5 Start Backend

npm start

Backend runs at

http://localhost:3001

---

## 6 Start Frontend

cd ../frontend

npm run dev

Frontend runs at

http://localhost:5173

---

# How It Works

Step 1

User enters:

- Topic

or

- Study Notes

↓

Step 2

Frontend sends request

POST

/api/ai/generate

↓

Step 3

Backend calls Azure OpenAI

↓

Step 4

Azure returns structured JSON

↓

Step 5

Backend validates the JSON schema

↓

Step 6

Frontend parses the JSON

↓

Step 7

Interactive Flashcards

Interactive Quiz

Retry Wrong Answers

---

# API

POST

/api/ai/generate

Request

{
"prompt":"Machine Learning"
}

Response

{
"success": true,
"data": {
"title":"Machine Learning",
"flashcards":[...],
"quiz":[...]
}
}

---

# AI Usage Note

AI tools were used during development to:

- Generate boilerplate code
- Improve component structure
- Design prompts for Azure OpenAI
- Debug backend integration
- Improve UI styling
- Refactor React components
- Explain Azure OpenAI SDK usage

All generated code was reviewed, modified, tested, and integrated manually.

---

# Error Handling

The application handles:

✓ Empty prompt

✓ Invalid JSON

✓ Missing fields

✓ Wrong schema

✓ API timeout

✓ Azure errors

✓ Rate limits

✓ Network failure

✓ Retry requests

✓ Stale responses

---

# Known Limitations

- AI responses depend on Azure OpenAI availability.
- Generated content quality depends on the user's input.
- Very large notes may exceed token limits.
- Internet connection is required.
- Session data is not persisted after page refresh.

---

# Future Improvements

- Save study sessions
- Export flashcards to PDF
- Voice-based study mode
- AI-generated explanations
- Image-based flashcards
- User authentication
- Cloud database
- Spaced repetition algorithm
- Flashcard search
- Difficulty levels

---


# Author

Guruprasad Y S

M.Tech Student

Jain (Deemed-to-be University)

Bengaluru
