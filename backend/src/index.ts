import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response} from 'express'
const app = express()
const port = process.env.PORT || 3000
import bodyParser from 'body-parser'
app.use(bodyParser.json())

import notesRoutes from './routes/notes'
app.use("/notes", notesRoutes)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/modal', (req: Request, res: Response) => {
  res.status(200).json({ title: 'Hello Modal!' })
})

app.listen(port, () => {
  console.info(`Calliapp listening on port ${port}`)
})