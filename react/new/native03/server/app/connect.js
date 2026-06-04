import { MongoClient, ObjectId } from 'mongodb';

const connectToMongoDB = async () => {
    try {
        const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
        await mongoClient.connect();
        const db = mongoClient.db("notatki_kamil_pawlowski");
        return db
    } catch (error) {
        return error.message
    }
}

export { connectToMongoDB, ObjectId }