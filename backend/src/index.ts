import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import dotenv from 'dotenv'
dotenv.config()
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

import express, { Request, Response} from 'express'
const app = express()
const port = process.env.PORT || 3000
import bodyParser from 'body-parser'
app.use(bodyParser.json())

import notesRoutes from './routes/notes'
import isAuth from './middlewares/isAuth';
app.use("/notes",isAuth, notesRoutes)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post('/register', async (req: Request, res: Response) => {
  // Receives email and password from the request body.
  const { email, password } = req.body
  // Checks if a user with the provided email already exists.
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  // If a user already exists, sends a 409 Conflict response.
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }
  // Hashes the password using `bcryptjs`.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Stores the new user in the database.
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  // Generates a JWT with the user's ID as payload, using `jsonwebtoken`.
  const secret = process.env.JWT_SECRET || ""; // Provide a default value for JWT_SECRET
  const token = jwt.sign({ id: user.id }, secret);
  // Sends the JWT back in the response.
  res.json({ token, user });
})

app.post('/login', async (req: Request, res: Response) => {
  // Receives email and password from the request body.
  const { email, password } = req.body
  // Retrieves the user from the database.
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  // If the user does not exist, sends a 401 Unauthorized response.
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Compares the provided password with the stored hash.
  const isMatch = await bcrypt.compare(password, user.password);
  // If the password does not match, sends a 401 Unauthorized response.
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Generates a JWT with the user's ID as payload, using `jsonwebtoken`.
  const secret = process.env.JWT_SECRET || ""; // Provide a default value for JWT_SECRET
  const token = jwt.sign({ id: user.id }, secret);
  // Sends the JWT back in the response.
  console.log({ token, user });
  res.status(200).json({ token, user });
})

app.get('/modal', (req: Request, res: Response) => {
  res.status(200).json({ title: 'Hello Modal!' })
})

app.listen(port, () => {
  console.info(`Calliapp listening on port ${port}`)
})