import { connectToMongoDB, ObjectId } from "./connect.js";

let db;
let collection;

let lastState

const createCollection = async () => {
    return await db.collection('notatki')
}

export const getTasks = async () => {
    lastState = await collection.find({}).toArray()
    return lastState
}

export const setTasks = async (tasks) => {
    await collection.deleteMany({})
    await collection.insertMany(tasks)
    lastState = tasks
}

const connect = async () => {
    db = await connectToMongoDB()
    collection = await createCollection()
}

connect()