import express from 'express';
const app = express();
import { connectToDb } from './db/connectToDb.js';
import dotenv from 'dotenv';

dotenv.config();
app.use(express.json());

connectToDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
