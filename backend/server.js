import express from 'express';
import fs from 'fs';
import cors from 'cors';
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const QUIZZES_FILE = './quizzes.json';

// Load quizzes
app.get('/quizzes', (req, res) => {
    fs.readFile(QUIZZES_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading quizzes' });
        }
        res.json(JSON.parse(data));
    });
});

// Add a new quiz
app.post('/quizzes', (req, res) => {
    const newQuiz = req.body;
    fs.readFile(QUIZZES_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading quizzes' });
        }
        const quizzes = JSON.parse(data);
        quizzes.push(newQuiz);
        fs.writeFile(QUIZZES_FILE, JSON.stringify(quizzes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving quiz' });
            }
            res.status(201).json({ message: 'Quiz added successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
