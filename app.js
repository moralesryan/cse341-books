import express from 'express';

const app = express;

app.request(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running' });
});

export default app;


