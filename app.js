import express from 'express';
const app = express();
import { connectToDb } from './db/connectToDb.js';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();
app.use(express.json());

connectToDb();

app.use('/api/v3/app', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
