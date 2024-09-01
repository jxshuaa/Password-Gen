
const express = require('express');
const passwordGenerator = require('password-generator');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get('/generate-password', (req, res) => {
    const { type, complexity, specialChars } = req.query;

    let password = '';
    if (type === 'random') {
        const length = parseInt(complexity) * 2;
        const special = specialChars === 'true';
        password = passwordGenerator(length, false, /[a-zA-Z0-9]/);
        if (special) {
            const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
            for (let i = 0; i < length / 4; i++) {
                const randomIndex = Math.floor(Math.random() * specialChars.length);
                password += specialChars[randomIndex];
            }
        }
    } else if (type === 'memorable') {
        const words = [
            'Protrude', 'Underpay', 'Yelp', 'Compacter', 'Unshaken', 'realism', 'appliance', 'blip', 'time', 'standardize', 
            'negligent', 'pinpoint', 'insensitivity', 'desperation', 'bombing', 'front', 'impediment', 'newsprint', 'detail', 
            'foot', 'grandson', 'wary', 'button', 'otter', 'wear', 'judge', 'uphill', 'above-ground', 'bunk', 'wraparound', 
            'asbestos', 'coalesce', 'postpartum', 'sink', 'sting', 'scarf', 'concentrate', 'gratifying', 'nectar', 'dizzy', 
            'piercing', 'oriental', 'uninterested', 'subordination', 'sauna', 'march', 'bow', 'energize', 'outperform', 'shed', 
            'overall', 'satisfactory', 'take', 'confluence', 'push', 'rinsed', 'detectable', 'unnatural', 'squat', 'opposing'
        ];
        for (let i = 0; i < 5; i++) {
            const randomWord = words[Math.floor(Math.random() * words.length)];
            password += `${randomWord}${Math.floor(Math.random() * 10)}-`;
        }
        password = password.slice(0, -1);
    }

    res.json({ password });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
