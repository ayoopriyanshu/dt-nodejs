import { MongoClient } from "mongodb";

let db;
export const connectToDb = async () => {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        db = client.db('eventDB');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export const getDb = () => {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
};
