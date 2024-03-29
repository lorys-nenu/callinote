import express from 'express'
const app = express()

import bodyParser from 'body-parser'
app.use(bodyParser.json())

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/modal', (req, res) => {
  res.status(200).json({ title: 'Hello Modal!' })
})

app.get('/notes', async (req, res) => {
  const notes = await prisma.note.findMany()
  res.status(200).json(notes)
})

app.post('/notes', async (req, res) => {
  const createdNote = await prisma.note.create({
    data: {
      title: 'Untitled Note',
      content: '',
      user: {
        connect: {
          id: req.body.userId,
        }
      }
    },
  })

  res.status(201).json(createdNote)
})

app.get('/notes/:id', async (req, res) => {
  const { id } = req.params
  const note = await prisma.note.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  if (!note) {
    return res.status(404).json({ message: 'Note not found' })
  }

  res.status(200).json(note)
})

app.put('/notes/:id', async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  const note = await prisma.note.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      content,
    },
  })

  res.status(200).json(note)
})

app.listen(port, () => {
  console.info(`Calliapp listening on port ${port}`)
})