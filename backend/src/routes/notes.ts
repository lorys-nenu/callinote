import { Note, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { Router, Request, Response } from 'express'
const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const notes: Note[] = await prisma.note.findMany({
    where: {
      userId: req.userId,
    },
  })
  res.status(200).json(notes)
})

router.post('/', async (req: Request, res: Response) => {
  const createdNote: Note = await prisma.note.create({
    data: {
      title: 'Untitled Note',
      HTMLcontent: '',
      user: {
        connect: {
          id: req.userId,
        }
      }
    },
  })

  res.status(201).json(createdNote)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  })

  if (!note) {
    return res.status(404).json({ message: 'Note not found' })
  }

  res.status(200).json(note)
})

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, HTMLcontent, unformattedContent } = req.body
  const note = await prisma.note.update({
    where: {
      id,
    },
    data: {
      title,
      HTMLcontent,
      unformattedContent
    },
  })

  res.status(200).json(note)
})

export default router;
