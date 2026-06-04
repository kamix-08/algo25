import express, { json } from "express";
import { getTasks, setTasks } from "./app/controller.js"

const app = express()
const PORT = 3000;
app.use(json())

app.get("/api/task", async (req, res) => {
    const tasks = await getTasks();
    res.status(200).json(tasks);
})

app.post("/api/task", async (req, res) => {
    const tasks = req.body.tasks
    await setTasks(tasks)
    res.sendStatus(200)
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))