import "reflect-metadata"
import express from "express";
import cors from "cors"
import { LaunchesResumeController } from "./Controllers/LaunchesResumeController";
import { container } from "./Containers/Container";

const app = express()
const port = process.env.PORT

app.use(cors())

app.get('/', (req, res) => res.json({ name: 'Rocket Launch'}))

app.get('/launches/resume', (req, res) => container.get(LaunchesResumeController).run(req, res))

app.use(function(req, res){
  res.status(404).json({ error: "Resource not found" })
})

app.listen(port, () => console.log(`Rocket Launch API listening on port ${port}`))